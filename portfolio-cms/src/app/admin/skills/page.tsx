'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/api';
import type { Skill } from '@/types';
import { toast } from 'sonner';
import { useState } from 'react';
import { Plus, Trash2, Pencil, X } from 'lucide-react';

export default function AdminSkillsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['admin-skills'],
    queryFn: () => adminApi.skills.list().then(r => r.data as { data: Skill[] }),
  });

  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState({ name: '', category_id: '', tag: '', description: '', level: 80, is_published: true });

  const createMut = useMutation({
    mutationFn: () => adminApi.skills.create({ ...form, level: Number(form.level) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-skills'] }); toast.success('Skill created'); setForm({ name: '', category_id: '', tag: '', description: '', level: 80, is_published: true }); },
    onError: () => toast.error('Failed to create skill'),
  });

  const updateMut = useMutation({
    mutationFn: () => adminApi.skills.update(editing!.id, { ...form, level: Number(form.level) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-skills'] }); toast.success('Skill updated'); setEditing(null); },
    onError: () => toast.error('Failed to update skill'),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => adminApi.skills.delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-skills'] }); toast.success('Skill deleted'); },
  });

  function startEdit(skill: Skill) {
    setEditing(skill);
    setForm({ name: skill.name, category_id: skill.category_id ?? '', tag: skill.tag ?? '', description: skill.description ?? '', level: skill.level, is_published: skill.is_published });
  }

  const skills = data?.data ?? [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-8">Skills Management</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Form */}
        <div className="rounded-2xl p-6" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
          <h2 className="font-semibold text-white mb-5">{editing ? 'Edit Skill' : 'Add New Skill'}</h2>
          <form onSubmit={e => { e.preventDefault(); editing ? updateMut.mutate() : createMut.mutate(); }} className="space-y-4">
            <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: '#262626', border: '1px solid #333', color: '#fff' }}
              placeholder="Skill name e.g. Rust" />
            <div className="grid grid-cols-2 gap-3">
              <input value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
                className="px-3 py-2 rounded-lg text-sm" style={{ background: '#262626', border: '1px solid #333', color: '#fff' }}
                placeholder="Tag e.g. Systems" />
              <input value={form.level} onChange={e => setForm(f => ({ ...f, level: Number(e.target.value) }))}
                type="number" min={0} max={100}
                className="px-3 py-2 rounded-lg text-sm" style={{ background: '#262626', border: '1px solid #333', color: '#fff' }}
                placeholder="Level (0-100)" />
            </div>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={2} placeholder="Description…"
              className="w-full px-3 py-2 rounded-lg text-sm resize-none" style={{ background: '#262626', border: '1px solid #333', color: '#fff' }} />
            <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#ccc' }}>
              <input type="checkbox" checked={form.is_published} onChange={e => setForm(f => ({ ...f, is_published: e.target.checked }))} />
              Published
            </label>
            <div className="flex gap-3">
              <button type="submit" disabled={createMut.isPending || updateMut.isPending}
                className="px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50"
                style={{ background: '#7a1f1f', color: '#fff' }}>
                {editing ? 'Save Changes' : 'Add Skill'}
              </button>
              {editing && (
                <button type="button" onClick={() => setEditing(null)}
                  className="px-5 py-2 rounded-lg text-sm" style={{ background: '#262626', color: '#aaa' }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: '#2a2a2a' }}>
            <span className="text-sm font-semibold text-white">{skills.length} Skills</span>
          </div>
          <div className="divide-y divide-[#222]">
            {isLoading ? <div className="p-6 text-gray-500 text-sm">Loading…</div> :
              skills.map(skill => (
                <div key={skill.id} className="flex items-center justify-between px-5 py-3 hover:bg-white/5 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-medium text-sm text-white">{skill.name}</span>
                      {skill.tag && <span className="px-1.5 py-0.5 rounded text-xs" style={{ background: '#262626', color: '#888' }}>{skill.tag}</span>}
                      {!skill.is_published && <span className="text-xs" style={{ color: '#555' }}>draft</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full overflow-hidden max-w-24" style={{ background: '#333' }}>
                        <div className="h-full rounded-full" style={{ width: `${skill.level}%`, background: '#7a1f1f' }} />
                      </div>
                      <span className="text-xs" style={{ color: '#666' }}>{skill.level}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-3">
                    <button onClick={() => startEdit(skill)} className="p-1.5 rounded text-blue-400 hover:bg-blue-500/10">
                      <Pencil size={12} />
                    </button>
                    <button onClick={() => { if (confirm(`Delete "${skill.name}"?`)) deleteMut.mutate(skill.id); }}
                      className="p-1.5 rounded text-red-400 hover:bg-red-500/10">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
