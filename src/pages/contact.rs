use crate::components::contact::Contact;
use leptos::prelude::*;

#[component]
pub fn ContactPage() -> impl IntoView {
    view! {
        <main class="page-main">
            <Contact/>
        </main>
    }
}
