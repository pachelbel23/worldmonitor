/**
 * Frontend translation service for news titles
 * Memory-cached, batch API calls to /api/groq-translate
 */

const titleCache = new Map<string, string>();
const BATCH_SIZE = 20;

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

async function fetchTranslations(titles: string[]): Promise<void> {
  const batches = chunkArray(titles, BATCH_SIZE);

  for (const batch of batches) {
    try {
      const res = await fetch('/api/groq-translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titles: batch, targetLang: 'zh-TW' }),
      });

      if (!res.ok) {
        console.warn(`[Translation] API error: ${res.status}`);
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
      console.warn('[Translation] Fetch error:', err);
    }
  }
}

/**
 * Translate an array of titles to Chinese.
 * Returns a Map of original → translated titles.
 * Titles already in cache are returned immediately.
 * Uncached titles are sent to the API in batches.
 */
export async function translateTitles(titles: string[]): Promise<Map<string, string>> {
  const untranslated = titles.filter(t => !titleCache.has(t));

  if (untranslated.length > 0) {
    await fetchTranslations(untranslated);
  }

  return titleCache;
}
