use leptos::prelude::*;

struct Project {
    title: &'static str,
    category: &'static str,
    badge: &'static str,
    desc: &'static str,
    tags: &'static [&'static str],
    github: &'static str,
    demo: Option<&'static str>,
    img: &'static str,
}

const PROJECTS_DATA: &[Project] = &[
    Project {
        title: "AuraLink",
        category: "Full-Stack",
        badge: "Web Platform",
        desc: "A web platform focused on emotional expression and connection. Enables users to share moods, build empathetic communities, and visualise emotional trends.",
        tags: &["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        github: "https://github.com/Toufiq-7700/AuraLink",
        demo: None,
        img: "assets/projects/P1.webp",
    },
    Project {
        title: "CompeteX",
        category: "Full-Stack",
        badge: "Platform",
        desc: "A competitive programming and exam platform built to handle advanced tasks. Features real-time contest management, automated grading, and leaderboard analytics.",
        tags: &["TypeScript", "PHP", "MySQL"],
        github: "https://github.com/Toufiq-7700/CompeteX",
        demo: None,
        img: "assets/projects/P2.webp",
    },
    Project {
        title: "UIU Research Hub",
        category: "Full-Stack",
        badge: "Academic",
        desc: "A web platform for centralizing and managing university research activities. Streamlines paper submissions, faculty collaboration, and research tracking.",
        tags: &["HTML", "CSS", "JavaScript", "PHP"],
        github: "https://github.com/Toufiq-7700/UIU-Research-Hub",
        demo: None,
        img: "assets/projects/P3.webp",
    },
    Project {
        title: "SmartWallet",
        category: "Full-Stack",
        badge: "Finance App",
        desc: "A personal finance app to track monthly expenses and manage budgets. Provides visual analytics, category breakdowns, and monthly summaries.",
        tags: &["PHP", "SQL", "JavaScript", "HTML", "CSS"],
        github: "https://github.com/Toufiq-7700/toufiq",
        demo: Some("https://myfreewallet.infinityfree.me/"),
        img: "assets/projects/P4.webp",
    },
];

const CATEGORIES: &[&str] = &["All", "Full-Stack"];

#[component]
pub fn Projects() -> impl IntoView {
    let (selected_category, set_selected_category) = signal("All");

    view! {
        <section class="section" id="projects" aria-label="Projects Portfolio">
            <div class="container">
                <div class="section__header">
                    <span class="section__tag">"Portfolio"</span>
                    <h2 class="section__title">"Featured " <span class="accent">"Projects"</span></h2>
                    <p class="section__desc">
                        "Selected works in full-stack web applications, competitive platforms, and research tools."
                    </p>
                </div>

                <div class="projects__tabs">
                    {CATEGORIES.iter().map(|&cat| {
                        let is_active = move || selected_category.get() == cat;
                        view! {
                            <button
                                class="projects__tab"
                                class:is-active=is_active
                                on:click=move |_| set_selected_category.set(cat)
                            >
                                {cat}
                            </button>
                        }
                    }).collect_view()}
                </div>

                <div class="projects__grid">
                    {PROJECTS_DATA.iter().map(|project| {
                        let cat = project.category;
                        let is_visible = move || {
                            let selected = selected_category.get();
                            selected == "All" || selected == cat
                        };

                        view! {
                            <div class="project-card" style:display=move || if is_visible() { "flex" } else { "none" }>
                                <div class="project-card__banner">
                                    <img
                                        class="project-card__img"
                                        src=project.img
                                        alt=project.title
                                        loading="lazy"
                                    />
                                    <div class="project-card__img-overlay" aria-hidden="true"></div>
                                    <span class="project-card__category">{project.badge}</span>
                                </div>
                                <div class="project-card__content">
                                    <h3 class="project-card__title">{project.title}</h3>
                                    <p class="project-card__desc">{project.desc}</p>
                                    <div class="project-card__tags">
                                        {project.tags.iter().map(|&tag| {
                                             view! { <span class="tech-tag">{tag}</span> }
                                        }).collect_view()}
                                    </div>
                                    <div class="project-card__actions">
                                        <a class="project-link" href=project.github target="_blank" rel="noopener">
                                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                            </svg>
                                            "Source Code"
                                        </a>
                                        {project.demo.map(|demo_url| {
                                            view! {
                                                <a class="project-link" href=demo_url target="_blank" rel="noopener">
                                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                                        <polyline points="15 3 21 3 21 9"/>
                                                        <line x1="10" y1="14" x2="21" y2="3"/>
                                                    </svg>
                                                    "Live Demo"
                                                </a>
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        }
                    }).collect_view()}
                </div>
            </div>
        </section>
    }
}
