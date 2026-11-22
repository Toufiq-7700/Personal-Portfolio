use leptos::prelude::*;
use leptos_router::hooks::use_location;

#[component]
pub fn Nav() -> impl IntoView {
    let (is_open, set_is_open) = signal(false);
    let location = use_location();

    let close_menu = move || set_is_open.set(false);

    let is_active = move |path: &'static str| {
        location.pathname.with(|p| p == path)
    };

    // Scroll to top automatically when navigating between pages
    Effect::new(move |_| {
        location.pathname.track();
        if let Some(win) = web_sys::window() {
            win.scroll_to_with_x_and_y(0.0, 0.0);
        }
    });

    view! {
        <header>
            <nav class="nav is-visible" aria-label="Main navigation">
                <a href="/" class="nav__logo" on:click=move |_| close_menu()>
                    "TOUFIQ"<span class="dot">"."</span>
                </a>

                <ul class="nav__links" class:is-open=move || is_open.get() role="list">
                    <li>
                        <a href="/" class="nav__link"
                           class:is-active=move || is_active("/")
                           on:click=move |_| close_menu()>
                            "Home"
                        </a>
                    </li>
                    <li>
                        <a href="/about" class="nav__link"
                           class:is-active=move || is_active("/about")
                           on:click=move |_| close_menu()>
                            "About"
                        </a>
                    </li>
                    <li>
                        <a href="/skills" class="nav__link"
                           class:is-active=move || is_active("/skills")
                           on:click=move |_| close_menu()>
                            "Skills"
                        </a>
                    </li>
                    <li>
                        <a href="/projects" class="nav__link"
                           class:is-active=move || is_active("/projects")
                           on:click=move |_| close_menu()>
                            "Projects"
                        </a>
                    </li>
                    <li>
                        <a href="/contact" class="nav__link"
                           class:is-active=move || is_active("/contact")
                           on:click=move |_| close_menu()>
                            "Contact"
                        </a>
                    </li>
                </ul>

                <div class="nav__right">
                    <a href="/contact" class="nav__cta" on:click=move |_| close_menu()>
                        "Hire Me"
                    </a>
                    <button class="nav__toggle"
                            class:is-open=move || is_open.get()
                            aria-label="Toggle navigation"
                            on:click=move |_| set_is_open.update(|open| *open = !*open)>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
        </header>
    }
}
