'use client';

import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { heroContent } from '@/data/hero';

const HERO_WHATSAPP_NUMBER = '6288809635936';

const HERO_CV_LINK = 'https://docs.google.com/document/d/1OomTs1wdttBdxpr6T-j5KmB94IoEvow6/edit?usp=drive_link&ouid=116978898334304098138&rtpof=true&sd=true';

const HeroActions = () => {
  const { language } = useLanguage();
  const content = heroContent[language] || heroContent.en;

  const waHref = useMemo(() => {
    return `https://wa.me/${HERO_WHATSAPP_NUMBER}?text=${encodeURIComponent(content.cta.waMessage)}`;
  }, [content.cta.waMessage]);

  return (
    <div className="hero-actions">
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary hero-cta inline-flex items-center gap-2"
        aria-label={content.cta.consultation}
      >
        <span className="inline-block h-5 w-5" aria-hidden="true">
          <svg
            className="h-full w-full"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            role="presentation"
          >
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.45 8.45 0 0 1 8 8v.5Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {content.cta.consultation}
        <span className="inline-block h-4 w-4" aria-hidden="true">
          <svg
            className="h-full w-full"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            role="presentation"
          >
            <path
              d="M5 12h14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="m12 5 7 7-7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>

      <a
        href={HERO_CV_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary inline-flex items-center gap-2"
        download
        aria-label={content.cta.download}
      >
        <span className="inline-block h-4 w-4" aria-hidden="true">
          <svg
            className="h-full w-full"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            role="presentation"
          >
            <path
              d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 10l5 5 5-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 15V3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {content.cta.download}
      </a>
    </div>
  );
};

export default HeroActions;

