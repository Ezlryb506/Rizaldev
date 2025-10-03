"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Images, ArrowRight, X } from "lucide-react";
import { useLanguage, type SupportedLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/data/translations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Types aligned with existing components

type LanguageKeys = keyof typeof translations; // 'en' | 'id'

type ProjectKey = "quicktix" | "abadiJaya" | (string & {});

type ProjectBase = {
  key: ProjectKey;
  image: string;
  liveUrl: string;
  githubUrl: string;
  category: string;
  technologies: string[];
  photosUrl?: string;
};

type ProjectLocalized = {
  title?: string;
  status?: string;
  description?: string;
  features?: string[];
};

export default function ProjectsPage() {
  const { language } = useLanguage();
  const lang: SupportedLanguage = language;
  const t = translations[lang as LanguageKeys];
  const pt = t.projects;

  // Merge localization fields from list
  const projects: Array<ProjectBase & ProjectLocalized> = React.useMemo(() => {
    const allBase: ProjectBase[] = Array.isArray(pt.all) ? (pt.all as ProjectBase[]) : [];
    const localizedMap = (pt.list as Record<string, ProjectLocalized> | undefined) || undefined;
    return allBase.map((p) => ({
      ...p,
      ...(localizedMap?.[p.key as string] ?? {}),
    }));
  }, [pt.all, pt.list]);

  // Derive facets
  const categories = React.useMemo(() => {
    return Array.from(new Set(projects.map((p) => p.category).filter(Boolean))).sort();
  }, [projects]);

  const technologies = React.useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.technologies?.forEach((tech) => set.add(tech)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  // Filters state
  const [search, setSearch] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [techs, setTechs] = React.useState<string[]>([]);
  const [techOpen, setTechOpen] = React.useState<boolean>(false);
  const [categoryOpen, setCategoryOpen] = React.useState<boolean>(false);
  const techRef = React.useRef<HTMLDivElement | null>(null);
  const categoryRef = React.useRef<HTMLDivElement | null>(null);
  const categoryBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const [categoryMenuWidth, setCategoryMenuWidth] = React.useState<number | undefined>(undefined);
  const techBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const [techMenuWidth, setTechMenuWidth] = React.useState<number | undefined>(undefined);

  // Close dropdowns on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (target) {
        if (techRef.current && !techRef.current.contains(target)) {
          setTechOpen(false);
        }
        if (categoryRef.current && !categoryRef.current.contains(target)) {
          setCategoryOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Keep category menu width equal to trigger width
  React.useEffect(() => {
    const compute = () => {
      const w = categoryBtnRef.current?.offsetWidth; // includes padding + border
      setCategoryMenuWidth(w ? w : undefined);
    };
    if (categoryOpen) {
      compute();
      window.addEventListener("resize", compute);
      return () => window.removeEventListener("resize", compute);
    }
  }, [categoryOpen]);

  // Keep tech menu width equal to trigger width
  React.useEffect(() => {
    const compute = () => {
      const w = techBtnRef.current?.offsetWidth;
      setTechMenuWidth(w ? w : undefined);
    };
    if (techOpen) {
      compute();
      window.addEventListener("resize", compute);
      return () => window.removeEventListener("resize", compute);
    }
  }, [techOpen]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setTechs([]);
  };

  // Filtering logic (robust, handles undefined)
  const filtered = React.useMemo(() => {
    const term = search.trim().toLowerCase();
    return projects.filter((p) => {
      // category check
      if (category && p.category !== category) return false;
      // techs check (all selected techs must be included)
      if (techs.length > 0) {
        const list = Array.isArray(p.technologies) ? p.technologies : [];
        const hasAll = techs.every((t) => list.includes(t));
        if (!hasAll) return false;
      }
      if (!term) return true;
      // full-text-ish match across fields
      const hay = [
        p.key,
        p.category,
        ...(p.technologies || []),
        (p.title || ""),
        (p.description || ""),
        ...((Array.isArray(p.features) ? p.features : []) as string[]),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(term);
    });
  }, [projects, category, techs, search]);

  // SEO metadata handled globally via `layout.tsx`; here we keep the visual structure consistent
  return (
    <main className="projects-section">
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">{t.nav.projects}</h1>
          <p className="section-description">{pt.description}</p>
        </div>

        {/* Filters */}
        <Card className="!mb-8">
          <CardContent className="!p-6 md:p-8 pt-6 md:pt-8">
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr,1fr,1fr,auto] gap-3 md:gap-4 items-end">
              {/* Search */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="search">{pt.filters?.title}</Label>
                <div className="relative">
                  <Input
                    id="search"
                    placeholder={pt.filters?.searchPlaceholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pr-10 !p-4"
                  />
                  {/* optional decorative icon space on the right */}
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  </span>
                </div>
              </div>
              {/* Category (Custom dropdown for consistent menu width) */}
              <div className="flex flex-col gap-2" ref={categoryRef}>
                <Label htmlFor="category-btn">{pt.filters?.categoryLabel}</Label>
                <div className="relative">
                  <button
                    id="category-btn"
                    type="button"
                    className="h-10 w-full rounded-md border border-border bg-background !pl-4 pr-10 text-left text-sm flex items-center justify-between"
                    onClick={() => setCategoryOpen((v) => !v)}
                    ref={categoryBtnRef}
                  >
                    <span className="truncate">
                      {category ? (
                        category
                      ) : (
                        <span className="text-muted-foreground">{pt.filters?.categoryLabel}</span>
                      )}
                    </span>
                    <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                  </button>
                  {categoryOpen && (
                    <div
                      className="absolute left-0 z-20 mt-2 max-h-64 overflow-auto rounded-md border border-border bg-background !p-4 shadow-lg box-border"
                      style={{ width: categoryMenuWidth ? `${categoryMenuWidth}px` : undefined }}
                    >
                      <ul className="space-y-1">
                        <li>
                          <button
                            type="button"
                            className="w-full text-left text-sm rounded px-3 py-2 hover:bg-accent/30"
                            onClick={() => { setCategory(""); setCategoryOpen(false); }}
                          >
                            —
                          </button>
                        </li>
                        {categories.map((c) => (
                          <li key={c}>
                            <button
                              type="button"
                              className={`w-full text-left text-sm rounded px-3 py-2 hover:bg-accent/30 ${c === category ? 'bg-accent/20' : ''}`}
                              onClick={() => { setCategory(c); setCategoryOpen(false); }}
                            >
                              {c}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* Technology (Multi-select) */}
              <div className="flex flex-col gap-2" ref={techRef}>
                <Label>{pt.filters?.technologyLabel}</Label>
                <div className="relative">
                  <button
                    type="button"
                    className="h-10 w-full rounded-md border border-border bg-background !p-4 pr-10 text-left text-sm flex items-center justify-between"
                    onClick={() => setTechOpen((v) => !v)}
                    ref={techBtnRef}
                  >
                    <span className="truncate">
                      {techs.length === 0 ? (
                        <span className="text-muted-foreground">{pt.filters?.technologyLabel}</span>
                      ) : (
                        techs.join(", ")
                      )}
                    </span>
                    <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                  </button>
                  {techOpen && (
                    <div
                      className="absolute left-0 z-20 mt-2 max-h-64 overflow-auto rounded-md border border-border bg-background !p-2 shadow-lg box-border"
                      style={{ width: techMenuWidth ? `${techMenuWidth}px` : undefined }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">{technologies.length} items</span>
                        {techs.length > 0 && (
                          <button className="text-xs text-muted-foreground hover:text-foreground" type="button" onClick={() => setTechs([])}>Clear</button>
                        )}
                      </div>
                      <ul className="space-y-1 !p-2">
                        {technologies.map((tname) => {
                          const checked = techs.includes(tname);
                          return (
                            <li key={tname}>
                              <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-border !p-4"
                                  checked={checked}
                                  onChange={() =>
                                    setTechs((prev) =>
                                      checked ? prev.filter((x) => x !== tname) : [...prev, tname]
                                    )
                                  }
                                />
                                <span>{tname}</span>
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Clear */}
              <div className="flex gap-2 md:justify-end">
                {(search || category || techs.length > 0) && (
                  <Button variant="outline" onClick={clearFilters} className="self-end !p-4">
                    <X className="h-4 w-4" /> {pt.filters?.clear}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active filter summary */}
        {(category || techs.length > 0) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {category && (
              <Badge variant="secondary" className="flex items-center gap-2">
                {pt.filters?.categoryLabel}: {category}
                <button
                  type="button"
                  onClick={() => setCategory("")}
                  className="ml-1 opacity-70 hover:opacity-100"
                  aria-label="Remove category filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {techs.map((tech) => (
              <Badge key={tech} variant="secondary" className="flex items-center gap-2">
                {pt.filters?.technologyLabel}: {tech}
                <button
                  type="button"
                  onClick={() => setTechs((prev) => prev.filter((t) => t !== tech))}
                  className="ml-1 opacity-70 hover:opacity-100"
                  aria-label="Remove technology filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="projects-grid !grid grid-cols-1 md:[grid-template-columns:repeat(auto-fit,minmax(500px,1fr))] gap-6 auto-rows-fr items-stretch">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground py-12">
              {pt.filters?.empty}
            </div>
          ) : (
            filtered.map((project) => {
              const statusKeyRaw = (project.status ?? "").toLowerCase();
              let localizedStatus = project.status ?? "";
              if (statusKeyRaw && (pt.status as Record<string, string>)[statusKeyRaw]) {
                localizedStatus = (pt.status as Record<string, string>)[statusKeyRaw];
              }
              const features = Array.isArray(project.features) ? project.features : [];

              const isLive = typeof project.liveUrl === "string" && /^https?:\/\//.test(project.liveUrl);
              const hasPhotos = typeof project.photosUrl === "string" && /^https?:\/\//.test(project.photosUrl);
              const rawTitle = project.title ?? project.key;
              const splitByEnDash = rawTitle.split("–");
              let titleLine1 = rawTitle;
              let titleLine2 = "";
              if (splitByEnDash.length >= 2) {
                titleLine1 = splitByEnDash[0]?.trim() || rawTitle;
                titleLine2 = splitByEnDash.slice(1).join("–").trim();
              } else {
                const splitByDash = rawTitle.split("-");
                if (splitByDash.length >= 2) {
                  titleLine1 = splitByDash[0]?.trim() || rawTitle;
                  titleLine2 = splitByDash.slice(1).join("-").trim();
                }
              }

              return (
                <Card key={project.key} className="project-card h-full self-stretch min-h-[520px] !grid grid-rows-[auto,1fr]">
                  <div className="project-image shrink-0 row-start-1 row-end-2 relative">
                    <div className="project-image-placeholder w-full aspect-[16/9] relative">
                      <Image
                        src={project.image}
                        alt={`${project.title ?? project.key} – ${project.category}`}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                        priority={false}
                      />
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
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical" as const,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {project.description ?? ""}
                      </p>

                      <div className="project-features row-start-3 row-end-4 flex flex-col pb-3 md:pb-4" style={{ marginBottom: 0 }}>
                        <h4 className="features-title mb-2 m-0">{pt.features}</h4>
                        <ul className="features-list list-none pl-0 space-y-2 m-0">
                          {features.map((feature: string, idx: number) => (
                            <li
                              key={`feat-${idx}`}
                              className="feature-item flex items-start gap-2 overflow-hidden"
                              style={{ marginBottom: 0 }}
                            >
                              <ArrowRight className="h-3 w-3 text-accent mt-0.5 shrink-0" aria-hidden="true" />
                              <span className="truncate">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="project-tech row-start-2 row-end-3 self-end mt-3 md:mt-4" style={{ marginBottom: 0 }}>
                      <div className="tech-stack flex flex-wrap gap-2">
                        {project.technologies.map((tech: string, techIndex: number) => (
                          <Badge key={techIndex} variant="secondary" className="tech-badge">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="project-actions row-start-3 row-end-4 flex items-center gap-3 flex-wrap">
                      {isLive ? (
                        <Button asChild className="project-btn primary">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`View Live: ${project.title ?? project.key}`}>
                            <ExternalLink className="h-4 w-4" />
                            {pt.actions.viewLive}
                          </a>
                        </Button>
                      ) : (
                        <Button className="project-btn primary opacity-70 cursor-not-allowed" disabled aria-disabled title={pt.tooltips?.notDeployed}>
                          <ExternalLink className="h-4 w-4" />
                          {pt.actions.viewLive}
                        </Button>
                      )}
                      {hasPhotos ? (
                        <Button asChild variant="outline" className="project-btn secondary">
                          <a href={project.photosUrl} target="_blank" rel="noopener noreferrer" aria-label={`View Photos: ${project.title ?? project.key}`}>
                            <Images className="h-4 w-4" />
                            {pt.actions.viewPhotos}
                          </a>
                        </Button>
                      ) : (
                        <Button variant="outline" className="project-btn secondary opacity-70 cursor-not-allowed" disabled aria-disabled title={pt.tooltips?.photosUnavailable}>
                          <Images className="h-4 w-4" />
                          {pt.actions.viewPhotos}
                        </Button>
                      )}
                      <Button asChild variant="outline" className="project-btn secondary">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View Code on GitHub: ${project.title ?? project.key}`}>
                          <Github className="h-4 w-4" />
                          {pt.actions.code}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Back to Home CTA */}
        <div className="projects-cta">
          <div className="cta-content">
            <h3>{pt.back.title}</h3>
            <Button asChild className="cta-button">
              <Link href="/">{pt.back.button}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            filtered.map((project) => ({
              "@context": "https://schema.org",
              "@type": project.githubUrl ? "SoftwareSourceCode" : "CreativeWork",
              name: project.title ?? project.key,
              description: project.description ?? "",
              url: /^https?:\/\//.test(project.liveUrl) ? project.liveUrl : project.githubUrl,
              image: project.image || undefined,
              sameAs: [
                ...(project.githubUrl ? [project.githubUrl] : []),
                ...(/^https?:\/\//.test(project.photosUrl || "") ? [project.photosUrl as string] : []),
              ].length
                ? [
                    ...(project.githubUrl ? [project.githubUrl] : []),
                    ...(/^https?:\/\//.test(project.photosUrl || "") ? [project.photosUrl as string] : []),
                  ]
                : undefined,
              keywords: Array.isArray(project.technologies) ? project.technologies.join(", ") : undefined,
              inLanguage: (lang as string) || "en",
              genre: project.category,
              author: { "@type": "Person", name: "Arizal" },
              codeRepository: project.githubUrl || undefined,
              programmingLanguage: Array.isArray(project.technologies) ? project.technologies.join(", ") : undefined,
            }))
          ),
        }}
      />
    </main>
  );
}

