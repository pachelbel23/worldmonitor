/**
 * Pluralization support for multi-language applications
 * English supports singular/plural forms, Chinese uses unified forms
 */

export interface PluralForm {
  one: string;
  other: string;
  zh_tw?: string;
}

/**
 * Pluralize a string based on count and locale
 * Chinese (zh-TW) uses unified form (no plural), English uses count-based form
 * 
 * @param count - The count to determine plural form
 * @param forms - Object with 'one' (singular), 'other' (plural), and optionally 'zh_tw'
 * @param locale - Optional locale override (defaults to localStorage or 'en')
 * @returns Localized string
 */
export function pluralize(count: number, forms: PluralForm, locale?: string): string {
  const lang = locale || localStorage.getItem('worldtrade-locale') || 'en';

  if (lang === 'zh-TW') {
    // Chinese: unified form (no plural distinction)
    return forms.zh_tw || forms.other;
  }

  // English and other languages: use count-based pluralization
  return count === 1 ? forms.one : forms.other;
}

/**
 * Predefined plural forms for common UI strings
 */
export const PLURAL_FORMS = {
  intelligence_findings: {
    en: { one: '1 intelligence finding', other: '${count} intelligence findings' },
    'zh-TW': '${count} 個智能發現'
  },
  conflicts: {
    en: { one: '1 conflict', other: '${count} conflicts' },
    'zh-TW': '${count} 個衝突'
  },
  articles: {
    en: { one: '1 article', other: '${count} articles' },
    'zh-TW': '${count} 篇文章'
  },
  events: {
    en: { one: '1 event', other: '${count} events' },
    'zh-TW': '${count} 個事件'
  }
};
