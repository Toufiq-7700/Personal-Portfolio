'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';
import { toast } from 'sonner';
import {
  LayoutDashboard, FolderOpen, Zap, Trophy, GraduationCap,
  Briefcase, BookOpen, Image, Settings, LogOut, ExternalLink
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
  { href: '/admin/skills', label: 'Skills', icon: Zap },
  { href: '/admin/achievements', label: 'Achievements', icon: Trophy },
  { href: '/admin/education', label: 'Education', icon: GraduationCap },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
  { href: '/admin/research', label: 'Research', icon: BookOpen },
  { href: '/admin/media', label: 'Media', icon: Image },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await authApi.logout();
      toast.success('Logged out');
      router.push('/admin/login');
    } catch {
      router.push('/admin/login');
    }
  }

  return (
    <aside className="w-60 flex flex-col flex-shrink-0" style={{ background: '#161616', borderRight: '1px solid #2a2a2a', minHeight: '100vh' }}>
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: '#2a2a2a' }}>
        <span className="font-bold text-lg text-white">
          TOUFIQ<span style={{ color: '#c0392b' }}>.</span>
        </span>
        <p className="text-xs mt-0.5" style={{ color: '#666' }}>Admin Dashboard</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
          return (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{
                background: isActive ? 'rgba(122,31,31,0.25)' : 'transparent',
                color: isActive ? '#ff6b6b' : '#aaa',
              }}>
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t space-y-1" style={{ borderColor: '#2a2a2a' }}>
        <Link href="/" target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-white/5"
          style={{ color: '#888' }}>
          <ExternalLink size={15} /> View Site
        </Link>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-red-900/20 text-left"
          style={{ color: '#888' }}>
          <LogOut size={15} /> Logout
        </button>
      </div>
    </aside>
  );
}
