'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/api';
import type { Project } from '@/types';
import { toast } from 'sonner';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Eye, EyeOff, Star } from 'lucide-react';

export default function AdminProjectsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: () => adminApi.projects.list().then(r => r.data as { data: Project[] }),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => adminApi.projects.delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-projects'] }); toast.success('Project deleted'); },
    onError: () => toast.error('Delete failed'),
  });

  const toggleStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminApi.projects.update(id, { status: status === 'published' ? 'draft' : 'published' }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-projects'] }); toast.success('Status updated'); },
  });

  const projects = data?.data ?? [];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-sm mt-1" style={{ color: '#888' }}>{projects.length} total</p>
        </div>
        <Link href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: '#7a1f1f', color: '#fff' }}>
          <Plus size={15} /> New Project
        </Link>
      </div>

      {isLoading ? (
        <div className="text-gray-500 py-10 text-center">Loading…</div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #2a2a2a' }}>
                {['Project', 'Category', 'Status', 'Featured', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#666' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id} className="border-b transition-colors hover:bg-white/5" style={{ borderColor: '#222' }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.thumbnail_url && (
                        <img src={p.thumbnail_url} alt={p.title}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                          style={{ border: '1px solid #333' }} />
                      )}
                      <div>
                        <div className="font-medium text-white">{p.title}</div>
                        <div className="text-xs mt-0.5" style={{ color: '#666' }}>/{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-xs" style={{ background: '#262626', color: '#aaa' }}>
                      {p.category || '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStatus.mutate({ id: p.id, status: p.status })}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all hover:opacity-80"
                      style={{
                        background: p.status === 'published' ? 'rgba(16,185,129,0.15)' : 'rgba(107,114,128,0.15)',
                        color: p.status === 'published' ? '#10b981' : '#9ca3af',
                      }}>
                      {p.status === 'published' ? <Eye size={11} /> : <EyeOff size={11} />}
                      {p.status}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    {p.is_featured && <Star size={14} className="text-yellow-400" />}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/projects/${p.id}`}
                        className="p-1.5 rounded-lg transition-all hover:bg-blue-500/10 text-blue-400">
                        <Pencil size={13} />
                      </Link>
                      <button onClick={() => { if (confirm(`Delete "${p.title}"?`)) deleteMut.mutate(p.id); }}
                        className="p-1.5 rounded-lg transition-all hover:bg-red-500/10 text-red-400">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && (
            <div className="text-center py-16" style={{ color: '#555' }}>
              No projects yet. <Link href="/admin/projects/new" className="text-red-400 hover:underline">Create one</Link>.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
