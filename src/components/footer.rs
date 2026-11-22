use crate::utils::scroll::scroll_to_top;
use leptos::prelude::*;

#[component]
pub fn Footer() -> impl IntoView {
    view! {
        <footer class="footer">
            <div class="footer__container">
                <div class="footer__top">
                    <div>
                        <div class="footer__logo">
                            "TOUFIQ"<span class="dot">"."</span>
                        </div>
                        <p class="footer__tagline">
                            "AI & ML Enthusiast | CSE @ UIU | Full-Stack Developer"
                        </p>
                    </div>

                    <div class="footer__socials">
                        <a class="footer__social-btn" href="https://github.com/Toufiq-7700" aria-label="GitHub" target="_blank" rel="noopener">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                            </svg>
                        </a>
                        <a class="footer__social-btn" href="https://www.linkedin.com/in/md-toufiq-imroz-khealid-khan-b155a4396/" aria-label="LinkedIn" target="_blank" rel="noopener">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect x="2" y="9" width="4" height="12" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                        </a>
                        <a class="footer__social-btn" href="mailto:toufiqimroz161055@gmail.com" aria-label="Email">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <div class="footer__bottom">
                    <p>"© 2026 Md. Toufiq Imroz Khealid Khan. All rights reserved."</p>

                    <div class="footer__badge">
                        <span>"🦀 Built with Rust + WebAssembly"</span>
                    </div>

                    <button class="footer__back-top" on:click=move |_| scroll_to_top()>
                        "Back to Top"
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                            <line x1="12" y1="19" x2="12" y2="5"/>
                            <polyline points="5 12 12 5 19 12"/>
                        </svg>
                    </button>
                </div>
            </div>
        </footer>
    }
}
