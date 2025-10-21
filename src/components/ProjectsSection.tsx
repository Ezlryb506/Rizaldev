'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, ArrowRight, Images } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage, type SupportedLanguage } from '@/contexts/LanguageContext';
import { projectsTranslations } from '@/data/translations/projects';

// Types
type LanguageKeys = keyof typeof projectsTranslations; // 'en' | 'id'

type ProjectKey = 'quicktix' | 'abadiJaya' | (string & {})

type ProjectBase = {
  key: ProjectKey
  image: string
  liveUrl: string
  githubUrl: string
  category: string
  technologies: readonly string[]
  photosUrl?: string
}

type ProjectLocalized = {
  title?: string
  status?: string
  description?: string
  features?: readonly string[]
}

type ProjectsTranslations = {
  title: string
  description: string
  status: { live: string; completed: string }
  features: string
  controls: { showMore: string; showLess: string }
  actions: { viewLive: string; code: string; viewPhotos: string }
  cta: { title: string; description: string; button: string }
  list?: Partial<Record<ProjectKey, ProjectLocalized>>
  all?: readonly ProjectBase[]
  tooltips?: { notDeployed: string; photosUnavailable: string }
}

// Helper: validate http(s) URL for live deployment
const isValidHttpUrl = (url: string | undefined) =>
  typeof url === 'string' && /^https?:\/\//.test(url);

// Project data is sourced from translations to comply with i18n and single source of truth
// We will read t.projects.all and merge localized fields from t.projects.list

