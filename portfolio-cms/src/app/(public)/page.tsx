import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail, FileText } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(122,31,31,0.1)', color: 'var(--color-maroon)' }}>
              Available for opportunities
            </span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6" style={{ color: 'var(--color-dark)' }}>
              Hi, I&apos;m{' '}
              <span style={{ color: 'var(--color-maroon)' }}>TOUFIQ</span>
              <br />
              <span className="text-3xl md:text-4xl font-semibold" style={{ color: 'var(--color-mid)' }}>
                AI Researcher & Developer
              </span>
            </h1>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: 'var(--color-mid)' }}>
              A passionate AI & ML enthusiast building intelligent systems at the intersection of full-stack development and machine learning. CSE student at United International University.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: 'var(--color-maroon)', color: '#fff' }}>
                View My Work <ArrowRight size={16} />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border-2 transition-all hover:opacity-80"
                style={{ borderColor: 'var(--color-maroon)', color: 'var(--color-maroon)' }}>
                Contact Me
              </Link>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border transition-all hover:opacity-80"
                style={{ borderColor: 'rgba(122,31,31,0.3)', color: 'var(--color-mid)' }}>
                <FileText size={16} /> Resume
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/Toufiq-7700" target="_blank" rel="noopener noreferrer"
                className="p-2.5 rounded-full border transition-all hover:opacity-70"
                style={{ borderColor: 'rgba(122,31,31,0.2)', color: 'var(--color-dark)' }}>
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/md-toufiq-imroz-khealid-khan-b155a4396/" target="_blank" rel="noopener noreferrer"
                className="p-2.5 rounded-full border transition-all hover:opacity-70"
                style={{ borderColor: 'rgba(122,31,31,0.2)', color: 'var(--color-dark)' }}>
                <Linkedin size={18} />
              </a>
              <a href="mailto:toufiqimroz161055@gmail.com"
                className="p-2.5 rounded-full border transition-all hover:opacity-70"
                style={{ borderColor: 'rgba(122,31,31,0.2)', color: 'var(--color-dark)' }}>
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Right — Profile card */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 rounded-2xl overflow-hidden shadow-2xl"
                style={{ border: '3px solid rgba(122,31,31,0.3)' }}>
                <img src="/assets/images/toufiq-profile.jpg" alt="Toufiq" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl shadow-lg"
                style={{ background: 'var(--color-maroon)', color: '#fff' }}>
                <p className="font-bold text-sm">TOUFIQ</p>
                <p className="text-xs opacity-90">AI Researcher & Dev</p>
              </div>
              <div className="absolute -top-3 -left-3 px-3 py-1.5 rounded-full text-xs font-semibold shadow"
                style={{ background: '#fff', color: 'var(--color-maroon)', border: '2px solid var(--color-maroon)' }}>
                🟢 Open to Work
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-t border-b" style={{ borderColor: 'rgba(122,31,31,0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {[
            { num: '4+', label: 'Projects Built' },
            { num: '8+', label: 'Languages Known' },
            { num: '1+ yr', label: 'Experience' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-4xl font-bold mb-1" style={{ color: 'var(--color-maroon)' }}>{s.num}</div>
              <div className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick links to sections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(122,31,31,0.1)', color: 'var(--color-maroon)' }}>Explore</span>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--color-dark)' }}>What I Do</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Projects', desc: 'Full-stack applications and AI/ML tools I\'ve built.', href: '/projects', icon: '🚀' },
              { title: 'Skills', desc: 'Languages, frameworks, and tools in my toolkit.', href: '/skills', icon: '⚡' },
              { title: 'Research', desc: 'Academic research and publications.', href: '/research', icon: '📚' },
            ].map(card => (
              <Link key={card.href} href={card.href}
                className="group p-6 rounded-xl transition-all hover:shadow-md"
                style={{ background: 'rgba(122,31,31,0.04)', border: '1px solid rgba(122,31,31,0.12)' }}>
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-maroon transition-colors"
                  style={{ color: 'var(--color-dark)' }}>{card.title}</h3>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
