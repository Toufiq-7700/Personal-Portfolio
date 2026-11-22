use crate::components::about::About;
use leptos::prelude::*;

#[component]
pub fn AboutPage() -> impl IntoView {
    view! {
        <main class="page-main">
            <About/>
        </main>
    }
}
