'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/lib/api';
import { fallbackProjects } from '@/lib/fallbackData';
import type { Project } from '@/types';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { data } = useQuery({
    queryKey: ['public-projects'],
    queryFn: () => publicApi.projects().then(r => r.data as { data: Project[] }),
    retry: false,
  });

  const projects = data?.data && data.data.length > 0 ? data.data : fallbackProjects;
  const categories = ['All', 'Full-Stack'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <main className="page-main">
      <section className="section" id="projects" aria-label="Projects Portfolio">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">Portfolio</span>
            <h2 className="section__title">Featured <span className="accent">Projects</span></h2>
            <p className="section__desc">
              Selected works in full-stack web applications, competitive platforms, and research tools.
            </p>
          </div>

          <div className="projects__tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`projects__tab ${selectedCategory === cat ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="projects__grid">
            {filteredProjects.map((project) => (
              <article key={project.id} className="project-card">
                <div className="project-card__banner">
                  <img
                    className="project-card__img"
                    src={project.thumbnail_url || '/assets/projects/P1.webp'}
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="project-card__img-overlay" aria-hidden="true"></div>
                  <span className="project-card__category">{project.badge || project.category}</span>
                </div>
                <div className="project-card__content">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.short_desc}</p>
                  <div className="project-card__tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="project-card__actions">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                        Code
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
