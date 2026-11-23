'use client';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/lib/api';
import type { Research } from '@/types';
import { ExternalLink } from 'lucide-react';

import { fallbackResearch } from '@/lib/fallbackData';

export default function ResearchPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['public-research'],
    queryFn: () => publicApi.research().then(r => r.data as { data: Research[] }),
    retry: false,
  });

  const items = data?.data && data.data.length > 0 ? data.data : fallbackResearch;

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
          style={{ background: 'rgba(122,31,31,0.1)', color: 'var(--color-maroon)' }}>Publications</span>
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-dark)' }}>
          Research & <span style={{ color: 'var(--color-maroon)' }}>Publications</span>
        </h1>
      </div>
      {isLoading && items.length === 0 ? (
        <div className="text-center py-20" style={{ color: 'var(--color-muted)' }}>Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-center py-20" style={{ color: 'var(--color-muted)' }}>No publications yet.</div>
      ) : (
        <div className="space-y-6">
          {items.map(item => (
            <div key={item.id} className="p-6 rounded-2xl"
              style={{ background: '#fff', border: '1px solid rgba(122,31,31,0.1)' }}>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-dark)' }}>{item.title}</h3>
                <span className="px-2 py-1 rounded text-xs font-medium capitalize flex-shrink-0"
                  style={{ background: 'rgba(122,31,31,0.08)', color: 'var(--color-maroon)' }}>
                  {item.status}
                </span>
              </div>
              {item.authors && <p className="mt-1 text-sm font-medium" style={{ color: 'var(--color-mid)' }}>{item.authors}</p>}
              {(item.publication || item.year) && (
                <p className="mt-1 text-sm italic" style={{ color: 'var(--color-muted)' }}>
                  {item.publication}{item.year ? `, ${item.year}` : ''}
                </p>
              )}
              {item.abstract_text && (
                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--color-mid)' }}>{item.abstract_text}</p>
              )}
              {(item.url || item.doi) && (
                <div className="mt-4 flex gap-3">
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium hover:opacity-80"
                      style={{ color: 'var(--color-maroon)' }}>
                      <ExternalLink size={12} /> View Paper
                    </a>
                  )}
                  {item.doi && <span className="text-xs" style={{ color: 'var(--color-muted)' }}>DOI: {item.doi}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
