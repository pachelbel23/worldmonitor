/**
 * Frontend translation service for news titles
 * 3-tier fallback: titleCache → Chrome Translation API → Groq API
 */

import { i18n } from '@/utils/i18n';

const titleCache = new Map<string, string>();
const BATCH_SIZE = 20;

// ─── Tier 2: Chrome Translation API (Chrome 131+) ─────────────────────────

let chromeTranslator: TranslatorInstance | null = null;
let chromeTranslatorPromise: Promise<TranslatorInstance | null> | null = null;
let chromeAvailable: boolean | null = null;

async function getChromeTranslator(): Promise<TranslatorInstance | null> {
  if (chromeAvailable === false) return null;
  if (chromeTranslator) return chromeTranslator;
  if (chromeTranslatorPromise) return chromeTranslatorPromise;

  chromeTranslatorPromise = (async () => {
    try {
      if (typeof Translator === 'undefined') {
        chromeAvailable = false;
        return null;
      }
      const availability = await Translator.availability({
        sourceLanguage: 'en',
        targetLanguage: 'zh-Hant',
      });
      if (availability === 'unavailable') {
        chromeAvailable = false;
        return null;
      }
      chromeTranslator = await Translator.create({
        sourceLanguage: 'en',
        targetLanguage: 'zh-Hant',
      });
      chromeAvailable = true;
      console.log('[Translation] Chrome Translator API ready');
      return chromeTranslator;
    } catch (err) {
      console.warn('[Translation] Chrome Translator init failed:', err);
      chromeAvailable = false;
      return null;
    }
  })();

  return chromeTranslatorPromise;
}

async function translateWithChrome(titles: string[]): Promise<void> {
  const translator = await getChromeTranslator();
  if (!translator) return;

  for (const title of titles) {
    try {
      const result = await translator.translate(title);
      if (result && result !== title) {
        titleCache.set(title, result);
      }
    } catch (err) {
      console.warn('[Translation] Chrome translate failed:', err);
    }
  }
}

// ─── Tier 3: Groq API (/api/groq-translate) ───────────────────────────────

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

async function translateWithGroq(titles: string[]): Promise<void> {
  const batches = chunkArray(titles, BATCH_SIZE);

  for (const batch of batches) {
    try {
      const res = await fetch('/api/groq-translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titles: batch, targetLang: 'zh-TW' }),
      });

      if (!res.ok) {
        console.warn(`[Translation] Groq API error: ${res.status}`);
        continue;
      }

      const data = await res.json();
      if (data.translations && Array.isArray(data.translations)) {
        for (let i = 0; i < batch.length; i++) {
          const translated = data.translations[i];
          if (typeof translated === 'string' && translated && translated !== batch[i]) {
            titleCache.set(batch[i]!, translated);
          }
        }
      }
    } catch (err) {
      console.warn('[Translation] Groq fetch error:', err);
    }
  }
}

// ─── Public API ────────────────────────────────────────────────────────────

/**
 * Translate an array of titles to Chinese using the fallback chain:
 *   Tier 1: titleCache (populated by native zh feeds or previous calls)
 *   Tier 2: Chrome Built-in Translation API (on-device, Chrome 131+)
 *   Tier 3: Groq API /api/groq-translate (rate-limited, 24h Redis cache)
 *
 * Returns the shared titleCache Map (original → translated).
 */
export async function translateTitles(titles: string[]): Promise<Map<string, string>> {
  let uncached = titles.filter(t => !titleCache.has(t));
  if (uncached.length === 0) return titleCache;

  // Tier 2: Chrome Translation API
  if (chromeAvailable !== false) {
    await translateWithChrome(uncached);
    uncached = uncached.filter(t => !titleCache.has(t));
  }

  // Tier 3: Groq API for remaining
  if (uncached.length > 0) {
    await translateWithGroq(uncached);
  }

  return titleCache;
}

/**
 * Pre-initialize Chrome Translator on first user interaction.
 * Called from App.ts to avoid latency on first translation.
 */
export function prewarmChromeTranslator(): void {
  if (i18n.getLocale() !== 'zh-TW') return;
  getChromeTranslator().catch(() => {});
}
