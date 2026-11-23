'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/api';
import { toast } from 'sonner';
import { ArrowLeft, Plus, X } from 'lucide-react';
import Link from 'next/link';

export default function NewProjectPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const [form, setForm] = useState({
    title: '', short_desc: '', long_desc: '', category: '',
    badge: '', github_url: '', demo_url: '', thumbnail_url: '',
    is_featured: false, status: 'draft' as 'draft' | 'published',
    tags: [] as string[], tagInput: '',
  });

  const mut = useMutation({
    mutationFn: (data: typeof form) => adminApi.projects.create({
      title: data.title, short_desc: data.short_desc, long_desc: data.long_desc,
      category: data.category, badge: data.badge, github_url: data.github_url,
      demo_url: data.demo_url, thumbnail_url: data.thumbnail_url,
      is_featured: data.is_featured, status: data.status, tags: data.tags,
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-projects'] });
      toast.success('Project created!');
      router.push('/admin/projects');
    },
    onError: (e: any) => toast.error(e?.response?.data?.error || 'Failed to create project'),
  });

  function addTag() {
    const t = form.tagInput.trim();
    if (t && !form.tags.includes(t)) setForm(f => ({ ...f, tags: [...f.tags, t], tagInput: '' }));
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/projects" className="p-2 rounded-lg hover:bg-white/5 transition-colors" style={{ color: '#888' }}>
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-bold text-white">New Project</h1>
      </div>

      <form onSubmit={e => { e.preventDefault(); mut.mutate(form); }}
        className="space-y-5 rounded-2xl p-6" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>

        {/* Title */}
        <Field label="Title *">
          <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            className="admin-input" placeholder="e.g. AuraLink" />
        </Field>

        {/* Category + Badge */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Category">
            <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="admin-input" placeholder="e.g. Full-Stack" />
          </Field>
          <Field label="Badge">
            <input value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))}
              className="admin-input" placeholder="e.g. Web Platform" />
          </Field>
        </div>

        {/* Short desc */}
        <Field label="Short Description">
          <textarea value={form.short_desc} onChange={e => setForm(f => ({ ...f, short_desc: e.target.value }))}
            className="admin-input" rows={2} placeholder="Brief project summary…" />
        </Field>

        {/* Long desc */}
        <Field label="Long Description">
          <textarea value={form.long_desc} onChange={e => setForm(f => ({ ...f, long_desc: e.target.value }))}
            className="admin-input" rows={4} placeholder="Detailed description…" />
        </Field>

        {/* URLs */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="GitHub URL">
            <input value={form.github_url} onChange={e => setForm(f => ({ ...f, github_url: e.target.value }))}
              className="admin-input" placeholder="https://github.com/…" type="url" />
          </Field>
          <Field label="Demo URL">
            <input value={form.demo_url} onChange={e => setForm(f => ({ ...f, demo_url: e.target.value }))}
              className="admin-input" placeholder="https://…" type="url" />
          </Field>
        </div>

        {/* Thumbnail */}
        <Field label="Thumbnail URL">
          <input value={form.thumbnail_url} onChange={e => setForm(f => ({ ...f, thumbnail_url: e.target.value }))}
            className="admin-input" placeholder="/assets/projects/P1.webp or https://…" />
        </Field>

        {/* Tags */}
        <Field label="Tags">
          <div className="flex gap-2 mb-2">
            <input value={form.tagInput} onChange={e => setForm(f => ({ ...f, tagInput: e.target.value }))}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); }}}
              className="admin-input flex-1" placeholder="Add tag, press Enter" />
            <button type="button" onClick={addTag}
              className="px-3 rounded-lg text-sm" style={{ background: '#262626', color: '#aaa' }}>
              <Plus size={15} />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {form.tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                style={{ background: 'rgba(122,31,31,0.2)', color: '#ff9494' }}>
                {tag}
                <button type="button" onClick={() => setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }))}>
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
        </Field>

        {/* Status + Featured */}
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#ccc' }}>
            <input type="checkbox" checked={form.is_featured}
              onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))}
              className="rounded" />
            Featured
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: '#888' }}>Status:</span>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as any }))}
              className="admin-input py-1 text-sm" style={{ width: 'auto' }}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={mut.isPending}
            className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: '#7a1f1f', color: '#fff' }}>
            {mut.isPending ? 'Creating…' : 'Create Project'}
          </button>
          <Link href="/admin/projects"
            className="px-6 py-2.5 rounded-lg font-semibold text-sm"
            style={{ background: '#262626', color: '#aaa' }}>
            Cancel
          </Link>
        </div>
      </form>

      <style jsx>{`
        .admin-input {
          width: 100%;
          padding: 8px 12px;
          background: #262626;
          border: 1px solid #333;
          border-radius: 8px;
          color: #fff;
          font-size: 14px;
          outline: none;
        }
        .admin-input:focus { border-color: #7a1f1f; }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: '#aaa' }}>{label}</label>
      {children}
    </div>
  );
}
