/**
 * Date and time formatting with multi-language support
 * Provides locale-aware date/time formatting functions
 */

/**
 * Format a date and time string with locale awareness
 * @param date - The Date object to format
 * @param locale - Optional locale override (defaults to localStorage or 'en')
 * @returns Formatted date-time string
 */
export function formatDateTime(date: Date, locale?: string): string {
  const lang = locale || localStorage.getItem('worldtrade-locale') || 'en';

  const localeMap: Record<string, string> = {
    'en': 'en-US',
    'zh-TW': 'zh-TW'
  };

  const localeCode = localeMap[lang] || 'en-US';

  return date.toLocaleString(localeCode, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  });
}

/**
 * Format a date string with locale awareness (no time)
 * @param date - The Date object to format
 * @param locale - Optional locale override (defaults to localStorage or 'en')
 * @returns Formatted date string
 */
export function formatDate(date: Date, locale?: string): string {
  const lang = locale || localStorage.getItem('worldtrade-locale') || 'en';

  const localeMap: Record<string, string> = {
    'en': 'en-US',
    'zh-TW': 'zh-TW'
  };

  const localeCode = localeMap[lang] || 'en-US';

  return date.toLocaleDateString(localeCode, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Format a date for month/year display
 * @param date - The Date object to format
 * @param locale - Optional locale override
 * @returns Formatted month-year string
 */
export function formatMonthYear(date: Date, locale?: string): string {
  const lang = locale || localStorage.getItem('worldtrade-locale') || 'en';

  const localeMap: Record<string, string> = {
    'en': 'en-US',
    'zh-TW': 'zh-TW'
  };

  const localeCode = localeMap[lang] || 'en-US';

  return date.toLocaleDateString(localeCode, {
    year: 'numeric',
    month: 'short'
  });
}

/**
 * Format a date with full localization
 * @param date - The Date object to format
 * @param locale - Optional locale override
 * @returns Formatted date string with full options
 */
export function formatFullDate(date: Date, locale?: string): string {
  const lang = locale || localStorage.getItem('worldtrade-locale') || 'en';

  const localeMap: Record<string, string> = {
    'en': 'en-US',
    'zh-TW': 'zh-TW'
  };

  const localeCode = localeMap[lang] || 'en-US';

  return date.toLocaleDateString(localeCode, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Format time only
 * @param date - The Date object to format
 * @param locale - Optional locale override
 * @returns Formatted time string
 */
export function formatTime(date: Date, locale?: string): string {
  const lang = locale || localStorage.getItem('worldtrade-locale') || 'en';

  const localeMap: Record<string, string> = {
    'en': 'en-US',
    'zh-TW': 'zh-TW'
  };

  const localeCode = localeMap[lang] || 'en-US';

  return date.toLocaleTimeString(localeCode, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  });
}
