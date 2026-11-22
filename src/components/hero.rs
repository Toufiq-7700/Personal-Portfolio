use crate::utils::typewriter::use_typewriter;
use leptos::prelude::*;

#[component]
pub fn Hero() -> impl IntoView {
    let typewriter_text = use_typewriter();

    view! {
        <section class="hero is-visible" id="home" aria-label="Introduction">
            <div class="hero__left">
                <h1 class="hero__greeting">
                    "Hi, I'm " <span class="name">"TOUFIQ,"</span>
                    <br/>
                    <span class="hero__typewriter-wrap">{move || typewriter_text.get()}</span>
                    <span class="hero__cursor" aria-hidden="true"></span>
                </h1>

                <p class="hero__desc">
                    "A passionate AI & ML enthusiast building intelligent systems at the intersection of full-stack development and machine learning. CSE student at United International University."
                </p>

                <div class="hero__btns">
                    <a href="/projects" class="btn btn--primary">
                        "View My Work"
                        <svg class="btn__icon" viewBox="0 0 24 24" aria-hidden="true">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                            <polyline points="12 5 19 12 12 19"/>
                        </svg>
                    </a>

                    <a href="/contact" class="btn btn--ghost">
                        "Contact Me"
                    </a>

                    <a class="btn btn--ghost" href="assets/Toufiqq.pdf" target="_blank" rel="noopener">
                        <svg class="btn__icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                            <polyline points="10 9 9 9 8 9"/>
                        </svg>
                        "Resume"
                    </a>
                </div>

                <div class="hero__socials" aria-label="Social links">
                    <a class="social-icon" href="https://github.com/Toufiq-7700" aria-label="GitHub" target="_blank" rel="noopener">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                    </a>
                    <a class="social-icon" href="https://www.linkedin.com/in/md-toufiq-imroz-khealid-khan-b155a4396/" aria-label="LinkedIn" target="_blank" rel="noopener">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect x="2" y="9" width="4" height="12" />
                            <circle cx="4" cy="4" r="2" />
                        </svg>
                    </a>
                    <a class="social-icon" href="mailto:toufiqimroz161055@gmail.com" aria-label="Email">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                    </a>
                </div>
            </div>

            <div class="hero__right">
                <div class="profile-card">
                    <span class="profile-card__dot" aria-hidden="true"></span>
                    <div class="profile-card__img-wrap">
                        <img class="profile-card__photo" src="assets/images/toufiq-profile.jpg" alt="Toufiq — portfolio photo" loading="eager"/>
                        <div class="profile-card__overlay" aria-hidden="true"></div>
                        <div class="profile-card__badge">
                            <span class="badge__name">"TOUFIQ"</span>
                            <span class="badge__role">"AI Researcher & Dev"</span>
                        </div>
                    </div>
                    <div class="profile-card__stat" aria-label="Open to work">
                        <div class="stat__icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                            </svg>
                        </div>
                        <div class="stat__text">
                            <span class="stat__value">"Open to Work"</span>
                            <span class="stat__label">"Available Now"</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    }
}