const ProjectsSection = () => {
  const { language } = useLanguage();
  const lang: SupportedLanguage = language;
  const t = projectsTranslations[lang as LanguageKeys];
  const pt: ProjectsTranslations = t.projects;
  // No expand/collapse state; always render all features

  // Merge base data from translations with localized fields safely
  const baseData: ProjectBase[] = Array.isArray(pt.all) ? (pt.all as ProjectBase[]) : [];
  const projects: Array<ProjectBase & ProjectLocalized> = baseData.map((p) => {
    const localizedMap = (pt.list as Record<string, ProjectLocalized> | undefined) || undefined;
    const localized: ProjectLocalized = localizedMap?.[p.key as string] ?? {};
    return { ...p, ...localized };
  });
  // Determine the maximum features count across projects to normalize list height
  const maxFeaturesAcross = React.useMemo(() => {
    return projects.reduce((max, p) => {
      const count = Array.isArray(p.features) ? p.features.length : 0;
      return Math.max(max, count);
    }, 0);
  }, [projects]);

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{pt.title}</h2>
          <p className="section-description">{pt.description}</p>
        </div>

        <div className="projects-grid !grid grid-cols-1 md:[grid-template-columns:repeat(auto-fit,minmax(500px,1fr))] gap-6 auto-rows-fr items-stretch">
          {projects.map((project) => {
            const statusKeyRaw = (project.status ?? '').toLowerCase();
            let localizedStatus = project.status ?? '';
            if (statusKeyRaw && (pt.status as Record<string, string>)[statusKeyRaw]) {
              localizedStatus = (pt.status as Record<string, string>)[statusKeyRaw];
            }
            const features = Array.isArray(project.features) ? project.features : [];
            const visibleFeatures = features; // show all
            const paddedTarget = maxFeaturesAcross;
            const placeholdersCount = Math.max(0, paddedTarget - visibleFeatures.length);
            const featuresListId = `features-${project.key}`;
            const isLive = isValidHttpUrl(project.liveUrl);
            const hasPhotos = isValidHttpUrl(project.photosUrl);
            // Split title into two lines: before and after dash/en dash
            const rawTitle = project.title ?? project.key;
            const splitByDash = rawTitle.split(/[-–—]/);
            const titleLine1 = splitByDash[0]?.trim() || rawTitle;
            const titleLine2 =
              splitByDash.length > 1 ? splitByDash.slice(1).join(" ").trim() : "";

            return (
              <Card key={project.key} className="project-card h-full self-stretch min-h-[520px] !grid grid-rows-[auto,1fr]">
                <div className="project-image shrink-0 row-start-1 row-end-2 relative">
                  <div className="project-image-placeholder w-full aspect-[16/9] relative">
                    <Image
                      src={project.image}
                      alt={`${project.title ?? project.key} - ${project.category}`}
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                      priority={false}
                    />
                    {/* Category badge on top-left of the image */}
                    {project.category && (
                      <div className="absolute top-3 right-3">
                        <span className="project-category">{project.category}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <CardContent className="project-content min-h-0 row-start-2 row-end-3 grid grid-rows-[auto,1fr,auto] gap-6 !pt-6 !pb-6 md:!pt-8 md:!pb-8">
                  <div className={"content-top row-start-1 row-end-2 grid grid-rows-[auto,auto,1fr] gap-4 relative"}>
                    <div className="project-header grid grid-cols-[1fr,auto] grid-rows-2 items-start gap-x-3 gap-y-1" style={{ marginBottom: 0 }}>
                      <h3 className="project-title leading-tight tracking-tight m-0 col-start-1 col-end-2 row-start-1 row-end-3">
                        <span className="block">{titleLine1}</span>
                        {titleLine2 && (
                          <span className="block text-base md:text-lg text-muted-foreground">{titleLine2}</span>
                        )}
                      </h3>
                      {localizedStatus && (
                        <span className="project-status col-start-2 col-end-3 row-span-2 justify-self-end self-center whitespace-nowrap">{localizedStatus}</span>
                      )}
                    </div>

                    <p
                      className="project-description leading-relaxed m-0 min-h-[72px] md:min-h-[96px]"
                      style={{
                        marginBottom: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {project.description ?? ''}
                    </p>

                    <div className="project-features row-start-3 row-end-4 flex flex-col pb-3 md:pb-4" style={{ marginBottom: 0 }}>
                      <h4 className="features-title mb-2 m-0">{pt.features}</h4>
                      <ul id={featuresListId} className="features-list list-none pl-0 space-y-2 m-0">
                        {visibleFeatures.map((feature: string, featureIndex: number) => (
                          <li key={`feat-${featureIndex}`} className="feature-item flex items-start gap-2 overflow-hidden" style={{ marginBottom: 0 }}>
                            <ArrowRight className="h-3 w-3 shrink-0" />
                            <span className="truncate">{feature}</span>
                          </li>
                        ))}
                        {placeholdersCount > 0 &&
                          Array.from({ length: placeholdersCount }).map((_, idx) => (
                            <li
                              key={`placeholder-${idx}`}
                              className="feature-item flex items-start gap-2 overflow-hidden"
                              aria-hidden="true"
                              style={{ marginBottom: 0 }}
                            >
                              <ArrowRight className="h-3 w-3 shrink-0 opacity-40" />
                              <span className="truncate text-transparent select-none">placeholder</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    {/* No overlay for mobile: Show More button sits under the list */}
                  </div>

                  {/* Middle row: badges area, anchored to bottom of row via self-end */}
                  <div className="project-tech row-start-2 row-end-3 self-end mt-3 md:mt-4" style={{ marginBottom: 0 }}>
                    <div className="tech-stack flex flex-wrap gap-2">
                      {project.technologies.map((tech: string, techIndex: number) => (
                        <Badge key={techIndex} variant="secondary" className="tech-badge">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Bottom row: actions, always at the very bottom */}
                  <div className="project-actions row-start-3 row-end-4 flex items-center gap-3 flex-wrap">
                    {isLive ? (
                      <Button asChild className="project-btn primary">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View Live: ${project.title ?? project.key}`}
                        >
                          <ExternalLink className="h-4 w-4" />
                          {pt.actions.viewLive}
                        </a>
                      </Button>
                    ) : (
                      <Button
                        className="project-btn primary opacity-70 cursor-not-allowed"
                        disabled
                        aria-disabled
                        title={pt.tooltips?.notDeployed}
                      >
                        <ExternalLink className="h-4 w-4" />
                        {pt.actions.viewLive}
                      </Button>
                    )}
                    {hasPhotos ? (
                      <Button asChild variant="outline" className="project-btn secondary">
                        <a
                          href={project.photosUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View Photos: ${project.title ?? project.key}`}
                        >
                          <Images className="h-4 w-4" />
                          {pt.actions.viewPhotos}
                        </a>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="project-btn secondary opacity-70 cursor-not-allowed"
                        disabled
                        aria-disabled
                        title={pt.tooltips?.photosUnavailable}
                      >
                        <Images className="h-4 w-4" />
                        {pt.actions.viewPhotos}
                      </Button>
                    )}
                    <Button asChild variant="outline" className="project-btn secondary">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View Code on GitHub: ${project.title ?? project.key}`}
                      >
                        <Github className="h-4 w-4" />
                        {pt.actions.code}
                      </a>
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
            <Button asChild className="cta-button">
              <Link href="/projects">
                <ExternalLink className="h-4 w-4" />
                {pt.cta.button}
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Structured Data: Featured Projects */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            projects.map((project) => ({
              "@context": "https://schema.org",
              "@type": project.githubUrl ? "SoftwareSourceCode" : "CreativeWork",
              name: project.title ?? project.key,
              description: project.description ?? '',
              url: isValidHttpUrl(project.liveUrl) ? project.liveUrl : project.githubUrl,
              image: project.image || undefined,
              sameAs: [
                ...(project.githubUrl ? [project.githubUrl] : []),
                ...(isValidHttpUrl(project.photosUrl) ? [project.photosUrl as string] : []),
              ].length
                ? [
                    ...(project.githubUrl ? [project.githubUrl] : []),
                    ...(isValidHttpUrl(project.photosUrl) ? [project.photosUrl as string] : []),
                  ]
                : undefined,
              keywords: Array.isArray(project.technologies)
                ? project.technologies.join(", ")
                : undefined,
              inLanguage: (lang as string) || 'en',
              genre: project.category,
              author: { "@type": "Person", name: "Arizal" },
              codeRepository: project.githubUrl || undefined,
              programmingLanguage: Array.isArray(project.technologies)
                ? project.technologies.join(", ")
                : undefined,
            }))
          ),
        }}
      />
    </section>
  );
};

export default ProjectsSection;
