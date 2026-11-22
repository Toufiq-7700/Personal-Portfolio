use crate::components::skills::Skills;
use leptos::prelude::*;

#[component]
pub fn SkillsPage() -> impl IntoView {
    view! {
        <main class="page-main">
            <Skills/>
        </main>
    }
}
