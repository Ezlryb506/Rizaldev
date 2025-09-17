'use client';

import React from 'react';
import { Moon, Sun, Palette, Languages } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAccentColor } from '@/contexts/AccentColorContext';
import { Button } from '@/components/ui/button';
import { translations } from '@/data/translations';

const Header = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { toggleAccentColor } = useAccentColor();
  const t = translations[language] || translations['en'];

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    const current = resolvedTheme || theme;
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">Arizal.dev</span>
          </div>
          
          <nav className="navigation">
            <button 
              onClick={() => scrollToSection('about')}
              className="nav-link"
            >
              {t.nav.about}
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="nav-link"
            >
              {t.nav.projects}
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="nav-link"
            >
              {t.nav.services}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="nav-link"
            >
              {t.nav.contact}
            </button>
          </nav>

          <div className="header-controls">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="control-btn"
              title="Toggle language"
            >
              <Languages className="h-4 w-4" />
              <span className="text-xs ml-1">{language.toUpperCase()}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAccentColor}
              className="control-btn"
              title="Toggle accent color"
            >
              <Palette className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="control-btn"
              title="Toggle theme"
            >
              {mounted ? (
                (resolvedTheme || theme) === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )
              ) : (
                <span className="inline-block h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;