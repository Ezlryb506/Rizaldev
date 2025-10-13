'use client';

import React from 'react';
import { Globe, Zap, Puzzle, Brain, Clock, Shield, Lightbulb, Rocket, Gauge, LayoutGrid, ShieldCheck, BadgeDollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { servicesTranslations } from '@/data/translations/services';

// Derive strong types for keys from the English translation shape (keys are consistent across locales)
type ServiceKey = keyof typeof servicesTranslations.en.services.list;
type AdvantageKey = keyof typeof servicesTranslations.en.services.advantages.list;

const serviceIcons: Record<ServiceKey, React.ReactNode> = {
  webDev: <Globe className="h-8 w-8" />,
  frontend: <Zap className="h-8 w-8" />,
  integration: <Puzzle className="h-8 w-8" />,
  consultation: <Brain className="h-8 w-8" />,
  optimization: <Gauge className="h-8 w-8" />,
  designSystem: <LayoutGrid className="h-8 w-8" />,
};

const advantageIcons: Record<AdvantageKey, React.ReactNode> = {
  speed: <Clock className="h-6 w-6" />,
  quality: <Shield className="h-6 w-6" />,
  innovation: <Lightbulb className="h-6 w-6" />,
  growth: <Rocket className="h-6 w-6" />,
  security: <ShieldCheck className="h-6 w-6" />,
  cost: <BadgeDollarSign className="h-6 w-6" />,
};

const ServicesSection = () => {
  const { language } = useLanguage();
  const t = servicesTranslations[language] || servicesTranslations.en;

  // Use typed keys to avoid string index errors
  const serviceKeys = Object.keys(t.services.list) as ServiceKey[];
  const services = serviceKeys.map((key) => ({
    ...t.services.list[key],
    key,
    icon: serviceIcons[key],
  }));

  const advantageKeys = Object.keys(t.services.advantages.list) as AdvantageKey[];
  const advantages = advantageKeys.map((key) => ({
    ...t.services.advantages.list[key],
    key,
    icon: advantageIcons[key],
  }));

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.services.title}</h2>
          <p className="section-description">{t.services.description}</p>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.key} className="service-card">
              <CardContent className="service-content">
                <div className="service-header">
                  <div className="service-icon">{service.icon}</div>
                  <div className="service-meta">
                    <h3 className="service-title">{service.title}</h3>
                    <div className="service-info">
                      <span className="service-pricing">{service.pricing}</span>
                      <span className="service-timeline">{service.timeline}</span>
                    </div>
                  </div>
                </div>

                <p className="service-description">{service.description}</p>

                <div className="service-features">
                  <ul className="features-list">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="feature-item">
                        <div className="feature-dot"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="advantages-section">
          <h3 className="advantages-title">{t.services.advantages.title}</h3>
          <div className="advantages-grid">
            {advantages.map((advantage) => (
              <div key={advantage.key} className="advantage-item">
                <div className="advantage-icon">{advantage.icon}</div>
                <div className="advantage-content">
                  <h4 className="advantage-title">{advantage.title}</h4>
                  <p className="advantage-description">{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
