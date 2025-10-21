'use client';

import React from 'react';
import { Moon, Sun, Palette, Languages, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAccentColor } from '@/contexts/AccentColorContext';
import { Button } from '@/components/ui/button';
import { coreTranslations } from '@/data/translations/core';

const Header = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { toggleAccentColor } = useAccentColor();
  const router = useRouter();
  const pathname = usePathname();
  const t = coreTranslations[language] || coreTranslations.en;

  const [mounted, setMounted] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentSection, setCurrentSection] = React.useState<string | null>(null);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Observe sections to highlight active nav item
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const sectionIds = ['hero', 'stack', 'services', 'projects', 'contact'];
    const headerOffset = 70; // header height
    const thresholds = Array.from({ length: 21 }, (_, index) => index / 20);
    const observedElements = new Map<string, HTMLElement>();
    const ratios = new Map<string, number>();

    const resolveNavId = (sectionId: string | null) =>
      sectionId === 'hero' ? 'about' : sectionId;

    const updateCurrentSectionFromState = () => {
      if (observedElements.size === 0) {
        setCurrentSection((prev) => (prev === null ? prev : null));
        return;
      }

      let nextSection: string | null = null;
      let bestRatio = 0;

      sectionIds.forEach((id) => {
        const ratio = ratios.get(id);
        if (ratio === undefined) return;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          nextSection = id;
        }
      });

      if (!nextSection) {
        observedElements.forEach((element, id) => {
          if (nextSection) return;
          const rect = element.getBoundingClientRect();
          if (rect.top <= headerOffset && rect.bottom >= headerOffset) {
            nextSection = id;
          }
        });
      }

      if (!nextSection) {
        let smallestPositive = Number.POSITIVE_INFINITY;
        observedElements.forEach((element, id) => {
          const rect = element.getBoundingClientRect();
          if (rect.top > headerOffset && rect.top < smallestPositive) {
            smallestPositive = rect.top;
            nextSection = id;
          }
        });
      }

      if (!nextSection) {
        let largestNegative = -Number.POSITIVE_INFINITY;
        observedElements.forEach((element, id) => {
          const rect = element.getBoundingClientRect();
          if (rect.bottom < headerOffset && rect.bottom > largestNegative) {
            largestNegative = rect.bottom;
            nextSection = id;
          }
        });
      }

      const navId = resolveNavId(nextSection);
      setCurrentSection((prev) => (prev === navId ? prev : navId));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id;
          if (!id) return;

          if (entry.isIntersecting) {
            ratios.set(id, entry.intersectionRatio);
          } else {
            ratios.delete(id);
          }
        });

        updateCurrentSectionFromState();
      },
      {
        root: null,
        threshold: thresholds,
        rootMargin: `-${headerOffset}px 0px -40% 0px`,
      }
    );

    const observeAvailableSections = () => {
      sectionIds.forEach((id) => {
        if (observedElements.has(id)) return;

        const element = document.getElementById(id);
        if (element) {
          observedElements.set(id, element);
          observer.observe(element);
        }
      });

      updateCurrentSectionFromState();
    };

    observeAvailableSections();

    const mutationObserver = new MutationObserver(() => {
      observeAvailableSections();

      const allObserved = sectionIds.every((id) => observedElements.has(id));
      if (allObserved) {
        mutationObserver.disconnect();
      }
    });

    const targetNode = document.body;
    if (targetNode) {
      mutationObserver.observe(targetNode, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
      ratios.clear();
      observedElements.clear();
    };
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

