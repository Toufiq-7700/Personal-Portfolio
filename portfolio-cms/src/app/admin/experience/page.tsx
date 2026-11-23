'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/api';
import type { Experience } from '@/types';
import { toast } from 'sonner';
import { useState } from 'react';
import { Trash2, Pencil } from 'lucide-react';

export default function AdminExperiencePage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['admin-experience'],
    queryFn: () => adminApi.experience.list().then(r => r.data as { data: Experience[] }),
  });

  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState({ company: '', role: '', location: '', exp_type: 'work', description: '', is_current: false, is_published: true });

  const createMut = useMutation({ mutationFn: () => adminApi.experience.create(form), onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-experience'] }); toast.success('Added'); setForm({ company: '', role: '', location: '', exp_type: 'work', description: '', is_current: false, is_published: true }); }, onError: () => toast.error('Failed') });
  const updateMut = useMutation({ mutationFn: () => adminApi.experience.update(editing!.id, form), onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-experience'] }); toast.success('Updated'); setEditing(null); }, onError: () => toast.error('Failed') });
  const deleteMut = useMutation({ mutationFn: (id: string) => adminApi.experience.delete(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-experience'] }); toast.success('Deleted'); } });

  function startEdit(item: Experience) {
    setEditing(item);
    setForm({ company: item.company, role: item.role, location: item.location ?? '', exp_type: item.exp_type ?? 'work', description: item.description ?? '', is_current: item.is_current, is_published: item.is_published });
  }

  const items = data?.data ?? [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-8">Experience</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
          <h2 className="font-semibold text-white mb-5">{editing ? 'Edit' : 'Add'} Experience</h2>
          <form onSubmit={e => { e.preventDefault(); editing ? updateMut.mutate() : createMut.mutate(); }} className="space-y-3">
            {[['Company *', 'company', 'e.g. Google'], ['Role *', 'role', 'e.g. Software Engineer'], ['Location', 'location', 'e.g. Dhaka, Bangladesh']].map(([label, key, placeholder]) => (
              <div key={key}>
                <label className="block text-xs mb-1" style={{ color: '#888' }}>{label}</label>
                <input required={key !== 'location'} value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder} className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: '#262626', border: '1px solid #333', color: '#fff' }} />
              </div>
            ))}
            <div>
              <label className="block text-xs mb-1" style={{ color: '#888' }}>Type</label>
              <select value={form.exp_type} onChange={e => setForm(f => ({ ...f, exp_type: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: '#262626', border: '1px solid #333', color: '#fff' }}>
                {['work', 'internship', 'volunteer', 'activity'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} placeholder="Description" className="w-full px-3 py-2 rounded-lg text-sm resize-none" style={{ background: '#262626', border: '1px solid #333', color: '#fff' }} />
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#ccc' }}><input type="checkbox" checked={form.is_current} onChange={e => setForm(f => ({ ...f, is_current: e.target.checked }))} /> Current Role</label>
              <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#ccc' }}><input type="checkbox" checked={form.is_published} onChange={e => setForm(f => ({ ...f, is_published: e.target.checked }))} /> Published</label>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-5 py-2 rounded-lg text-sm font-semibold" style={{ background: '#7a1f1f', color: '#fff' }}>{editing ? 'Save' : 'Add'}</button>
              {editing && <button type="button" onClick={() => setEditing(null)} className="px-5 py-2 rounded-lg text-sm" style={{ background: '#262626', color: '#aaa' }}>Cancel</button>}
            </div>
          </form>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: '#2a2a2a' }}><span className="text-sm font-semibold text-white">{items.length} Records</span></div>
          {isLoading ? <div className="p-6 text-gray-500 text-sm">Loading…</div> :
            items.map(item => (
              <div key={item.id} className="flex items-start gap-3 px-5 py-3 border-b hover:bg-white/5" style={{ borderColor: '#222' }}>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-white">{item.role}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#888' }}>{item.company} · <span className="capitalize">{item.exp_type}</span></div>
                  {item.is_current && <span className="text-xs" style={{ color: '#10b981' }}>Current</span>}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
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
