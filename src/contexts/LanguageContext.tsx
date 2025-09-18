'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type SupportedLanguage = 'en' | 'id'

type LanguageContextValue = {
  language: SupportedLanguage
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

type ProviderProps = { children: React.ReactNode; initialLanguage?: SupportedLanguage };

export const LanguageProvider = ({ children, initialLanguage }: ProviderProps) => {
  const [language, setLanguage] = useState<SupportedLanguage>(initialLanguage ?? 'en');

  useEffect(() => {
    // If server already decided the language, don't auto-detect on client to avoid hydration mismatch
    if (initialLanguage) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('[Language] Using server-provided initial language:', initialLanguage);
      }
      return;
    }
    try {
      // 1) URL override: ?lang=id|en
      const url = new URL(window.location.href);
      const urlLang = url.searchParams.get('lang');
      if (urlLang === 'en' || urlLang === 'id') {
        setLanguage(urlLang);
        localStorage.setItem('portfolio-language', urlLang);
        if (process.env.NODE_ENV !== 'production') {
          console.log('[Language] Using URL override:', urlLang);
        }
        return;
      }

      // 2) Local storage
      const savedLanguage = localStorage.getItem('portfolio-language') as SupportedLanguage | null;
      if (savedLanguage === 'en' || savedLanguage === 'id') {
        setLanguage(savedLanguage);
        if (process.env.NODE_ENV !== 'production') {
          console.log('[Language] Using saved language from storage:', savedLanguage);
        }
        return;
      }

      // 3) Browser languages
      const prefers = (navigator.languages && navigator.languages.length > 0)
        ? navigator.languages
        : [navigator.language];
      const prefersLower = prefers.map((l) => (l || '').toLowerCase());
      const hasID = prefersLower.some((l) => l.startsWith('id'));
      const hasEN = prefersLower.some((l) => l.startsWith('en'));

      // 4) Timezone heuristic (Indonesia): Asia/Jakarta, Asia/Makassar, Asia/Jayapura
      const tz = (() => {
        try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch { return ''; }
      })();
      const isIDTz = ['asia/jakarta', 'asia/makassar', 'asia/jayapura'].includes(tz.toLowerCase());

      let detected: SupportedLanguage = 'en';
      if (hasID || isIDTz) detected = 'id';
      else if (hasEN) detected = 'en';

      setLanguage(detected);
      localStorage.setItem('portfolio-language', detected);
      if (process.env.NODE_ENV !== 'production') {
        console.log('[Language] Auto-detected language:', { prefers, tz, detected });
      }
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('[Language] Detection error, fallback to en:', e);
      }
      setLanguage('en');
    }
  }, [initialLanguage]);

  useEffect(() => {
    document.body.classList.remove('lang-en', 'lang-id');
    document.body.classList.add(`lang-${language}`);
  }, [language]);

  const toggleLanguage = () => {
    const newLanguage: SupportedLanguage = language === 'en' ? 'id' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('portfolio-language', newLanguage);
    try {
      // keep server in sync on next requests
      document.cookie = `lang=${newLanguage}; path=/; max-age=${60 * 60 * 24 * 365}`;
    } catch {}
  };

  const value: LanguageContextValue = {
    language,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
