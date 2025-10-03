'use client';

import React from 'react';
import { Moon, Sun, Palette, Languages, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAccentColor } from '@/contexts/AccentColorContext';
import { Button } from '@/components/ui/button';
import { translations } from '@/data/translations';

const Header = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { toggleAccentColor } = useAccentColor();
  const router = useRouter();
  const pathname = usePathname();
  const t = translations[language] || translations['en'];

  const [mounted, setMounted] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentSection, setCurrentSection] = React.useState<string | null>(null);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Observe sections to highlight active nav item
  React.useEffect(() => {
    // Re-evaluate on route changes so observer attaches when landing page mounts
    const sectionIds = ['hero', 'stack', 'services', 'projects', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) {
      // Not on a page with sections; clear active state
      setCurrentSection(null);
      return;
    }

    const headerOffset = 70; // header height
    const observer = new IntersectionObserver(
      (entries) => {
        let top: { id: string; ratio: number } | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id;
            const ratio = entry.intersectionRatio;
            if (!top || ratio > top.ratio) top = { id, ratio };
          }
        }
        if (top) {
          setCurrentSection(top.id === 'hero' ? 'about' : top.id);
        }
      },
      {
        root: null,
        threshold: [0.25, 0.5, 0.75],
        rootMargin: `-${headerOffset}px 0px -40% 0px`,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const scrollToSection = (sectionId: string) => {
    const normalized = sectionId === 'hero' ? 'about' : sectionId;
    setCurrentSection(normalized);

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${sectionId}`);
    }
    setMobileOpen(false);
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
          
          <nav className="navigation desktop-only">
            <button 
              onClick={() => scrollToSection('hero')}
              className={`nav-link ${currentSection === 'about' ? 'active' : ''}`}
            >
              {t.nav.about}
            </button>
            <button 
              onClick={() => scrollToSection('stack')}
              className={`nav-link ${currentSection === 'stack' ? 'active' : ''}`}
            >
              {t.nav.stack}
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className={`nav-link ${currentSection === 'services' ? 'active' : ''}`}
            >
              {t.nav.services}
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className={`nav-link ${currentSection === 'projects' ? 'active' : ''}`}
            >
              {t.nav.projects}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`nav-link ${currentSection === 'contact' ? 'active' : ''}`}
            >
              {t.nav.contact}
            </button>
          </nav>

          <div className="header-controls">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="control-btn control-btn--lang"
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
            {/* Mobile hamburger toggle */}
            <Button
              aria-label="Toggle menu"
              variant="ghost"
              size="sm"
              className="control-btn mobile-toggle"
              onClick={() => setMobileOpen((prev) => !prev)}
              title="Toggle navigation menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        {/* Mobile dropdown menu */}
        <nav className={`mobile-menu ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
          <button className={`mobile-link ${currentSection === 'about' ? 'active' : ''}`} onClick={() => scrollToSection('hero')}>{t.nav.about}</button>
          <button className={`mobile-link ${currentSection === 'stack' ? 'active' : ''}`} onClick={() => scrollToSection('stack')}>{t.nav.stack}</button>
          <button className={`mobile-link ${currentSection === 'services' ? 'active' : ''}`} onClick={() => scrollToSection('services')}>{t.nav.services}</button>
          <button className={`mobile-link ${currentSection === 'projects' ? 'active' : ''}`} onClick={() => scrollToSection('projects')}>{t.nav.projects}</button>
          <button className={`mobile-link ${currentSection === 'contact' ? 'active' : ''}`} onClick={() => scrollToSection('contact')}>{t.nav.contact}</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

