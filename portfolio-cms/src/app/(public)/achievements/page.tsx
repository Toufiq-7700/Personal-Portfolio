'use client';
import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/lib/api';
import type { Achievement } from '@/types';
import { formatDate } from '@/lib/utils';

import { fallbackAchievements } from '@/lib/fallbackData';

export default function AchievementsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['public-achievements'],
    queryFn: () => publicApi.achievements().then(r => r.data as { data: Achievement[] }),
    retry: false,
  });

  const items = data?.data && data.data.length > 0 ? data.data : fallbackAchievements;

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
          style={{ background: 'rgba(122,31,31,0.1)', color: 'var(--color-maroon)' }}>Recognition</span>
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-dark)' }}>
          Achievements & <span style={{ color: 'var(--color-maroon)' }}>Awards</span>
        </h1>
      </div>
      {isLoading && items.length === 0 ? (
        <div className="text-center py-20" style={{ color: 'var(--color-muted)' }}>Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-center py-20" style={{ color: 'var(--color-muted)' }}>No achievements yet.</div>
      ) : (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 p-5 rounded-xl transition-all hover:shadow-md"
              style={{ background: '#fff', border: '1px solid rgba(122,31,31,0.1)' }}>
              <div className="text-3xl flex-shrink-0">{item.icon || '🏆'}</div>
              <div>
                <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--color-dark)' }}>{item.title}</h3>
                {item.description && <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{item.description}</p>}
                {item.date && <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>{formatDate(item.date)}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
