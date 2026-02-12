import { enTranslations } from '@/i18n/en';
import { zhTWTranslations } from '@/i18n/zh-TW';

type TranslationDict = Record<string, string>;

const translations: Record<string, TranslationDict> = {
  'en': enTranslations,
  'zh-TW': zhTWTranslations,
};

class I18n {
  private locale: string = 'en';
  private readonly LOCALE_KEY = 'worldmonitor-locale';

  constructor() {
    this.init();
  }

  private init() {
    const savedLocale = localStorage.getItem(this.LOCALE_KEY);
    console.log('[i18n] init() - savedLocale from localStorage:', savedLocale);
    console.log('[i18n] init() - navigator.language:', navigator.language);
    
    if (savedLocale && this.isValidLocale(savedLocale)) {
      this.locale = savedLocale;
      console.log('[i18n] init() - using saved locale:', this.locale);
    } else {
      const browserLang = navigator.language.toLowerCase();
      // Support any Chinese variant: zh, zh-tw, zh-hk, zh-cn, etc.
      if (browserLang.startsWith('zh')) {
        this.locale = 'zh-TW';
        console.log('[i18n] init() - detected browser Chinese, using zh-TW');
      } else {
        this.locale = 'en';
        console.log('[i18n] init() - using default English locale');
      }
    }
    console.log('[i18n] init() - final locale:', this.locale);
  }

  private isValidLocale(locale: string): boolean {
    return locale === 'en' || locale === 'zh-TW';
  }

  public setLocale(locale: string) {
    if (!this.isValidLocale(locale)) {
      console.error('[i18n] setLocale() - invalid locale:', locale);
      return;
    }
    
    console.log('[i18n] setLocale() called with:', locale);
    this.locale = locale;
    
    try {
      localStorage.setItem(this.LOCALE_KEY, locale);
      console.log('[i18n] successfully saved locale to localStorage:', locale);
    } catch (e) {
      console.error('[i18n] failed to save locale to localStorage:', e);
      // Continue anyway - i18n will work for this session
    }
    
    console.log('[i18n] reloading page to apply language change');
    window.location.reload();
  }

  public getLocale() {
    return this.locale;
  }

  public getDebugInfo() {
    return {
      currentLocale: this.locale,
      savedLocale: localStorage.getItem(this.LOCALE_KEY),
      browserLanguage: navigator.language,
      allStorageKeys: Object.keys(localStorage),
    };
  }

  public t(key: string): string {
    const dict = translations[this.locale] || translations['en'];
    if (!dict) return key;
    return dict[key] || key;
  }
}

export const i18n = new I18n();
export const t = (key: string) => i18n.t(key);
