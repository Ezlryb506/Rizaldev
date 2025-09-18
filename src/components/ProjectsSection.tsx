'use client';

import React from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage, type SupportedLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';

// Types
type LanguageKeys = keyof typeof translations; // 'en' | 'id'

type ProjectKey = 'quicktix' | 'abadiJaya' | (string & {})

type ProjectBase = {
  key: ProjectKey
  image: string
  liveUrl: string
  githubUrl: string
  category: string
  technologies: string[]
}

type ProjectLocalized = {
  title?: string
  status?: string
  description?: string
  features?: string[]
}

type ProjectsTranslations = {
  title: string
  description: string
  status: { live: string; completed: string }
  features: string
  actions: { viewLive: string; code: string }
  cta: { title: string; description: string; button: string }
  list?: Partial<Record<ProjectKey, ProjectLocalized>>
}

// Mock data structure that should come from a CMS or API in the future
const projectData: ProjectBase[] = [
  {
    key: 'quicktix',
    image: '/placeholder-project-1.jpg',
    liveUrl: '#',
    githubUrl: 'https://github.com/Ezlryb506/QuickTix_Website-Penjualan-Tiket-Event',
    category: 'E-Commerce',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'PHP', 'MySQL', 'Code Igniter 3', 'Ajax', 'JQuery'],
  },
  {
    key: 'abadiJaya',
    image: '/placeholder-project-2.jpg',
    liveUrl: 'https://abadi-jaya.vercel.app/',
    githubUrl: 'https://github.com/Ezlryb506/abadi_jaya',
    category: 'Business Website',
    technologies: ['FS Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Supabase','PostgreSQL', 'SEO Optimization'],
  },
];

const ProjectsSection = () => {
  const { language } = useLanguage();
  const lang: SupportedLanguage = language;
  const t = translations[lang as LanguageKeys];
  const pt: ProjectsTranslations = t.projects;

  // Merge static data with translations safely
  const projects: Array<ProjectBase & ProjectLocalized> = projectData.map((p) => {
    const localized: ProjectLocalized = pt.list?.[p.key] ?? {};
    return { ...p, ...localized };
  });

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{pt.title}</h2>
          <p className="section-description">{pt.description}</p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => {
            const statusKeyRaw = (project.status ?? '').toLowerCase();
            let localizedStatus = project.status ?? '';
            if (statusKeyRaw === 'live' || statusKeyRaw === 'completed') {
              localizedStatus = pt.status[statusKeyRaw];
            }
            const features = Array.isArray(project.features) ? project.features : [];

            return (
              <Card key={project.key} className="project-card">
                <div className="project-image">
                  <div className="project-image-placeholder">
                    <div className="placeholder-text">Project Screenshot</div>
                    <div className="placeholder-overlay">
                      <span className="project-category">{project.category}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="project-content">
                  <div className="project-header">
                    <div className="project-title-section">
                      <h3 className="project-title">{project.title ?? project.key}</h3>
                      <span className="project-status">{localizedStatus}</span>
                    </div>
                  </div>

                  <p className="project-description">{project.description ?? ''}</p>

                  <div className="project-features">
                    <h4 className="features-title">{pt.features}</h4>
                    <ul className="features-list">
                      {features.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="feature-item">
                          <ArrowRight className="h-3 w-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-tech">
                    <div className="tech-stack">
                      {project.technologies.map((tech: string, techIndex: number) => (
                        <Badge key={techIndex} variant="secondary" className="tech-badge">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="project-actions">
                    <Button 
                      className="project-btn primary"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                      {pt.actions.viewLive}
                    </Button>
                    <Button 
                      variant="outline"
                      className="project-btn secondary"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="h-4 w-4" />
                      {pt.actions.code}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="projects-cta">
          <div className="cta-content">
            <h3>{pt.cta.title}</h3>
            <p>{pt.cta.description}</p>
            <Button className="cta-button">
              <ExternalLink className="h-4 w-4" />
              {pt.cta.button}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;