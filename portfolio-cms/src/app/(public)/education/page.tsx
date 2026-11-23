'use client';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/lib/api';
import type { Education } from '@/types';

import { fallbackEducation } from '@/lib/fallbackData';

export default function EducationPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['public-education'],
    queryFn: () => publicApi.education().then(r => r.data as { data: Education[] }),
    retry: false,
  });

  const items = data?.data && data.data.length > 0 ? data.data : fallbackEducation;

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
          style={{ background: 'rgba(122,31,31,0.1)', color: 'var(--color-maroon)' }}>Background</span>
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-dark)' }}>
          Academic <span style={{ color: 'var(--color-maroon)' }}>Background</span>
        </h1>
      </div>
      {isLoading && items.length === 0 ? (
        <div className="text-center py-20" style={{ color: 'var(--color-muted)' }}>Loading…</div>
      ) : (
        <div className="space-y-6">
          {items.map(item => (
            <div key={item.id} className="p-6 rounded-2xl"
              style={{ background: '#fff', border: '1px solid rgba(122,31,31,0.1)' }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--color-dark)' }}>{item.institution}</h3>
                  {item.degree && (
                    <p className="font-medium mt-0.5" style={{ color: 'var(--color-maroon)' }}>
                      {item.degree}{item.field ? ` in ${item.field}` : ''}
                    </p>
                  )}
                </div>
                {item.gpa && (
                  <span className="px-3 py-1 rounded-full text-sm font-semibold flex-shrink-0"
                    style={{ background: 'rgba(122,31,31,0.1)', color: 'var(--color-maroon)' }}>
                    GPA: {item.gpa}
                  </span>
                )}
              </div>
              <div className="mt-2 text-sm" style={{ color: 'var(--color-muted)' }}>
                {item.start_date && new Date(item.start_date).getFullYear()}
                {' – '}
                {item.is_current ? 'Present' : item.end_date ? new Date(item.end_date).getFullYear() : ''}
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
