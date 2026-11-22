use leptos::prelude::*;

#[component]
pub fn Splash(on_finish: Callback<()>) -> impl IntoView {
    let (exiting, set_exiting) = signal(false);

    // After intro animation, trigger exit transition
    gloo_timers::callback::Timeout::new(1400, move || {
        set_exiting.set(true);
        // After exit transition finishes, notify parent
        gloo_timers::callback::Timeout::new(750, move || {
            on_finish.run(());
        })
        .forget();
    })
    .forget();

    view! {
        <div id="splash" class:splash--exit=move || exiting.get() role="status" aria-label="Loading">
            <span class="splash__label">"Welcome"</span>
            <p class="splash__name">"TOUFIQ"<span class="dot">"."</span></p>
        </div>
    }
}
