'use client';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/lib/api';
import type { Skill, SkillCategory } from '@/types';
import { useState } from 'react';

export default function SkillsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['public-skills'],
    queryFn: () => publicApi.skills().then(r => r.data as { data: Skill[]; categories: SkillCategory[] }),
  });

  const skills = data?.data ?? [];
  const categories = data?.categories ?? [];
  const [cat, setCat] = useState('All');

  const filtered = cat === 'All' ? skills : skills.filter(s => s.category_name === cat);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
          style={{ background: 'rgba(122,31,31,0.1)', color: 'var(--color-maroon)' }}>Capabilities</span>
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-dark)' }}>
          Technical <span style={{ color: 'var(--color-maroon)' }}>Skills</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-muted)' }}>
          My toolkit — from low-level systems programming to AI/ML libraries and full-stack web development.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {['All', ...categories.map(c => c.name)].map(c => (
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

      {isLoading ? (
        <div className="text-center py-20" style={{ color: 'var(--color-muted)' }}>Loading skills…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(skill => (
            <div key={skill.id}
              className="p-5 rounded-xl transition-all hover:shadow-md hover:-translate-y-0.5"
              style={{ background: '#fff', border: '1px solid rgba(122,31,31,0.1)' }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-base" style={{ color: 'var(--color-dark)' }}>{skill.name}</h3>
                <span className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{ background: 'rgba(122,31,31,0.08)', color: 'var(--color-maroon)' }}>
                  {skill.tag}
                </span>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--color-muted)' }}>{skill.description}</p>
              {/* Progress bar */}
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(122,31,31,0.1)' }}>
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${skill.level}%`, background: 'var(--color-maroon)' }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs" style={{ color: 'var(--color-muted)' }}>Proficiency</span>
                <span className="text-xs font-semibold" style={{ color: 'var(--color-maroon)' }}>{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
