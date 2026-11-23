'use client';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/lib/api';
import type { Experience } from '@/types';

import { fallbackExperience } from '@/lib/fallbackData';

export default function ExperiencePage() {
  const { data, isLoading } = useQuery({
    queryKey: ['public-experience'],
    queryFn: () => publicApi.experience().then(r => r.data as { data: Experience[] }),
    retry: false,
  });

  const items = data?.data && data.data.length > 0 ? data.data : fallbackExperience;

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
          style={{ background: 'rgba(122,31,31,0.1)', color: 'var(--color-maroon)' }}>Career</span>
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-dark)' }}>
          Experience & <span style={{ color: 'var(--color-maroon)' }}>Activities</span>
        </h1>
      </div>
      {isLoading && items.length === 0 ? (
        <div className="text-center py-20" style={{ color: 'var(--color-muted)' }}>Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-center py-20" style={{ color: 'var(--color-muted)' }}>No experience listed yet.</div>
      ) : (
        <div className="space-y-6">
          {items.map(item => (
            <div key={item.id} className="p-6 rounded-2xl"
              style={{ background: '#fff', border: '1px solid rgba(122,31,31,0.1)' }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--color-dark)' }}>{item.role}</h3>
                  <p className="font-medium mt-0.5" style={{ color: 'var(--color-maroon)' }}>{item.company}</p>
                </div>
                <span className="px-2 py-1 rounded text-xs font-medium capitalize flex-shrink-0"
                  style={{ background: 'rgba(122,31,31,0.08)', color: 'var(--color-mid)' }}>
                  {item.exp_type || 'work'}
                </span>
              </div>
              <div className="mt-1 text-sm flex gap-4" style={{ color: 'var(--color-muted)' }}>
                {item.location && <span>📍 {item.location}</span>}
                <span>
                  {item.start_date && new Date(item.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  {' – '}
                  {item.is_current ? 'Present' : item.end_date ? new Date(item.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}
                </span>
              </div>
              {item.description && (
                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--color-mid)' }}>{item.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
