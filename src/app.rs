use crate::components::footer::Footer;
use crate::components::nav::Nav;
use crate::components::splash::Splash;
use crate::pages::about::AboutPage;
use crate::pages::contact::ContactPage;
use crate::pages::home::HomePage;
use crate::pages::projects::ProjectsPage;
use crate::pages::skills::SkillsPage;
use leptos::prelude::*;
use leptos_router::components::{Route, Router, Routes};
use leptos_router::path;

#[component]
pub fn App() -> impl IntoView {
    let (splash_done, set_splash_done) = signal(false);

    let on_splash_finish = Callback::new(move |()| {
        set_splash_done.set(true);
        if let Some(window) = web_sys::window() {
            if let Some(document) = window.document() {
                if let Some(body) = document.body() {
                    let _ = body.class_list().add_1("ready");
                }
            }
        }
    });

    view! {
        {move || (!splash_done.get()).then(|| view! { <Splash on_finish=on_splash_finish/> })}
        {move || splash_done.get().then(|| view! {
            <Router>
                <div class="site-wrapper">
                    <Nav/>
                    <Routes fallback=|| view! {
                        <main class="page-main not-found">
                            <div class="container">
                                <h1>"404"</h1>
                                <p>"Page not found."</p>
                            </div>
                        </main>
                    }>
                        <Route path=path!("/") view=HomePage/>
                        <Route path=path!("/about") view=AboutPage/>
                        <Route path=path!("/skills") view=SkillsPage/>
                        <Route path=path!("/projects") view=ProjectsPage/>
                        <Route path=path!("/contact") view=ContactPage/>
                    </Routes>
                    <Footer/>
                </div>
            </Router>
        })}
    }
}
