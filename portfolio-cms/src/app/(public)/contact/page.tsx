export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
          style={{ background: 'rgba(122,31,31,0.1)', color: 'var(--color-maroon)' }}>Get in Touch</span>
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-dark)' }}>
          Contact <span style={{ color: 'var(--color-maroon)' }}>Me</span>
        </h1>
        <p className="text-lg" style={{ color: 'var(--color-muted)' }}>
          Have a project in mind or just want to say hello? I&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact info */}
        <div className="space-y-6">
          {[
            { label: 'Email', value: 'toufiqimroz161055@gmail.com', href: 'mailto:toufiqimroz161055@gmail.com', icon: '📧' },
            { label: 'GitHub', value: 'github.com/Toufiq-7700', href: 'https://github.com/Toufiq-7700', icon: '💻' },
            { label: 'LinkedIn', value: 'linkedin.com/in/md-toufiq-imroz…', href: 'https://www.linkedin.com/in/md-toufiq-imroz-khealid-khan-b155a4396/', icon: '💼' },
            { label: 'Location', value: 'Dhaka, Bangladesh', href: null, icon: '📍' },
          ].map(c => (
            <div key={c.label} className="flex gap-4 p-4 rounded-xl"
              style={{ background: '#fff', border: '1px solid rgba(122,31,31,0.1)' }}>
              <span className="text-2xl">{c.icon}</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--color-muted)' }}>{c.label}</p>
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noopener noreferrer"
                    className="text-sm font-medium hover:underline" style={{ color: 'var(--color-maroon)' }}>
                    {c.value}
                  </a>
                ) : (
                  <p className="text-sm font-medium" style={{ color: 'var(--color-dark)' }}>{c.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Message form (mailto fallback) */}
        <form action="mailto:toufiqimroz161055@gmail.com" method="get" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-mid)' }}>Name</label>
            <input name="subject" placeholder="Your name"
              className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none focus:ring-2"
              style={{ borderColor: 'rgba(122,31,31,0.2)', background: '#fff', color: 'var(--color-dark)' }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-mid)' }}>Message</label>
            <textarea name="body" rows={5} placeholder="Your message…"
              className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none focus:ring-2 resize-none"
              style={{ borderColor: 'rgba(122,31,31,0.2)', background: '#fff', color: 'var(--color-dark)' }} />
          </div>
          <button type="submit"
            className="w-full py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
            style={{ background: 'var(--color-maroon)', color: '#fff' }}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
