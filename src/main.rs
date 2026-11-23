mod app;
mod components;
mod pages;
mod utils;

#[cfg(target_arch = "wasm32")]
use app::App;
#[cfg(target_arch = "wasm32")]
use leptos::mount::mount_to_body;

#[cfg(target_arch = "wasm32")]
fn main() {
    console_error_panic_hook::set_once();
    let _ = console_log::init_with_level(log::Level::Debug);
    mount_to_body(App);
}

#[cfg(not(target_arch = "wasm32"))]
fn main() {
    println!("========================================================");
    println!("Toufiq Portfolio - Leptos WebAssembly Application");
    println!("========================================================");
    println!("This frontend is compiled to WebAssembly for the browser.");
    println!();
    println!("To start this portfolio in your browser:");
    println!("  $ trunk serve --port 8080");
    println!();
    println!("Or to run the Next.js CMS portfolio:");
    println!("  $ cd portfolio-cms && npm run dev");
    println!("========================================================");
}

