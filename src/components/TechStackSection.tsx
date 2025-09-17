'use client';

import React from 'react';
import { Code, Database, Cloud, Bot, Zap, Terminal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';

const TechStackSection = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations['en'];

  const techCategories = [
    {
      title: t.techStack.categories.frontend,
      icon: <Code className="h-6 w-6" />,
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript'],
      color: 'category-frontend'
    },
    {
      title: t.techStack.categories.backend,
      icon: <Terminal className="h-6 w-6" />,
      technologies: ['Node.js', 'CodeIgniter 3', 'RESTful APIs', 'Express.js'],
      color: 'category-backend'
    },
    {
      title: t.techStack.categories.database,
      icon: <Database className="h-6 w-6" />,
      technologies: ['PostgreSQL (Supabase)', 'MySQL', 'Redis', 'Database Design'],
      color: 'category-database'
    },
    {
      title: t.techStack.categories.ai,
      icon: <Bot className="h-6 w-6" />,
      technologies: ['Large Language Models', 'GitHub Copilot', 'Cursor IDE', 'VS Code', 'Prompt Engineering'],
      color: 'category-ai'
    },
    {
      title: t.techStack.categories.devops,
      icon: <Cloud className="h-6 w-6" />,
      technologies: ['Vercel', 'Git', 'CI/CD', 'Version Control', 'Deployment'],
      color: 'category-devops'
    },
    {
      title: t.techStack.categories.specialization,
      icon: <Zap className="h-6 w-6" />,
      technologies: ['AI-Assisted Development', 'Workflow Optimization', 'Rapid Prototyping', 'Code Generation'],
      color: 'category-special'
    }
  ];

  return (
    <section className="tech-stack-section" id="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.techStack.title}</h2>
          <p className="section-description">
            {t.techStack.description}
          </p>
        </div>

        <div className="tech-grid">
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

        <div className="expertise-highlight">
          <div className="highlight-content">
            <div className="highlight-icon">
              <Zap className="h-8 w-8" />
            </div>
            <div className="highlight-text">
              <h3>{t.techStack.highlight.title}</h3>
              <p>
                {t.techStack.highlight.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;