/**
 * Groq API Translation Endpoint with Redis Caching
 * Batch translates news titles to target language using Llama 3.1 8B
 * Reuses existing Groq free tier and Redis cache infrastructure
 */

import { Redis } from '@upstash/redis';

export const config = {
  runtime: 'edge',
};

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.1-8b-instant';
const CACHE_TTL_SECONDS = 86400; // 24 hours
const MAX_TITLES_PER_REQUEST = 20;

let redis = null;
let redisInitFailed = false;
function getRedis() {
  if (redis) return redis;
  if (redisInitFailed) return null;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    try {
      redis = new Redis({ url, token });
    } catch (err) {
      console.warn('[Translate] Redis init failed:', err.message);
      redisInitFailed = true;
      return null;
    }
  }
  return redis;
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

function getCacheKey(title) {
  return `tr:v1:${hashString(title)}`;
}

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Groq API key not configured', translations: [] }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { titles, targetLang = 'zh-TW' } = await request.json();

    if (!titles || !Array.isArray(titles) || titles.length === 0) {
      return new Response(JSON.stringify({ error: 'Titles array required', translations: [] }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const batch = titles.slice(0, MAX_TITLES_PER_REQUEST);
    const redisClient = getRedis();
    const results = new Array(batch.length).fill(null);
    const uncachedIndices = [];

    // Check Redis cache for each title
    if (redisClient) {
      try {
        const keys = batch.map(t => getCacheKey(t));
        const cached = await redisClient.mget(...keys);
        for (let i = 0; i < batch.length; i++) {
          if (cached[i]) {
            results[i] = cached[i];
          } else {
            uncachedIndices.push(i);
          }
        }
      } catch (cacheError) {
        console.warn('[Translate] Cache read error:', cacheError.message);
        for (let i = 0; i < batch.length; i++) {
          uncachedIndices.push(i);
        }
      }
    } else {
      for (let i = 0; i < batch.length; i++) {
        uncachedIndices.push(i);
      }
    }

    // If all cached, return immediately
    if (uncachedIndices.length === 0) {
      return new Response(JSON.stringify({ translations: results, cached: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Build prompt for uncached titles
    const uncachedTitles = uncachedIndices.map(i => batch[i]);
    const numberedTitles = uncachedTitles.map((t, i) => `${i + 1}. ${t}`).join('\n');

    const langName = targetLang === 'zh-TW' ? '繁體中文' : targetLang;
    const systemPrompt = `You are a news headline translator. Translate the following news headlines to ${langName}. Rules:
- Keep translations concise and natural
- Preserve proper nouns (company names, person names, place names) in their commonly used form
- Return ONLY the translations, one per line, numbered to match the input
- Do NOT add any commentary or explanation
- Maintain the original order`;

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: numberedTitles },
        ],
        temperature: 0.2,
        max_tokens: 1000,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limited', translations: results }), {
          status: 429,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ error: 'Groq API error', translations: results }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim();

    if (!content) {
      return new Response(JSON.stringify({ error: 'Empty response', translations: results }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Parse numbered translations
    const lines = content.split('\n')
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(line => line.length > 0);

    // Map translations back to results
    const cacheWrites = [];
    for (let i = 0; i < uncachedIndices.length; i++) {
      const translation = lines[i] || uncachedTitles[i]; // fallback to original
      const originalIndex = uncachedIndices[i];
      results[originalIndex] = translation;

      // Queue cache write
      if (redisClient && lines[i]) {
        cacheWrites.push(
          redisClient.set(getCacheKey(batch[originalIndex]), translation, { ex: CACHE_TTL_SECONDS })
            .catch(err => console.warn('[Translate] Cache write error:', err.message))
        );
      }
    }

    // Write cache in background
    if (cacheWrites.length > 0) {
      Promise.all(cacheWrites).catch(() => {});
    }

    return new Response(JSON.stringify({
      translations: results,
      cached: false,
      translated: uncachedIndices.length,
      tokens: data.usage?.total_tokens || 0,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=1800',
      },
    });

  } catch (error) {
    console.error('[Translate] Error:', error.name, error.message);
    return new Response(JSON.stringify({
      error: error.message,
      translations: [],
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
