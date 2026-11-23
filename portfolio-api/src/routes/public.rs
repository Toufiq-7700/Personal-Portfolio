use axum::{routing::get, Router};
use serde_json::json;

use crate::{
    handlers::{achievements, education, experience, projects, research, skills},
    AppState,
};

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/api/health", get(health))
        .route("/api/projects", get(projects::list_public))
        .route("/api/projects/:slug", get(projects::get_public_by_slug))
        .route("/api/skills", get(skills::list_public))
        .route("/api/achievements", get(achievements::list_public))
        .route("/api/education", get(education::list_public))
        .route("/api/experience", get(experience::list_public))
        .route("/api/research", get(research::list_public))
}

async fn health() -> axum::Json<serde_json::Value> {
    axum::Json(json!({ "status": "ok", "service": "portfolio-api" }))
}
