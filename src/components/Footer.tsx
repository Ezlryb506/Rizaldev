'use client';

import React from 'react';
import { Github, Linkedin, Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations['en'];
  const currentYear = new Date().getFullYear();

  // Helper function to format WhatsApp number
  const formatWhatsAppNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/\D/g, '');
  };

  // Build mailto link with subject/body preset per language
  const emailAddress = t.contact?.details?.email || 'arijalwinangun@gmail.com';
  const mailSubject = language === 'id'
    ? 'Permintaan Konsultasi dari Portfolio'
    : 'Consultation Request from Portfolio';
  const mailBody = language === 'id'
    ? `Halo Arizal,%0D%0A%0D%0ASaya tertarik untuk mendiskusikan proyek pengembangan web. Berikut ringkasannya:%0D%0A- Nama:%0D%0A- Perusahaan:%0D%0A- Anggaran Perkiraan:%0D%0A- Timeline:%0D%0A- Deskripsi singkat kebutuhan:%0D%0A%0D%0ATerima kasih.`
    : `Hi Arizal,%0D%0A%0D%0AI'm interested in discussing a web development project. Here is a brief summary:%0D%0A- Name:%0D%0A- Company:%0D%0A- Estimated Budget:%0D%0A- Timeline:%0D%0A- Short description of needs:%0D%0A%0D%0AThank you.`;
  // Keep classic mailto if needed later; currently not used
  // const mailtoHref = `mailto:${emailAddress}?subject=${encodeURIComponent(mailSubject)}&body=${mailBody}`;
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${encodeURIComponent(mailSubject)}&body=${mailBody}`;

  const socialLinks = [
    { name: 'GitHub', icon: <Github className="h-5 w-5" />, url: 'https://github.com/Ezlryb506', description: 'View my code repositories' },
    { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, url: 'https://www.linkedin.com/in/arizal-winangun-319a67386', description: 'Connect with me professionally' },
    { name: 'Email', icon: <Mail className="h-5 w-5" />, url: gmailHref, description: 'Compose email in Gmail' },
    { name: 'WhatsApp', icon: <MessageCircle className="h-5 w-5" />, url: `https://wa.me/${formatWhatsAppNumber(t.contact?.details?.phone || '+62 888 0963 5936')}` , description: 'Quick consultation via WhatsApp' }
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
                {socialLinks.map((link, index) => {
                  const isHttp = /^https?:\/\//.test(link.url);
                  const target = isHttp ? "_blank" : undefined;
                  const rel = isHttp ? "noopener noreferrer" : undefined;
                  return (
                    <a
                      key={index}
                      href={link.url}
                      className="social-link"
                      target={target}
                      rel={rel}
                      title={link.description}
                    >
                      {link.icon}
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4 className="link-title">{t.footer.links.quickLinks}</h4>
                <ul className="link-list">
                  {Object.entries(t.nav).map(([key, value]) => (
                    <li key={key}>
                      <a
                        href={`/#${key}`}
                        className="footer-link"
                        aria-label={`Go to ${value}`}
                      >
                        {value}
                      </a>
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
                    <Mail className="h-4 w-4" />
                    <a href={gmailHref} target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="Compose email in Gmail with preset subject and body">
                      {(language === 'id' ? 'Kirim via Gmail' : 'Send via Gmail')}
                    </a>
                  </div>
                  <div className="contact-item">
                    <MessageCircle className="h-4 w-4" />
                    <a href={`https://wa.me/${formatWhatsAppNumber(t.contact.details.phone)}`} className="contact-link">{t.contact.details.phone}</a>
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
