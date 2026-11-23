'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/api';
import type { Achievement } from '@/types';
import { toast } from 'sonner';
import { useState } from 'react';
import { Trash2, Pencil } from 'lucide-react';

export default function AdminAchievementsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['admin-achievements'],
    queryFn: () => adminApi.achievements.list().then(r => r.data as { data: Achievement[] }),
  });

  const [editing, setEditing] = useState<Achievement | null>(null);
  const [form, setForm] = useState({ title: '', description: '', icon: '', is_published: true });

  const createMut = useMutation({
    mutationFn: () => adminApi.achievements.create(form),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-achievements'] }); toast.success('Achievement created'); setForm({ title: '', description: '', icon: '', is_published: true }); },
    onError: () => toast.error('Failed'),
  });

  const updateMut = useMutation({
    mutationFn: () => adminApi.achievements.update(editing!.id, form),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-achievements'] }); toast.success('Updated'); setEditing(null); },
    onError: () => toast.error('Failed'),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => adminApi.achievements.delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-achievements'] }); toast.success('Deleted'); },
  });

  function startEdit(item: Achievement) {
    setEditing(item);
    setForm({ title: item.title, description: item.description ?? '', icon: item.icon ?? '', is_published: item.is_published });
  }

  const items = data?.data ?? [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-8">Achievements</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
          <h2 className="font-semibold text-white mb-5">{editing ? 'Edit Achievement' : 'Add Achievement'}</h2>
          <form onSubmit={e => { e.preventDefault(); editing ? updateMut.mutate() : createMut.mutate(); }} className="space-y-4">
            <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Achievement title" className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: '#262626', border: '1px solid #333', color: '#fff' }} />
            <div className="grid grid-cols-2 gap-3">
              <input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="Icon emoji e.g. 🏆" className="px-3 py-2 rounded-lg text-sm" style={{ background: '#262626', border: '1px solid #333', color: '#fff' }} />
            </div>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="Description" className="w-full px-3 py-2 rounded-lg text-sm resize-none" style={{ background: '#262626', border: '1px solid #333', color: '#fff' }} />
            <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#ccc' }}>
              <input type="checkbox" checked={form.is_published} onChange={e => setForm(f => ({ ...f, is_published: e.target.checked }))} /> Published
            </label>
            <div className="flex gap-3">
              <button type="submit" className="px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90" style={{ background: '#7a1f1f', color: '#fff' }}>
                {editing ? 'Save' : 'Add'}
              </button>
              {editing && <button type="button" onClick={() => setEditing(null)} className="px-5 py-2 rounded-lg text-sm" style={{ background: '#262626', color: '#aaa' }}>Cancel</button>}
            </div>
          </form>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: '#2a2a2a' }}>
            <span className="text-sm font-semibold text-white">{items.length} Achievements</span>
          </div>
          {isLoading ? <div className="p-6 text-gray-500 text-sm">Loading…</div> :
            items.map(item => (
              <div key={item.id} className="flex items-center gap-3 px-5 py-3 border-b hover:bg-white/5" style={{ borderColor: '#222' }}>
                <span className="text-xl">{item.icon || '🏆'}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-white truncate">{item.title}</div>
                  {!item.is_published && <span className="text-xs" style={{ color: '#555' }}>draft</span>}
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => startEdit(item)} className="p-1.5 rounded text-blue-400 hover:bg-blue-500/10"><Pencil size={12} /></button>
                  <button onClick={() => { if (confirm('Delete?')) deleteMut.mutate(item.id); }} className="p-1.5 rounded text-red-400 hover:bg-red-500/10"><Trash2 size={12} /></button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
