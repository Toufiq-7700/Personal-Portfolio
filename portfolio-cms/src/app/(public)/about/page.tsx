export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
          style={{ background: 'rgba(122,31,31,0.1)', color: 'var(--color-maroon)' }}>About Me</span>
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-dark)' }}>
          Know Who <span style={{ color: 'var(--color-maroon)' }}>I Am</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <div className="rounded-2xl overflow-hidden mb-6 shadow-lg" style={{ maxWidth: 400 }}>
            <img src="/assets/images/Toufiq.jpg" alt="Toufiq" className="w-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { num: '4+', label: 'Projects Built' },
              { num: '8+', label: 'Languages' },
              { num: '1+ yr', label: 'Experience' },
            ].map(s => (
              <div key={s.label} className="p-4 rounded-xl text-center"
                style={{ background: 'rgba(122,31,31,0.05)', border: '1px solid rgba(122,31,31,0.1)' }}>
                <div className="text-2xl font-bold" style={{ color: 'var(--color-maroon)' }}>{s.num}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-lg leading-relaxed" style={{ color: 'var(--color-dark)' }}>
            I am <strong>Md. Toufiq Imroz Khealid Khan</strong>, a CSE student at{' '}
            <strong>United International University</strong> (Class of 2027), passionate about AI, Machine Learning, and full-stack development.
          </p>
          <p className="leading-relaxed" style={{ color: 'var(--color-mid)' }}>
            I enjoy solving problems through coding, building full-stack applications, and understanding how technology can make everyday life smarter. I continuously improve my skills by practicing algorithms, data structures, and developing real-world projects.
          </p>
          <p className="leading-relaxed" style={{ color: 'var(--color-mid)' }}>
            My goal is to develop intelligent and efficient solutions that combine creativity, logic, and meaningful impact. I work with modern software development tools and frameworks across the full stack.
          </p>

          <div className="grid grid-cols-1 gap-4 pt-4">
            {[
              { title: 'AI & Machine Learning', desc: 'Exploring neural networks, ML models with Python, NumPy, Pandas, and scikit-learn for real-world intelligent systems.', icon: '🤖' },
              { title: 'Full-Stack Development', desc: 'Building end-to-end web applications with HTML, CSS, JavaScript, TypeScript, PHP and MySQL databases.', icon: '💻' },
              { title: 'Problem Solving & DSA', desc: 'Competing in programming contests — 25th at Coders Combat, 7th in Book Reading Competition among 300+ participants.', icon: '⚡' },
            ].map(card => (
              <div key={card.title} className="flex gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(122,31,31,0.04)', border: '1px solid rgba(122,31,31,0.1)' }}>
                <span className="text-2xl flex-shrink-0">{card.icon}</span>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: 'var(--color-dark)' }}>{card.title}</h3>
                  <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
