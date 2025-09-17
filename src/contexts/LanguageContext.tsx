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

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolio-language') as SupportedLanguage | null;
    if (savedLanguage === 'en' || savedLanguage === 'id') {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.body.classList.remove('lang-en', 'lang-id');
    document.body.classList.add(`lang-${language}`);
  }, [language]);

  const toggleLanguage = () => {
    const newLanguage: SupportedLanguage = language === 'en' ? 'id' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('portfolio-language', newLanguage);
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
