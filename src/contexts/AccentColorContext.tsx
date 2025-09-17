'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type SupportedAccent = 'green' | 'blue'

type AccentColorContextValue = {
  accentColor: SupportedAccent
  toggleAccentColor: () => void
}

const AccentColorContext = createContext<AccentColorContextValue | undefined>(undefined);

export const useAccentColor = () => {
  const context = useContext(AccentColorContext);
  if (!context) {
    throw new Error('useAccentColor must be used within a AccentColorProvider');
  }
  return context;
};

export const AccentColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [accentColor, setAccentColor] = useState<SupportedAccent>('green');

  useEffect(() => {
    const savedAccent = localStorage.getItem('portfolio-accent') as SupportedAccent | null;
    if (savedAccent === 'green' || savedAccent === 'blue') {
      setAccentColor(savedAccent);
    }
  }, []);

  useEffect(() => {
    document.body.classList.remove('accent-green', 'accent-blue');
    document.body.classList.add(`accent-${accentColor}`);
  }, [accentColor]);

  const toggleAccentColor = () => {
    const newAccent: SupportedAccent = accentColor === 'green' ? 'blue' : 'green';
    setAccentColor(newAccent);
    localStorage.setItem('portfolio-accent', newAccent);
  };

  const value: AccentColorContextValue = {
    accentColor,
    toggleAccentColor,
  };

  return (
    <AccentColorContext.Provider value={value}>
      {children}
    </AccentColorContext.Provider>
  );
};
