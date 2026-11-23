import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="page-main">
      <section className="section section--alt" id="about" aria-label="About Toufiq">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">Discover</span>
            <h2 className="section__title">About <span className="accent">Me</span></h2>
            <p className="section__desc">
              A passionate learner exploring Artificial Intelligence, Machine Learning, and Software Development.
            </p>
          </div>

          <div className="about__grid">
            <div className="about__story">
              <p className="about__lead">
                I am <strong>Md. Toufiq Imroz Khealid Khan</strong>, a CSE student at{' '}
                <strong>United International University</strong> (Class of 2027), passionate about AI, Machine Learning, and full-stack development.
              </p>
              <p className="about__text">
                I enjoy solving problems through coding, building full-stack applications, and understanding how technology can make everyday life smarter. I continuously improve my skills by practicing algorithms, data structures, and developing real-world projects.
              </p>
              <p className="about__text">
                My goal is to develop intelligent and efficient solutions that combine creativity, logic, and meaningful impact. I work with modern software development tools and frameworks across the full stack.
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

            <div className="about__cards">
              <div className="feature-card">
                <div className="feature-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                    <circle cx="12" cy="12" r="6" />
                  </svg>
                </div>
                <div>
                  <h3 className="feature-card__title">AI & Machine Learning</h3>
                  <p className="feature-card__desc">
                    Exploring neural networks, ML models with Python, NumPy, Pandas, and scikit-learn for real-world intelligent systems.
                  </p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div>
                  <h3 className="feature-card__title">Full-Stack Development</h3>
                  <p className="feature-card__desc">
                    Building end-to-end web applications with HTML, CSS, JavaScript, TypeScript, PHP and MySQL databases.
                  </p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="feature-card__title">Problem Solving & DSA</h3>
                  <p className="feature-card__desc">
                    Competing in programming contests — 25th at Coders Combat, 7th in Book Reading Competition among 300+ participants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
