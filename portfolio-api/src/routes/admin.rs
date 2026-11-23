use axum::{routing::{get, post, put}, Router};

use crate::{
    auth,
    handlers::{achievements, education, experience, media, projects, research, skills, stats},
    AppState,
};

pub fn router() -> Router<AppState> {
    Router::new()
        // Auth
        .route("/api/admin/auth/login", post(auth::login))
        .route("/api/admin/auth/logout", post(auth::logout))
        .route("/api/admin/auth/me", get(auth::me))
        // Stats
        .route("/api/admin/stats", get(stats::admin_stats))
        // Projects
        .route("/api/admin/projects", get(projects::admin_list).post(projects::admin_create))
        .route("/api/admin/projects/:id", put(projects::admin_update).delete(projects::admin_delete))
        // Skills
        .route("/api/admin/skills", get(skills::admin_list).post(skills::admin_create))
        .route("/api/admin/skills/:id", put(skills::admin_update).delete(skills::admin_delete))
        // Achievements
        .route("/api/admin/achievements", get(achievements::admin_list).post(achievements::admin_create))
        .route("/api/admin/achievements/:id", put(achievements::admin_update).delete(achievements::admin_delete))
        // Education
        .route("/api/admin/education", get(education::admin_list).post(education::admin_create))
        .route("/api/admin/education/:id", put(education::admin_update).delete(education::admin_delete))
        // Experience
        .route("/api/admin/experience", get(experience::admin_list).post(experience::admin_create))
        .route("/api/admin/experience/:id", put(experience::admin_update).delete(experience::admin_delete))
        // Research
        .route("/api/admin/research", get(research::admin_list).post(research::admin_create))
        .route("/api/admin/research/:id", put(research::admin_update).delete(research::admin_delete))
        // Media
        .route("/api/admin/media", get(media::list).post(media::upload))
}
