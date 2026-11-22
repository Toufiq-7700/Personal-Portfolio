use crate::components::projects::Projects;
use leptos::prelude::*;

#[component]
pub fn ProjectsPage() -> impl IntoView {
    view! {
        <main class="page-main">
            <Projects/>
        </main>
    }
}
