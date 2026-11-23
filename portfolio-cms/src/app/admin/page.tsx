'use client';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/lib/api';
import type { DashboardStats } from '@/types';
import { FolderOpen, Zap, Trophy, GraduationCap, Briefcase, BookOpen, Image } from 'lucide-react';
import Link from 'next/link';

const statCards = [
  { key: 'projects', label: 'Projects', icon: FolderOpen, href: '/admin/projects', color: '#c0392b' },
  { key: 'skills', label: 'Skills', icon: Zap, href: '/admin/skills', color: '#8b5cf6' },
  { key: 'achievements', label: 'Achievements', icon: Trophy, href: '/admin/achievements', color: '#f59e0b' },
  { key: 'education', label: 'Education', icon: GraduationCap, href: '/admin/education', color: '#10b981' },
  { key: 'experience', label: 'Experience', icon: Briefcase, href: '/admin/experience', color: '#3b82f6' },
  { key: 'research', label: 'Research', icon: BookOpen, href: '/admin/research', color: '#ec4899' },
  { key: 'media', label: 'Media Files', icon: Image, href: '/admin/media', color: '#6366f1' },
];

export default function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminApi.stats().then(r => r.data as DashboardStats),
  });

  function getVal(key: string): number | string {
    if (!data) return '—';
    if (key === 'projects') return `${data.projects.published} / ${data.projects.total}`;
    return (data as any)[key] ?? 0;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: '#888' }}>Manage your portfolio content</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
        {statCards.map(({ key, label, icon: Icon, href, color }) => (
          <Link key={key} href={href}
            className="p-5 rounded-xl transition-all hover:scale-105 group"
            style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg" style={{ background: `${color}22` }}>
                <Icon size={18} style={{ color }} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-0.5">
              {isLoading ? '…' : getVal(key)}
            </div>
            <div className="text-xs" style={{ color: '#888' }}>{label}</div>
            {key === 'projects' && <div className="text-xs mt-0.5" style={{ color: '#555' }}>published / total</div>}
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="rounded-2xl p-6" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
        <h2 className="font-semibold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: '+ New Project', href: '/admin/projects/new' },
            { label: '+ New Skill', href: '/admin/skills/new' },
            { label: '+ New Achievement', href: '/admin/achievements/new' },
            { label: '+ New Education', href: '/admin/education/new' },
            { label: '+ Upload Media', href: '/admin/media' },
          ].map(a => (
            <Link key={a.href} href={a.href}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
              style={{ background: 'rgba(122,31,31,0.25)', color: '#ff9494', border: '1px solid rgba(122,31,31,0.4)' }}>
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
