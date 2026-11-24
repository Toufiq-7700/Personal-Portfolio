'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const TYPEWRITER_WORDS = [
  'AI Researcher',
  'AI/ML Engineer',
  'Software Engineer',
  'Backend Developer',
  'Problem Solver',
];

export default function HomePage() {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleReset = () => {
      setWordIndex(0);
      setCurrentText('');
      setIsDeleting(false);
    };
    window.addEventListener('restart-splash', handleReset);
    return () => window.removeEventListener('restart-splash', handleReset);
  }, []);

  useEffect(() => {
    const currentWord = TYPEWRITER_WORDS[wordIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < currentWord.length) {
        timer = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 1800);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(currentWord.substring(0, currentText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex]);

  return (
    <main>
      {/* ── Hero Section ───────────────────────────────────── */}
      <section className="hero is-visible" id="home" aria-label="Introduction">
        <div className="hero__left">
          <h1 className="hero__greeting">
            Hi, I&apos;m <span className="name">TOUFIQ,</span>
            <br />
            <span className="hero__typewriter-wrap">{currentText}</span>
            <span className="hero__cursor" aria-hidden="true"></span>
          </h1>

          <p className="hero__desc">
            A passionate AI & ML enthusiast building intelligent systems at the intersection of full-stack development and machine learning. CSE student at United International University.
          </p>

          <div className="hero__btns">
            <Link href="/projects" className="btn btn--primary">
              View My Work
              <svg className="btn__icon" viewBox="0 0 24 24" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            <Link href="/contact" className="btn btn--ghost">
              Contact Me
            </Link>

            <a className="btn btn--ghost" href="/assets/Toufiqq.pdf" target="_blank" rel="noopener noreferrer">
              <svg className="btn__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Resume
            </a>
          </div>

          <div className="hero__socials" aria-label="Social links">
            <a className="social-icon" href="https://github.com/Toufiq-7700" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a className="social-icon" href="https://www.linkedin.com/in/md-toufiq-imroz-khealid-khan-b155a4396/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a className="social-icon" href="mailto:toufiqimroz161055@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>

        <div className="hero__right">
          <div className="profile-card">
            <span className="profile-card__dot" aria-hidden="true"></span>
            <div className="profile-card__img-wrap">
              <img className="profile-card__photo" src="/assets/images/toufiq-profile.jpg" alt="Toufiq — portfolio photo" />
              <div className="profile-card__overlay" aria-hidden="true"></div>
              <div className="profile-card__badge">
                <span className="badge__name">TOUFIQ</span>
                <span className="badge__role">AI Researcher & Dev</span>
              </div>
            </div>
            <div className="profile-card__stat" aria-label="Open to work">
              <div className="stat__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div className="stat__text">
                <span className="stat__value">Open to Work</span>
                <span className="stat__label">Available Now</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Preview ────────────────────────────────────── */}
      <section className="home-preview home-preview--alt" aria-label="About preview">
        <div className="container">
          <div className="home-preview__header">
            <div>
              <span className="section__tag">Discover</span>
              <h2 className="section__title">About <span className="accent">Me</span></h2>
            </div>
            <Link href="/about" className="home-preview__see-all">Learn More →</Link>
          </div>
          <div className="about-preview__inner">
            <p className="about__lead">
              I am <strong>Md. Toufiq Imroz Khealid Khan</strong>, a CSE student at{' '}
              <strong>United International University</strong> (Class of 2027), passionate about AI, Machine Learning, and full-stack development.
            </p>
            <p className="about__text">
              I specialize in full-stack development and machine learning, turning complex ideas into polished products with Rust, Python, and modern web frameworks.
            </p>
            <div className="about__stats">
              <div className="stat-box">
                <div className="stat-box__num">4+</div>
                <div className="stat-box__label">Projects Built</div>
              </div>
              <div className="stat-box">
                <div className="stat-box__num">8+</div>
                <div className="stat-box__label">Languages Known</div>
              </div>
              <div className="stat-box">
                <div className="stat-box__num">1+ yr</div>
                <div className="stat-box__label">Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Projects Preview ─────────────────────────── */}
      <section className="home-preview" aria-label="Featured projects">
        <div className="container">
          <div className="home-preview__header">
            <div>
              <span className="section__tag">Portfolio</span>
              <h2 className="section__title">Featured <span className="accent">Projects</span></h2>
            </div>
            <Link href="/projects" className="home-preview__see-all">View All Projects →</Link>
          </div>
          <div className="projects__grid">
            {/* Project 1 */}
            <article className="project-card">
              <div className="project-card__banner">
                <img src="/assets/projects/P1.webp" alt="AuraLink screenshot" className="project-card__img" loading="lazy" />
                <div className="project-card__img-overlay"></div>
                <span className="project-card__category">Full-Stack</span>
              </div>
              <div className="project-card__content">
                <h3 className="project-card__title">AuraLink</h3>
                <p className="project-card__desc">
                  A web platform focused on emotional expression and empathetic communities with real-time updates.
                </p>
                <div className="project-card__tags">
                  <span className="tech-tag">HTML</span>
                  <span className="tech-tag">CSS</span>
                  <span className="tech-tag">JavaScript</span>
                  <span className="tech-tag">PHP</span>
                  <span className="tech-tag">MySQL</span>
                </div>
                <div className="project-card__actions">
                  <a href="https://github.com/Toufiq-7700/AuraLink" target="_blank" rel="noopener noreferrer" className="project-link">
                    <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                    Code
                  </a>
                </div>
              </div>
            </article>

            {/* Project 2 */}
            <article className="project-card">
              <div className="project-card__banner">
                <img src="/assets/projects/P2.webp" alt="CompeteX screenshot" className="project-card__img" loading="lazy" />
                <div className="project-card__img-overlay"></div>
                <span className="project-card__category">Platform</span>
              </div>
              <div className="project-card__content">
                <h3 className="project-card__title">CompeteX</h3>
                <p className="project-card__desc">
                  A competitive programming and exam platform built to handle advanced coding tasks and contests.
                </p>
                <div className="project-card__tags">
                  <span className="tech-tag">TypeScript</span>
                  <span className="tech-tag">PHP</span>
                  <span className="tech-tag">MySQL</span>
                </div>
                <div className="project-card__actions">
                  <a href="https://github.com/Toufiq-7700/CompeteX" target="_blank" rel="noopener noreferrer" className="project-link">
                    <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                    Code
                  </a>
                </div>
              </div>
            </article>

            {/* Project 3 */}
            <article className="project-card">
              <div className="project-card__banner">
                <img src="/assets/projects/P3.webp" alt="UIU Research Hub screenshot" className="project-card__img" loading="lazy" />
                <div className="project-card__img-overlay"></div>
                <span className="project-card__category">Academic</span>
              </div>
              <div className="project-card__content">
                <h3 className="project-card__title">UIU Research Hub</h3>
                <p className="project-card__desc">
                  A web platform for centralizing and managing university research activities, publications, and papers.
                </p>
                <div className="project-card__tags">
                  <span className="tech-tag">HTML</span>
                  <span className="tech-tag">CSS</span>
                  <span className="tech-tag">JavaScript</span>
                  <span className="tech-tag">PHP</span>
                </div>
                <div className="project-card__actions">
                  <a href="https://github.com/Toufiq-7700/UIU-Research-Hub" target="_blank" rel="noopener noreferrer" className="project-link">
                    <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                    Code
                  </a>
                </div>
              </div>
            </article>

            {/* Project 4 */}
            <article className="project-card">
              <div className="project-card__banner">
                <img src="/assets/projects/P4.webp" alt="SmartWallet screenshot" className="project-card__img" loading="lazy" />
                <div className="project-card__img-overlay"></div>
                <span className="project-card__category">Finance App</span>
              </div>
              <div className="project-card__content">
                <h3 className="project-card__title">SmartWallet</h3>
                <p className="project-card__desc">
                  A personal finance app to track monthly expenses, manage budgets, and visualize spending trends.
                </p>
                <div className="project-card__tags">
                  <span className="tech-tag">PHP</span>
                  <span className="tech-tag">MySQL</span>
                  <span className="tech-tag">JavaScript</span>
                  <span className="tech-tag">HTML/CSS</span>
                </div>
                <div className="project-card__actions">
                  <a href="https://github.com/Toufiq-7700/toufiq" target="_blank" rel="noopener noreferrer" className="project-link">
                    <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                    Code
                  </a>
                  <a href="https://myfreewallet.infinityfree.me/" target="_blank" rel="noopener noreferrer" className="project-link">
                    <svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </article>
          </div>
          <div className="home-preview__cta">
            <Link href="/projects" className="btn btn--primary">View All Projects →</Link>
          </div>
        </div>
      </section>

      {/* ── Skills Snapshot ──────────────────────────────────── */}
      <section className="home-preview home-preview--alt" aria-label="Skills snapshot">
        <div className="container">
          <div className="home-preview__header">
            <div>
              <span className="section__tag">Expertise</span>
              <h2 className="section__title">Skills <span className="accent">Snapshot</span></h2>
            </div>
            <Link href="/skills" className="home-preview__see-all">Explore Full Stack →</Link>
          </div>
          <div className="skills-pills">
            {['C++', 'C', 'Java', 'Python', 'Rust', 'WebAssembly', 'HTML5 / CSS3', 'JavaScript (ES6+)', 'TypeScript', 'PHP', 'MySQL', 'NumPy', 'Pandas', 'scikit-learn', 'DSA', 'Figma'].map((s) => (
              <span key={s} className="skill-pill">{s}</span>
            ))}
          </div>
          <div className="home-preview__cta">
            <Link href="/skills" className="btn btn--ghost">Explore All Skills →</Link>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────── */}
      <section className="home-preview contact-cta" aria-label="Contact invitation">
        <div className="container">
          <span className="section__tag">Get In Touch</span>
          <h2 className="section__title" style={{ marginTop: '12px' }}>Open to Work <span className="accent">&</span> Collaborations</h2>
          <p className="contact-cta__sub">Have a project in mind, an internship opportunity, or want to collaborate? I&apos;d love to hear from you.</p>
          <div className="contact-cta__actions">
            <a href="mailto:toufiqimroz161055@gmail.com" className="btn btn--primary">✉ Send an Email</a>
            <Link href="/contact" className="btn btn--ghost">Go to Contact Page →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
