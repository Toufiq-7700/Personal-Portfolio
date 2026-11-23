'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ msg: string; isOk: boolean } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ msg: 'Please fill in all fields before sending.', isOk: false });
      return;
    }
    const mailto = `mailto:toufiqimroz161055@gmail.com?subject=Portfolio%20Contact%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${encodeURIComponent(name)}%20(${encodeURIComponent(email)})`;
    window.location.href = mailto;
    setStatus({ msg: 'Opening your email client to send message...', isOk: true });
  };

  return (
    <main className="page-main">
      <section className="section" id="contact" aria-label="Contact Section">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">Connect</span>
            <h2 className="section__title">Get In <span className="accent">Touch</span></h2>
            <p className="section__desc">
              Have a project in mind, want to discuss opportunities, or just say hello? Reach out!
            </p>
          </div>

          <div className="contact__grid">
            <div className="contact__info">
              <h3 className="contact__heading">Let&apos;s Build Something Intelligent</h3>
              <p className="contact__lead">
                I&apos;m currently open to internship opportunities, freelance projects, and research collaborations in AI/ML and full-stack software development.
              </p>

              <div className="contact-list">
                <a className="contact-item" href="mailto:toufiqimroz161055@gmail.com">
                  <div className="contact-item__icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="contact-item__text">
                    <span className="contact-item__label">Email</span>
                    <span className="contact-item__value">toufiqimroz161055@gmail.com</span>
                  </div>
                </a>

                <div className="contact-item">
                  <div className="contact-item__icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="contact-item__text">
                    <span className="contact-item__label">Location</span>
                    <span className="contact-item__value">Dhaka, Bangladesh</span>
                  </div>
                </div>

                <a className="contact-item" href="https://github.com/Toufiq-7700" target="_blank" rel="noopener noreferrer">
                  <div className="contact-item__icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </div>
                  <div className="contact-item__text">
                    <span className="contact-item__label">GitHub</span>
                    <span className="contact-item__value">Toufiq-7700</span>
                  </div>
                </a>

                <a className="contact-item" href="https://www.linkedin.com/in/md-toufiq-imroz-khealid-khan-b155a4396/" target="_blank" rel="noopener noreferrer">
                  <div className="contact-item__icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <div className="contact-item__text">
                    <span className="contact-item__label">LinkedIn</span>
                    <span className="contact-item__value">Md. Toufiq Imroz Khealid Khan</span>
                  </div>
                </a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              {status && (
                <div className={`form-status ${status.isOk ? 'form-status--success' : 'form-status--error'}`}>
                  {status.msg}
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Name</label>
                <input
                  className="form-input"
                  id="contact-name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address</label>
                <input
                  className="form-input"
                  id="contact-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-msg">Message</label>
                <textarea
                  className="form-textarea"
                  id="contact-msg"
                  placeholder="Tell me about your project or idea..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              <button className="btn btn--primary" type="submit">
                Send Message
                <svg className="btn__icon" viewBox="0 0 24 24" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
