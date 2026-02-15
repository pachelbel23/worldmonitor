type TranslatorAvailability = 'available' | 'downloadable' | 'downloading' | 'unavailable';

interface TranslatorLanguagePair {
  sourceLanguage: string;
  targetLanguage: string;
}

interface TranslatorCreateOptions extends TranslatorLanguagePair {
  monitor?: (monitor: { addEventListener: (event: string, cb: () => void) => void }) => void;
}

interface TranslatorInstance {
  translate(input: string): Promise<string>;
  destroy(): void;
}

interface TranslatorStatics {
  availability(options: TranslatorLanguagePair): Promise<TranslatorAvailability>;
  create(options: TranslatorCreateOptions): Promise<TranslatorInstance>;
}

// Chrome 131+ exposes Translator as a global
declare const Translator: TranslatorStatics | undefined;
