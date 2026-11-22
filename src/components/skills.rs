use leptos::prelude::*;

struct Skill {
    name: &'static str,
    category: &'static str,
    tag: &'static str,
    desc: &'static str,
    level: u8,
}

const SKILLS_DATA: &[Skill] = &[
    Skill {
        name: "C++",
        category: "Languages",
        tag: "Core",
        desc: "Data structures, algorithms, competitive programming and low-level systems implementation.",
        level: 88,
    },
    Skill {
        name: "C",
        category: "Languages",
        tag: "Systems",
        desc: "Memory management, pointers, embedded systems programming and low-level computing.",
        level: 85,
    },
    Skill {
        name: "Java",
        category: "Languages",
        tag: "OOP",
        desc: "Object-oriented programming, collections framework, and application development.",
        level: 80,
    },
    Skill {
        name: "Python",
        category: "Languages",
        tag: "AI/ML",
        desc: "AI/ML development, scripting, data analysis, and scientific computing.",
        level: 90,
    },
    Skill {
        name: "JavaScript",
        category: "Web & DB",
        tag: "Frontend",
        desc: "DOM manipulation, ES6+, async programming, and interactive web interfaces.",
        level: 85,
    },
    Skill {
        name: "TypeScript",
        category: "Web & DB",
        tag: "Typed JS",
        desc: "Type-safe JavaScript for scalable, maintainable web applications and backends.",
        level: 78,
    },
    Skill {
        name: "PHP",
        category: "Web & DB",
        tag: "Backend",
        desc: "Server-side scripting, REST APIs, and backend web application development.",
        level: 82,
    },
    Skill {
        name: "HTML & CSS",
        category: "Web & DB",
        tag: "Markup",
        desc: "Semantic HTML5, modern CSS3, flexbox/grid layouts, and responsive design.",
        level: 90,
    },
    Skill {
        name: "MySQL",
        category: "Web & DB",
        tag: "Database",
        desc: "Relational database design, queries, indexing, and data management.",
        level: 83,
    },
    Skill {
        name: "NumPy",
        category: "Python Libraries",
        tag: "Data",
        desc: "Numerical computing, array operations, linear algebra, and mathematical computations.",
        level: 85,
    },
    Skill {
        name: "Pandas",
        category: "Python Libraries",
        tag: "Data",
        desc: "Data manipulation, cleaning, analysis and working with structured datasets.",
        level: 83,
    },
    Skill {
        name: "scikit-learn",
        category: "Python Libraries",
        tag: "ML",
        desc: "Machine learning models, classification, regression, clustering, and model evaluation.",
        level: 78,
    },
    Skill {
        name: "Problem Solving & DSA",
        category: "Core Strength",
        tag: "Competitive",
        desc: "Algorithmic thinking, data structures, complexity analysis, and competitive programming.",
        level: 90,
    },
    Skill {
        name: "Figma",
        category: "Core Strength",
        tag: "Design",
        desc: "UI/UX design, prototyping, component design and wireframing for web applications.",
        level: 72,
    },
];

const CATEGORIES: &[&str] = &["All", "Languages", "Web & DB", "Python Libraries", "Core Strength"];

#[component]
pub fn Skills() -> impl IntoView {
    let (selected_category, set_selected_category) = signal("All");

    view! {
        <section class="section" id="skills" aria-label="Skills & Expertise">
            <div class="container">
                <div class="section__header">
                    <span class="section__tag">"Capabilities"</span>
                    <h2 class="section__title">"Technical " <span class="accent">"Skills"</span></h2>
                    <p class="section__desc">
                        "My toolkit — from low-level systems programming to AI/ML libraries and full-stack web development."
                    </p>
                </div>

                <div class="skills__tabs">
                    {CATEGORIES.iter().map(|&cat| {
                        view! {
                            <button
                                class="skills__tab"
                                class:is-active=move || selected_category.get() == cat
                                on:click=move |_| set_selected_category.set(cat)>
                                {cat}
                            </button>
                        }
                    }).collect_view()}
                </div>

                <div class="skills__grid">
                    {SKILLS_DATA.iter().map(|skill| {
                        let cat = skill.category;
                        let is_visible = move || {
                            let selected = selected_category.get();
                            selected == "All" || selected == cat
                        };

                        view! {
                            <div class="skill-card" style:display=move || if is_visible() { "flex" } else { "none" }>
                                <div class="skill-card__header">
                                    <h3 class="skill-card__name">{skill.name}</h3>
                                    <span class="skill-card__tag">{skill.tag}</span>
                                </div>
                                <p class="skill-card__desc">{skill.desc}</p>
                                <div class="skill-card__bar-wrap">
                                    <div class="skill-card__bar" style:width=format!("{}%", skill.level)></div>
                                </div>
                            </div>
                        }
                    }).collect_view()}
                </div>
            </div>
        </section>
    }
}
