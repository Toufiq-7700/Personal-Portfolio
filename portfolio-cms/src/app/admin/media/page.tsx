'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/api';
import type { MediaAsset } from '@/types';
import { toast } from 'sonner';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Clipboard } from 'lucide-react';

export default function AdminMediaPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['admin-media'],
    queryFn: () => adminApi.media.list().then(r => r.data as { data: MediaAsset[] }),
  });

  const uploadMut = useMutation({
    mutationFn: (files: File[]) => {
      const fd = new FormData();
      files.forEach(f => fd.append('file', f));
      return adminApi.media.upload(fd);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-media'] }); toast.success('Uploaded!'); },
    onError: () => toast.error('Upload failed'),
  });

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length > 0) uploadMut.mutate(accepted);
  }, [uploadMut]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } });
  const assets = data?.data ?? [];

  function formatSize(bytes: number | null) {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-8">Media Library</h1>

      {/* Dropzone */}
      <div {...getRootProps()} className="mb-8 p-10 rounded-2xl border-2 border-dashed cursor-pointer transition-all text-center"
        style={{ borderColor: isDragActive ? '#7a1f1f' : '#333', background: isDragActive ? 'rgba(122,31,31,0.1)' : '#1a1a1a' }}>
        <input {...getInputProps()} />
        <Upload size={28} className="mx-auto mb-3" style={{ color: '#666' }} />
        <p className="text-sm text-gray-400">
          {uploadMut.isPending ? 'Uploading…' : isDragActive ? 'Drop files here' : 'Drag & drop images, or click to select'}
        </p>
        <p className="text-xs mt-1" style={{ color: '#555' }}>PNG, JPG, WEBP, GIF, SVG</p>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="text-gray-500 text-center py-10">Loading…</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {assets.map(asset => (
            <div key={asset.id} className="rounded-xl overflow-hidden group"
              style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
              <div className="relative h-32 overflow-hidden" style={{ background: '#262626' }}>
                {asset.mime_type?.startsWith('image/') ? (
                  <img src={asset.url} alt={asset.original_name ?? asset.filename}
                    className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs" style={{ color: '#666' }}>{asset.mime_type}</div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-white truncate">{asset.original_name ?? asset.filename}</p>
                <p className="text-xs mt-0.5" style={{ color: '#666' }}>{formatSize(asset.size_bytes)}</p>
                <button onClick={() => { navigator.clipboard.writeText(asset.url); toast.success('URL copied!'); }}
                  className="mt-2 inline-flex items-center gap-1 text-xs hover:opacity-80 transition-opacity"
                  style={{ color: '#c0392b' }}>
                  <Clipboard size={10} /> Copy URL
                </button>
              </div>
            </div>
          ))}
          {assets.length === 0 && (
            <div className="col-span-4 text-center py-16" style={{ color: '#555' }}>No media uploaded yet.</div>
          )}
        </div>
      )}
    </div>
  );
}
