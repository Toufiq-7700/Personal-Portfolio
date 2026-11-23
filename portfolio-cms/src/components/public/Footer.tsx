import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'rgba(122,31,31,0.15)', background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-bold text-lg" style={{ color: 'var(--color-dark)' }}>
            TOUFIQ<span style={{ color: 'var(--color-maroon)' }}>.</span>
          </span>
          <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
            AI & ML Enthusiast · Full-Stack Developer
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://github.com/Toufiq-7700" target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-full transition-colors hover:opacity-80"
            style={{ color: 'var(--color-mid)' }} aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/md-toufiq-imroz-khealid-khan-b155a4396/" target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-full transition-colors hover:opacity-80"
            style={{ color: 'var(--color-mid)' }} aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href="mailto:toufiqimroz161055@gmail.com"
            className="p-2 rounded-full transition-colors hover:opacity-80"
            style={{ color: 'var(--color-mid)' }} aria-label="Email">
            <Mail size={18} />
          </a>
        </div>

        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
          © {new Date().getFullYear()} Md. Toufiq Imroz Khealid Khan · Built with Rust & Next.js
        </p>
      </div>
    </footer>
  );
}
