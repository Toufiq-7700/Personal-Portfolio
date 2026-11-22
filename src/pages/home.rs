use crate::components::hero::Hero;
use leptos::prelude::*;

#[component]
pub fn HomePage() -> impl IntoView {
    view! {
        <main>
            <Hero/>

            // ── About Preview ──────────────────────────────────────
            <section class="home-preview home-preview--alt" aria-label="About preview">
                <div class="container">
                    <div class="home-preview__header">
                        <div>
                            <span class="section__tag">"Discover"</span>
                            <h2 class="section__title">"About " <span class="accent">"Me"</span></h2>
                        </div>
                        <a href="/about" class="home-preview__see-all">"Learn More →"</a>
                    </div>
                    <div class="about-preview__inner">
                        <p class="about__lead">
                            "I am " <strong>"Md. Toufiq Imroz Khealid Khan"</strong> ", a CSE student at "
                            <strong>"United International University"</strong> " (Class of 2027), passionate about AI, Machine Learning, and full-stack development."
                        </p>
                        <p class="about__text">
                            "I specialize in full-stack development and machine learning, turning complex ideas into polished products with Rust, Python, and modern web frameworks."
                        </p>
                        <div class="about__stats">
                            <div class="stat-box">
                                <div class="stat-box__num">"4+"</div>
                                <div class="stat-box__label">"Projects Built"</div>
                            </div>
                            <div class="stat-box">
                                <div class="stat-box__num">"8+"</div>
                                <div class="stat-box__label">"Languages Known"</div>
                            </div>
                            <div class="stat-box">
                                <div class="stat-box__num">"1+ yr"</div>
                                <div class="stat-box__label">"Experience"</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            // ── Featured Projects Preview ───────────────────────────
            <section class="home-preview" aria-label="Featured projects">
                <div class="container">
                    <div class="home-preview__header">
                        <div>
                            <span class="section__tag">"Portfolio"</span>
                            <h2 class="section__title">"Featured " <span class="accent">"Projects"</span></h2>
                        </div>
                        <a href="/projects" class="home-preview__see-all">"View All Projects →"</a>
                    </div>
                    <div class="projects__grid">
                        <article class="project-card">
                            <div class="project-card__banner">
                                <img src="assets/projects/P1.webp" alt="AuraLink screenshot" class="project-card__img" loading="lazy"/>
                                <div class="project-card__img-overlay"></div>
                                <span class="project-card__category">"Full-Stack"</span>
                            </div>
                            <div class="project-card__content">
                                <h3 class="project-card__title">"AuraLink"</h3>
                                <p class="project-card__desc">
                                    "A web platform focused on emotional expression and empathetic communities with real-time updates."
                                </p>
                                <div class="project-card__tags">
                                    <span class="tech-tag">"HTML"</span>
                                    <span class="tech-tag">"CSS"</span>
                                    <span class="tech-tag">"JavaScript"</span>
                                    <span class="tech-tag">"PHP"</span>
                                    <span class="tech-tag">"MySQL"</span>
                                </div>
                                <div class="project-card__actions">
                                    <a href="https://github.com/Toufiq-7700/AuraLink" target="_blank" rel="noopener" class="project-link">
                                        <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                                        "Code"
                                    </a>
                                </div>
                            </div>
                        </article>

                        <article class="project-card">
                            <div class="project-card__banner">
                                <img src="assets/projects/P4.webp" alt="SmartWallet screenshot" class="project-card__img" loading="lazy"/>
                                <div class="project-card__img-overlay"></div>
                                <span class="project-card__category">"Full-Stack"</span>
                            </div>
                            <div class="project-card__content">
                                <h3 class="project-card__title">"SmartWallet"</h3>
                                <p class="project-card__desc">
                                    "Personal finance tracker with interactive dashboards, income vs expense tracking, and savings analytics."
                                </p>
                                <div class="project-card__tags">
                                    <span class="tech-tag">"PHP"</span>
                                    <span class="tech-tag">"MySQL"</span>
                                    <span class="tech-tag">"JavaScript"</span>
                                    <span class="tech-tag">"HTML/CSS"</span>
                                </div>
                                <div class="project-card__actions">
                                    <a href="https://github.com/Toufiq-7700/SmartWallet" target="_blank" rel="noopener" class="project-link">
                                        <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                                        "Code"
                                    </a>
                                    <a href="https://myfreewallet.infinityfree.me/" target="_blank" rel="noopener" class="project-link">
                                        <svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                        "Live Demo"
                                    </a>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div class="home-preview__cta">
                        <a href="/projects" class="btn btn--primary">"View All Projects →"</a>
                    </div>
                </div>
            </section>

            // ── Skills Snapshot ────────────────────────────────────
            <section class="home-preview home-preview--alt" aria-label="Skills snapshot">
                <div class="container">
                    <div class="home-preview__header">
                        <div>
                            <span class="section__tag">"Expertise"</span>
                            <h2 class="section__title">"Skills " <span class="accent">"Snapshot"</span></h2>
                        </div>
                        <a href="/skills" class="home-preview__see-all">"Explore Full Stack →"</a>
                    </div>
                    <div class="skills-pills">
                        <span class="skill-pill">"C++"</span>
                        <span class="skill-pill">"C"</span>
                        <span class="skill-pill">"Java"</span>
                        <span class="skill-pill">"Python"</span>
                        <span class="skill-pill">"Rust"</span>
                        <span class="skill-pill">"WebAssembly"</span>
                        <span class="skill-pill">"HTML5 / CSS3"</span>
                        <span class="skill-pill">"JavaScript (ES6+)"</span>
                        <span class="skill-pill">"TypeScript"</span>
                        <span class="skill-pill">"PHP"</span>
                        <span class="skill-pill">"MySQL"</span>
                        <span class="skill-pill">"NumPy"</span>
                        <span class="skill-pill">"Pandas"</span>
                        <span class="skill-pill">"scikit-learn"</span>
                        <span class="skill-pill">"DSA"</span>
                        <span class="skill-pill">"Figma"</span>
                    </div>
                    <div class="home-preview__cta">
                        <a href="/skills" class="btn btn--ghost">"Explore All Skills →"</a>
                    </div>
                </div>
            </section>

            // ── Contact CTA ────────────────────────────────────────
            <section class="home-preview contact-cta" aria-label="Contact invitation">
                <div class="container">
                    <span class="section__tag">"Get In Touch"</span>
                    <h2 class="section__title" style="margin-top: 12px;">"Open to Work " <span class="accent">"&"</span> " Collaborations"</h2>
                    <p class="contact-cta__sub">"Have a project in mind, an internship opportunity, or want to collaborate? I'd love to hear from you."</p>
                    <div class="contact-cta__actions">
                        <a href="mailto:toufiqimroz161055@gmail.com" class="btn btn--primary">"✉ Send an Email"</a>
                        <a href="/contact" class="btn btn--ghost">"Go to Contact Page →"</a>
                    </div>
                </div>
            </section>
        </main>
    }
}
