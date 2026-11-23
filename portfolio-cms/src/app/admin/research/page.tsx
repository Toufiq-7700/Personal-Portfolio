'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/api';
import type { Research } from '@/types';
import { toast } from 'sonner';
import { useState } from 'react';
import { Trash2, Pencil } from 'lucide-react';

export default function AdminResearchPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['admin-research'],
    queryFn: () => adminApi.research.list().then(r => r.data as { data: Research[] }),
  });

  const [editing, setEditing] = useState<Research | null>(null);
  const [form, setForm] = useState({ title: '', authors: '', publication: '', year: '', url: '', doi: '', abstract_text: '', status: 'published', is_published: true });

  const createMut = useMutation({ mutationFn: () => adminApi.research.create({ ...form, year: form.year ? Number(form.year) : undefined }), onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-research'] }); toast.success('Added'); setForm({ title: '', authors: '', publication: '', year: '', url: '', doi: '', abstract_text: '', status: 'published', is_published: true }); }, onError: () => toast.error('Failed') });
  const updateMut = useMutation({ mutationFn: () => adminApi.research.update(editing!.id, { ...form, year: form.year ? Number(form.year) : undefined }), onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-research'] }); toast.success('Updated'); setEditing(null); }, onError: () => toast.error('Failed') });
  const deleteMut = useMutation({ mutationFn: (id: string) => adminApi.research.delete(id), onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-research'] }); toast.success('Deleted'); } });

  function startEdit(item: Research) {
    setEditing(item);
    setForm({ title: item.title, authors: item.authors ?? '', publication: item.publication ?? '', year: item.year?.toString() ?? '', url: item.url ?? '', doi: item.doi ?? '', abstract_text: item.abstract_text ?? '', status: item.status ?? 'published', is_published: item.is_published });
  }

  const items = data?.data ?? [];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-8">Research & Publications</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
          <h2 className="font-semibold text-white mb-5">{editing ? 'Edit' : 'Add'} Research</h2>
          <form onSubmit={e => { e.preventDefault(); editing ? updateMut.mutate() : createMut.mutate(); }} className="space-y-3">
            {[['Title *', 'title', 'Research title'], ['Authors', 'authors', 'e.g. Khan, T. et al.'], ['Publication', 'publication', 'e.g. IEEE Journal'], ['Year', 'year', 'e.g. 2024'], ['URL', 'url', 'https://…'], ['DOI', 'doi', '10.xxxx/…']].map(([label, key, placeholder]) => (
              <div key={key}>
                <label className="block text-xs mb-1" style={{ color: '#888' }}>{label}</label>
                <input required={key === 'title'} value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder} className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: '#262626', border: '1px solid #333', color: '#fff' }} />
              </div>
            ))}
            <textarea value={form.abstract_text} onChange={e => setForm(f => ({ ...f, abstract_text: e.target.value }))} rows={3} placeholder="Abstract" className="w-full px-3 py-2 rounded-lg text-sm resize-none" style={{ background: '#262626', border: '1px solid #333', color: '#fff' }} />
            <div>
              <label className="block text-xs mb-1" style={{ color: '#888' }}>Status</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: '#262626', border: '1px solid #333', color: '#fff' }}>
                {['published', 'preprint', 'under_review', 'in_progress'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#ccc' }}><input type="checkbox" checked={form.is_published} onChange={e => setForm(f => ({ ...f, is_published: e.target.checked }))} /> Published on site</label>
            <div className="flex gap-3">
              <button type="submit" className="px-5 py-2 rounded-lg text-sm font-semibold" style={{ background: '#7a1f1f', color: '#fff' }}>{editing ? 'Save' : 'Add'}</button>
              {editing && <button type="button" onClick={() => setEditing(null)} className="px-5 py-2 rounded-lg text-sm" style={{ background: '#262626', color: '#aaa' }}>Cancel</button>}
            </div>
          </form>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: '#2a2a2a' }}><span className="text-sm font-semibold text-white">{items.length} Papers</span></div>
          {isLoading ? <div className="p-6 text-gray-500 text-sm">Loading…</div> :
            items.map(item => (
              <div key={item.id} className="flex items-start gap-3 px-5 py-3 border-b hover:bg-white/5" style={{ borderColor: '#222' }}>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-white truncate">{item.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#888' }}>{item.publication}{item.year ? `, ${item.year}` : ''}</div>
                  <span className="text-xs capitalize px-1.5 py-0.5 rounded mt-1 inline-block" style={{ background: '#262626', color: '#888' }}>{item.status}</span>
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
