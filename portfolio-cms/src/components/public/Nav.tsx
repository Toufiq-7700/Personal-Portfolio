'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/education', label: 'Education' },
  { href: '/experience', label: 'Experience' },
  { href: '/research', label: 'Research' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{
      background: 'rgba(240,232,219,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(122,31,31,0.1)',
      height: 'var(--nav-height)',
    }}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl tracking-tight" style={{ color: 'var(--color-dark)' }}>
          TOUFIQ<span style={{ color: 'var(--color-maroon)' }}>.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
              style={{
                color: pathname === href ? 'var(--color-maroon)' : 'var(--color-mid)',
                background: pathname === href ? 'rgba(122,31,31,0.08)' : 'transparent',
              }}
            >
              {label}
            </Link>
          ))}
          <a
            href="mailto:toufiqimroz161055@gmail.com"
            className="ml-3 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: 'var(--color-maroon)',
              color: '#fff',
            }}
          >
            Hire Me
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} style={{ color: 'var(--color-dark)' }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden" style={{ background: 'var(--color-bg)', borderTop: '1px solid rgba(122,31,31,0.1)' }}>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm font-medium border-b"
              style={{
                color: pathname === href ? 'var(--color-maroon)' : 'var(--color-dark)',
                borderColor: 'rgba(122,31,31,0.08)',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
