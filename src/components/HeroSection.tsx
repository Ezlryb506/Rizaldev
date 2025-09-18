'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';

const HeroSection = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations['en'];

  // Defer non-critical icons to client to reduce server HTML size and initial work
  const MessageCircleIcon = dynamic(() => import('lucide-react').then(m => m.MessageCircle), { ssr: false });
  const DownloadIcon = dynamic(() => import('lucide-react').then(m => m.Download), { ssr: false });
  const ArrowRightIcon = dynamic(() => import('lucide-react').then(m => m.ArrowRight), { ssr: false });

  // Defer decorative floating elements until after first paint
  const [showDecor, setShowDecor] = React.useState(false);
  React.useEffect(() => {
    const id = window.requestAnimationFrame(() => setShowDecor(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const waText = language === 'id'
    ? 'Halo Arizal, saya ingin menjadwalkan konsultasi tentang layanan pengembangan web.'
    : "Hi Arizal, I'd like to schedule a consultation about web development services.";
  const waHref = `https://wa.me/6288809635936?text=${encodeURIComponent(waText)}`;

  return (
    <section className="hero-section" id="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-greeting">
              <span className="greeting-text">{t.hero.greeting}</span>
            </div>
            
            <h1 className="hero-title">
              <span className="title-name">{t.hero.name}</span>
              <span className="title-role">{t.hero.role}</span>
              <span className="title-specialization">
                {t.hero.specialization} <span className="accent-text">{t.hero.aiWorkflows}</span>
              </span>
            </h1>

            <p className="hero-description">
              {t.hero.description}
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">3+</span>
                <span className="stat-label">{t.hero.stats.experience}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">{t.hero.stats.projects}</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">{t.hero.stats.satisfaction}</span>
              </div>
            </div>

            <div className="hero-actions">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary hero-cta inline-flex items-center gap-2"
                aria-label={t.hero.cta.consultation}
              >
                {/* fixed-size placeholder to avoid CLS while icon loads */}
                <span className="inline-block h-5 w-5" aria-hidden="true">
                  <MessageCircleIcon className="h-5 w-5" />
                </span>
                {t.hero.cta.consultation}
                <span className="inline-block h-4 w-4" aria-hidden="true">
                  <ArrowRightIcon className="h-4 w-4" />
                </span>
              </a>

              <a
                href="/cv.pdf"
                className="btn-secondary inline-flex items-center gap-2"
                download
                aria-label={t.hero.cta.download}
              >
                <span className="inline-block h-4 w-4" aria-hidden="true">
                  <DownloadIcon className="h-4 w-4" />
                </span>
                {t.hero.cta.download}
              </a>
            </div>
          </div>

          <div className="hero-image">
            <div className="image-container">
              <div className="profile-image-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-avatar">
                    <span>AW</span>
                  </div>
                  {showDecor && (
                    <div className="floating-elements" aria-hidden="true">
                      <div className="floating-element element-1"></div>
                      <div className="floating-element element-2"></div>
                      <div className="floating-element element-3"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
