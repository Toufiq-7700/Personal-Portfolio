'use client';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/lib/api';
import type { Project } from '@/types';
import { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';

import { fallbackProjects } from '@/lib/fallbackData';

export default function ProjectsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['public-projects'],
    queryFn: () => publicApi.projects().then(r => r.data as { data: Project[] }),
    retry: false,
  });

  const projects = data?.data && data.data.length > 0 ? data.data : fallbackProjects;
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean))) as string[]];
  const [cat, setCat] = useState('All');

  const filtered = cat === 'All' ? projects : projects.filter(p => p.category === cat);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
          style={{ background: 'rgba(122,31,31,0.1)', color: 'var(--color-maroon)' }}>Portfolio</span>
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-dark)' }}>
          Featured <span style={{ color: 'var(--color-maroon)' }}>Projects</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-muted)' }}>
          Selected works in full-stack web applications, competitive platforms, and research tools.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: cat === c ? 'var(--color-maroon)' : 'rgba(122,31,31,0.08)',
              color: cat === c ? '#fff' : 'var(--color-mid)',
            }}>
            {c}
          </button>
        ))}
      </div>

      {isLoading && projects.length === 0 ? (
        <div className="text-center py-20" style={{ color: 'var(--color-muted)' }}>Loading projects…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
          {filtered.map(project => (
            <div key={project.id}
              className="rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
              style={{ background: '#fff', border: '1px solid rgba(122,31,31,0.1)' }}>
              {/* Image */}
              <div className="relative h-52 overflow-hidden" style={{ background: 'rgba(122,31,31,0.05)' }}>
                {project.thumbnail_url && (
                  <img src={project.thumbnail_url} alt={project.title}
                    className="w-full h-full object-cover" loading="lazy" />
                )}
                <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(122,31,31,0.85)', color: '#fff' }}>
                  {project.badge}
                </span>
                {project.is_featured && (
                  <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(139,58,30,0.85)', color: '#fff' }}>
                    Featured
                  </span>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-dark)' }}>{project.title}</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--color-muted)' }}>{project.short_desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{ background: 'rgba(122,31,31,0.08)', color: 'var(--color-mid)' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                      style={{ background: 'var(--color-dark)', color: '#fff' }}>
                      <Github size={13} /> GitHub
                    </a>
                  )}
                  {project.demo_url && (
                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border transition-all hover:opacity-80"
                      style={{ borderColor: 'var(--color-maroon)', color: 'var(--color-maroon)' }}>
                      <ExternalLink size={13} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
