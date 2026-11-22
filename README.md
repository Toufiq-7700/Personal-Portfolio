# TOUFIQ — Personal Portfolio 🦀⚡

A modern, high-performance personal portfolio website for an **AI Researcher & Systems Developer**, compiled to **WebAssembly (WASM)** using **Rust** and the **Leptos** framework with client-side multi-page routing.

---

## ✨ Features

- **🦀 Pure Rust + WebAssembly** — Fine-grained reactivity with zero virtual DOM overhead.
- **🧭 Multi-Page Client-Side Routing** — High-speed routing via `leptos_router` with dedicated pages:
  - `/` — **Landing & Overview** (Hero, About preview with stats, Featured Projects showcase, Skills snapshot, and Contact CTA).
  - `/about` — **About Toufiq** (Full educational background at UIU, personal story, achievements, and metrics).
  - `/skills` — **Skills & Expertise** (Interactive filterable category tabs with animated proficiency bars).
  - `/projects` — **Projects Showcase** (Full projects catalog with tech tags, live demo links, and GitHub repositories).
  - `/contact` — **Contact Page** (Direct messaging form with validation, social channels, and info).
- **🎬 Animated Splash Intro** — Smooth "WELCOME TOUFIQ." intro that dynamically unrolls into the main portfolio.
- **⚡ Rust-Native Typewriter** — Precise asynchronous character cycling without external JS libraries.
- **📱 Responsive & Mobile-Ready** — Mobile hamburger menu, flexible layout, and fluid typography.
- **🎨 Warm Aesthetic Theme** — Carefully curated color palette featuring warm cream, deep near-black, and rich maroon accents.
- **👤 Interactive Portrait Card** — Showcase photo with hover zoom, floating status badge, offset accent frame, and ambient motion.
- **🔗 Smart Navigation** — Header and overview CTAs navigate between dedicated pages with automatic scroll-to-top on route change.

---

## 🛠️ Tech Stack

- **Core Language:** [Rust](https://www.rust-lang.org/) (compiled to `wasm32-unknown-unknown`)
- **Frontend Framework:** [Leptos](https://leptos.dev/) (CSR mode, fine-grained reactivity)
- **Routing:** [leptos_router](https://crates.io/crates/leptos_router) (Client-Side Routing)
- **WASM Bundler & Dev Server:** [Trunk](https://trunkrs.dev/)
- **Browser APIs:** `web-sys`, `wasm-bindgen`, `gloo-timers`
- **Typography:** Google Fonts ([Montserrat](https://fonts.google.com/specimen/Montserrat))
- **Styling:** Modular CSS architecture with design tokens

---

## 📁 Project Structure

```text
Personal-Portfolio/
├── Cargo.toml                  # Rust project manifest & dependencies
├── Trunk.toml                  # Trunk build & bundling config
├── index.html                  # Trunk HTML template with CSS asset links
├── assets/                     # Visual assets, projects & PDF resume
│   ├── images/
│   ├── projects/
│   └── Toufiqq.pdf
├── style/                      # Modular CSS design system
│   ├── variables.css
│   ├── base.css
│   ├── splash.css
│   ├── nav.css
│   ├── hero.css
│   ├── monitor.css
│   ├── sections.css
│   ├── home.css
│   ├── about.css
│   ├── skills.css
│   ├── projects.css
│   ├── contact.css
│   └── footer.css
├── src/                        # Rust application source code
│   ├── main.rs                 # WebAssembly entry point
│   ├── app.rs                  # Root App component with <Router> and <Routes>
│   ├── pages/                  # Dedicated multi-page route views
│   │   ├── mod.rs
│   │   ├── home.rs             # Landing page with preview sections & CTAs
│   │   ├── about.rs            # Dedicated About page
│   │   ├── skills.rs           # Dedicated Skills page
│   │   ├── projects.rs         # Dedicated Projects page
│   │   └── contact.rs          # Dedicated Contact page
│   ├── components/             # Reusable UI components
│   │   ├── splash.rs
│   │   ├── nav.rs
│   │   ├── hero.rs
│   │   ├── about.rs
│   │   ├── skills.rs
│   │   ├── projects.rs
│   │   ├── contact.rs
│   │   └── footer.rs
│   └── utils/                  # Rust helpers
│       ├── scroll.rs           # Smooth scroll helper
│       └── typewriter.rs       # Pure Rust typewriter state machine
└── legacy/                     # Archived original vanilla HTML/CSS/JS
```

---

## 🚀 Running the Project

### Prerequisites
Make sure Rust and the WebAssembly target are installed:
```bash
rustup target add wasm32-unknown-unknown
```

### Development (Hot-Reload)
Run the Trunk development server:
```bash
trunk serve
```
Then navigate to `http://localhost:8080`.

### Production Build
Build an optimized distribution package:
```bash
trunk build --release
```
The optimized static bundle (HTML, WASM, CSS, assets) will be generated in the `dist/` directory, ready to deploy to any static host (GitHub Pages, Vercel, Netlify, Cloudflare Pages).
