'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/lib/api';
import { fallbackSkills, fallbackSkillCategories } from '@/lib/fallbackData';
import type { Skill, SkillCategory } from '@/types';

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { data } = useQuery({
    queryKey: ['public-skills'],
    queryFn: () => publicApi.skills().then(r => r.data as { data: Skill[]; categories: SkillCategory[] }),
    retry: false,
  });

  const skills = data?.data && data.data.length > 0 ? data.data : fallbackSkills;
  const categories = ['All', 'Languages', 'Web & DB', 'Python Libraries', 'Core Strength'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category_name === selectedCategory);

  return (
    <main className="page-main">
      <section className="section" id="skills" aria-label="Skills & Expertise">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">Capabilities</span>
            <h2 className="section__title">Technical <span className="accent">Skills</span></h2>
            <p className="section__desc">
              My toolkit — from low-level systems programming to AI/ML libraries and full-stack web development.
            </p>
          </div>

          <div className="skills__tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`skills__tab ${selectedCategory === cat ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="skills__grid">
            {filteredSkills.map((skill) => (
              <div key={`${skill.id}-${skill.name}`} className="skill-card">
                <div className="skill-card__header">
                  <h3 className="skill-card__name">{skill.name}</h3>
                  <span className="skill-card__tag">{skill.tag}</span>
                </div>
                <p className="skill-card__desc">{skill.description}</p>
                <div className="skill-card__bar-wrap">
                  <div
                    className="skill-card__bar"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
