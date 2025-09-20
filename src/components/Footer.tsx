'use client';

import React from 'react';
import { Github, Linkedin, Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations['en'];
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: <Github className="h-5 w-5" />, url: 'https://github.com/arizalwinangun', description: 'View my code repositories' },
    { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, url: 'https://linkedin.com/in/arizalwinangun', description: 'Connect with me professionally' },
    { name: 'Email', icon: <Mail className="h-5 w-5" />, url: 'mailto:arijalwinangun@gmail.com', description: 'Send me a direct email' },
    { name: 'WhatsApp', icon: <MessageCircle className="h-5 w-5" />, url: 'https://wa.me/6288809635936', description: 'Quick consultation via WhatsApp' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="brand-info">
                <h3 className="brand-name">Arizal Winangun</h3>
                <p className="brand-tagline">{t.footer.brand.tagline}</p>
                <p className="brand-description">{t.footer.brand.description}</p>
              </div>
              <div className="social-links">
                {socialLinks.map((link, index) => (
                  <a key={index} href={link.url} className="social-link" target="_blank" rel="noopener noreferrer" title={link.description}>
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4 className="link-title">{t.footer.links.quickLinks}</h4>
                <ul className="link-list">
                  {Object.entries(t.nav).map(([key, value]) => (
                    <li key={key}>
                      <a href={`#${key}`} className="footer-link">{value}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="link-group">
                <h4 className="link-title">{t.footer.links.services}</h4>
                <ul className="link-list">
                  {t.footer.servicesList.map((service, index) => (
                    <li key={index}><span className="service-item">{service}</span></li>
                  ))}
                </ul>
              </div>
              <div className="link-group contact-group hidden sm:block">
                <h4 className="link-title">{t.footer.links.contact}</h4>
                <div className="contact-info">
                  <div className="contact-item">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${t.contact.details.email}`} className="contact-link">{t.contact.details.email}</a>
                  </div>
                  <div className="contact-item">
                    <MessageCircle className="h-4 w-4" />
                    <a href={`https://wa.me/${t.contact.details.phone.replace(/\+/g, '')}`} className="contact-link">{t.contact.details.phone}</a>
                  </div>
                  <div className="availability">
                    <div className="status-indicator"></div>
                    <span>{t.footer.availability}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="copyright">
                <p>&copy; {currentYear} Arizal Winangun. {t.footer.copyright}</p>
                <p className="built-with">{t.footer.builtWith}</p>
              </div>
              <button onClick={scrollToTop} className="back-to-top">
                {t.footer.backToTop}
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;