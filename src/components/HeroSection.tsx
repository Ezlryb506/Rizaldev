'use client';

import React from 'react';
import { ArrowRight, Download, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';

const HeroSection = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations['en'];

  const handleScheduleConsultation = () => {
    const message = language === 'id' 
      ? 'Halo Arizal, saya ingin menjadwalkan konsultasi tentang layanan pengembangan web.'
      : 'Hi Arizal, I\'d like to schedule a consultation about web development services.';
    window.open(`https://wa.me/6288809635936?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleDownloadCV = () => {
    // Mock CV download - will be replaced with actual CV link
    console.log('Downloading CV...');
  };

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
              <Button 
                className="btn-primary hero-cta"
                onClick={handleScheduleConsultation}
              >
                <MessageCircle className="h-5 w-5" />
                {t.hero.cta.consultation}
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline"
                className="btn-secondary"
                onClick={handleDownloadCV}
              >
                <Download className="h-4 w-4" />
                {t.hero.cta.download}
              </Button>
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
