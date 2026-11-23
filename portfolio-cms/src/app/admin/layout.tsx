'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authApi } from '@/lib/api';
import AdminSidebar from '@/components/admin/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (pathname === '/admin/login') { setChecking(false); return; }
    authApi.me()
      .then(() => setChecking(false))
      .catch(() => router.replace('/admin/login'));
  }, [pathname, router]);

  if (pathname === '/admin/login') return <>{children}</>;
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f0f0f' }}>
        <div className="text-gray-400 text-sm">Verifying session…</div>
      </div>
    );
  }

  return (
    <div className="admin-layout flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto" style={{ background: '#121212' }}>
        {children}
      </main>
    </div>
  );
}
