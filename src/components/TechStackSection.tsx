'use client';

import React, { useMemo, useState } from 'react';
import { Code, Database, Bot, Zap, Terminal, Target, Search, Layout, Code2, Plug, Wrench, SearchCheck, ShieldCheck, BookOpen, Container } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';

const TechStackSection = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations['en'];
  const [showWorkflow, setShowWorkflow] = useState(false);

  const techCategories = [
    {
      title: t.techStack.categories.frontend,
      icon: <Code className="h-6 w-6" />,
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript'],
      color: 'category-frontend'
    },
    {
      title: t.techStack.categories.backend,
      icon: <Terminal className="h-6 w-6" />,
      technologies: ['Next.js', 'PHP', 'Code Igniter 3', 'RESTful APIs'],
      color: 'category-backend'
    },
    {
      title: t.techStack.categories.database,
      icon: <Database className="h-6 w-6" />,
      technologies: ['PostgreSQL (Supabase)', 'MySQL', 'Database Design'],
      color: 'category-database'
    },
    {
      title: t.techStack.categories.ai,
      icon: <Bot className="h-6 w-6" />,
      technologies: ['LLM', 'GitHub Copilot', 'Cursor', 'VS Code', 'Windsurf', 'Emergent AI', 'Prompt Engineering'],
      color: 'category-ai'
    },
    {
      title: t.techStack.categories.devops,
      icon: <Container className="h-6 w-6" />,
      technologies: ['Vercel', 'Git', 'CI/CD', 'Version Control', 'Deployment'],
      color: 'category-devops'
    },
    {
      title: t.techStack.categories.other,
      icon: <Zap className="h-6 w-6" />,
      technologies: ['AI-Assisted Development', 'Workflow Optimization', 'Rapid Prototyping', 'Code Generation'],
      color: 'category-other'
    }
  ];

  type Step = {
    key: string;
    icon: keyof typeof iconMap | string;
    title: string;
    description: string;
  };

  const iconMap = useMemo(
    () => ({
      Target: Target,
      Search: Search,
      Layout: Layout,
      Code2: Code2,
      Plug: Plug,
      Wrench: Wrench,
      SearchCheck: SearchCheck,
      ShieldCheck: ShieldCheck,
      BookOpen: BookOpen,
    }),
    []
  );

  return (
    <section className="tech-stack-section" id="stack">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.techStack.title}</h2>
          <p className="section-description">
            {t.techStack.description}
          </p>
          <div className="mt-6 mb-4 flex justify-center">
            <button
              type="button"
              className={`project-btn primary toggle-btn`}
              aria-pressed={showWorkflow}
              onClick={() => setShowWorkflow((prev) => !prev)}
              title={showWorkflow ? (t.techStack.actions?.viewTechStack || 'View Tech Stack') : (t.techStack.actions?.viewWorkflow || 'View Workflow')}
            >
              {showWorkflow ? (t.techStack.actions?.viewTechStack || 'View Tech Stack') : (t.techStack.actions?.viewWorkflow || 'View Workflow')}
            </button>
          </div>
        </div>

        {!showWorkflow ? (
          <div className="tech-grid animate-fade-slide-in mt-6">
            {techCategories.map((category, index) => (
              <Card key={index} className={`tech-card ${category.color}`}>
                <CardContent className="tech-card-content">
                  <div className="tech-card-header">
                    <div className="tech-icon">
                      {category.icon}
                    </div>
                    <h3 className="tech-title">{category.title}</h3>
                  </div>
                  <div className="tech-list">
                    {category.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="workflow-grid auto-spotlight animate-fade-slide-in mt-6">
            {(t.workflow?.list ?? [] as unknown as Step[]).map((step: Step) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap] || Zap;
              return (
                <Card key={step.key} className="workflow-card">
                  <CardContent className="workflow-card-content">
                    <div className="workflow-card-header">
                      <div className="workflow-icon">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="workflow-title">{step.title}</h3>
                    </div>
                    <p className="workflow-description">{step.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="expertise-highlight">
          <div className="highlight-content">
            <div className="highlight-icon">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="highlight-title">{t.techStack.highlight.title}</h3>
            <p className="highlight-description">
              {t.techStack.highlight.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
