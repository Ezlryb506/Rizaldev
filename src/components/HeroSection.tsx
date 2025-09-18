'use client';

import React from 'react';
import { ArrowRight, Download, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';

const HeroSection = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations['en'];

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
                <MessageCircle className="h-5 w-5" />
                {t.hero.cta.consultation}
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/cv.pdf"
                className="btn-secondary inline-flex items-center gap-2"
                download
                aria-label={t.hero.cta.download}
              >
                <Download className="h-4 w-4" />
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
                  <div className="floating-elements">
                    <div className="floating-element element-1"></div>
                    <div className="floating-element element-2"></div>
                    <div className="floating-element element-3"></div>
                  </div>
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
