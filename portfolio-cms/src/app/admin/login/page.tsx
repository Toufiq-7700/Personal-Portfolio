'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';
import { toast } from 'sonner';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.login(form.username, form.password);
      toast.success('Logged in successfully');
      router.push('/admin');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f0f0f' }}>
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{ background: 'rgba(122,31,31,0.2)', border: '1px solid rgba(122,31,31,0.3)' }}>
            <Lock size={24} style={{ color: '#c0392b' }} />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Access</h1>
          <p className="text-sm mt-1" style={{ color: '#888' }}>Toufiq&apos;s Portfolio CMS</p>
        </div>

        <form onSubmit={handleSubmit}
          className="rounded-2xl p-8 space-y-5"
          style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Username</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#666' }} />
              <input
                type="text"
                required
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none focus:ring-2"
                style={{
                  background: '#262626', border: '1px solid #333',
                  color: '#fff'
                }}
                placeholder="admin"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#666' }} />
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="w-full pl-9 pr-10 py-2.5 rounded-lg text-sm outline-none"
                style={{ background: '#262626', border: '1px solid #333', color: '#fff' }}
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPass(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#666' }}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-sm transition-all disabled:opacity-50"
            style={{ background: '#7a1f1f', color: '#fff' }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs mt-4" style={{ color: '#555' }}>
          This page is not publicly accessible.
        </p>
      </div>
    </div>
  );
}
