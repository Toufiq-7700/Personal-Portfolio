use leptos::ev;
use leptos::prelude::*;

#[component]
pub fn Contact() -> impl IntoView {
    let (name, set_name) = signal(String::new());
    let (email, set_email) = signal(String::new());
    let (message, set_message) = signal(String::new());
    let (status, set_status) = signal(Option::<(&'static str, bool)>::None);

    let handle_submit = move |ev: ev::SubmitEvent| {
        ev.prevent_default();

        let n = name.get().trim().to_string();
        let e = email.get().trim().to_string();
        let m = message.get().trim().to_string();

        if n.is_empty() || e.is_empty() || m.is_empty() {
            set_status.set(Some(("Please fill in all required fields.", false)));
            return;
        }

        if !e.contains('@') || !e.contains('.') {
            set_status.set(Some(("Please enter a valid email address.", false)));
            return;
        }

        set_status.set(Some((
            "Thank you! Your message has been received. I'll get back to you shortly.",
            true,
        )));
        set_name.set(String::new());
        set_email.set(String::new());
        set_message.set(String::new());
    };

    view! {
        <section class="section" id="contact" aria-label="Contact Section">
            <div class="container">
                <div class="section__header">
                    <span class="section__tag">"Connect"</span>
                    <h2 class="section__title">"Get In " <span class="accent">"Touch"</span></h2>
                    <p class="section__desc">
                        "Have a project idea, collaboration offer, or opportunity? I'd love to hear from you."
                    </p>
                </div>

                <div class="contact__grid">
                    <div class="contact__info">
                        <p class="contact__lead">
                            "I'm always open to discussing new projects, creative ideas, and opportunities. Let's connect!"
                        </p>

                        <div class="contact__items">
                            <a class="contact-item" href="mailto:toufiqimroz161055@gmail.com">
                                <div class="contact-item__icon">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                </div>
                                <div class="contact-item__text">
                                    <span class="contact-item__label">"Email"</span>
                                    <span class="contact-item__value">"toufiqimroz161055@gmail.com"</span>
                                </div>
                            </a>

                            <a class="contact-item" href="tel:+8801745202464">
                                <div class="contact-item__icon">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                </div>
                                <div class="contact-item__text">
                                    <span class="contact-item__label">"Phone"</span>
                                    <span class="contact-item__value">"+880 1745202464"</span>
                                </div>
                            </a>

                            <div class="contact-item">
                                <div class="contact-item__icon">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                </div>
                                <div class="contact-item__text">
                                    <span class="contact-item__label">"Location"</span>
                                    <span class="contact-item__value">"Dhaka, Bangladesh"</span>
                                </div>
                            </div>

                            <a class="contact-item" href="https://github.com/Toufiq-7700" target="_blank" rel="noopener">
                                <div class="contact-item__icon">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                    </svg>
                                </div>
                                <div class="contact-item__text">
                                    <span class="contact-item__label">"GitHub"</span>
                                    <span class="contact-item__value">"Toufiq-7700"</span>
                                </div>
                            </a>

                            <a class="contact-item" href="https://www.linkedin.com/in/md-toufiq-imroz-khealid-khan-b155a4396/" target="_blank" rel="noopener">
                                <div class="contact-item__icon">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                        <rect x="2" y="9" width="4" height="12" />
                                        <circle cx="4" cy="4" r="2" />
                                    </svg>
                                </div>
                                <div class="contact-item__text">
                                    <span class="contact-item__label">"LinkedIn"</span>
                                    <span class="contact-item__value">"Md. Toufiq Imroz Khealid Khan"</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    <form class="contact-form" on:submit=handle_submit>
                        {move || status.get().map(|(msg, is_ok)| {
                            let class_name = if is_ok { "form-status form-status--success" } else { "form-status form-status--error" };
                            view! { <div class=class_name>{msg}</div> }
                        })}

                        <div class="form-group">
                            <label class="form-label" for="contact-name">"Your Name"</label>
                            <input
                                class="form-input"
                                id="contact-name"
                                type="text"
                                placeholder="Enter your name"
                                prop:value=move || name.get()
                                on:input=move |ev| set_name.set(event_target_value(&ev))
                                required
                            />
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="contact-email">"Email Address"</label>
                            <input
                                class="form-input"
                                id="contact-email"
                                type="email"
                                placeholder="your.email@example.com"
                                prop:value=move || email.get()
                                on:input=move |ev| set_email.set(event_target_value(&ev))
                                required
                            />
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="contact-msg">"Message"</label>
                            <textarea
                                class="form-textarea"
                                id="contact-msg"
                                placeholder="Tell me about your project or idea..."
                                prop:value=move || message.get()
                                on:input=move |ev| set_message.set(event_target_value(&ev))
                                required
                            ></textarea>
                        </div>

                        <button class="btn btn--primary" type="submit">
                            "Send Message"
                            <svg class="btn__icon" viewBox="0 0 24 24" aria-hidden="true">
                                <line x1="22" y1="2" x2="11" y2="13"/>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    }
}
