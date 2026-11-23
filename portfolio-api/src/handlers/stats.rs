use axum::{extract::State, Json};
use serde_json::{json, Value};

use crate::{error::AppResult, middleware::AuthAdmin, AppState};

pub async fn admin_stats(State(state): State<AppState>, _: AuthAdmin) -> AppResult<Json<Value>> {
    let projects_total: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM projects")
        .fetch_one(&state.db).await?;
    let projects_published: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM projects WHERE status='published'")
        .fetch_one(&state.db).await?;
    let skills_total: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM skills")
        .fetch_one(&state.db).await?;
    let achievements_total: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM achievements")
        .fetch_one(&state.db).await?;
    let education_total: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM education")
        .fetch_one(&state.db).await?;
    let experience_total: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM experience")
        .fetch_one(&state.db).await?;
    let research_total: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM research")
        .fetch_one(&state.db).await?;
    let media_total: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM media_assets")
        .fetch_one(&state.db).await?;

    Ok(Json(json!({
        "projects": { "total": projects_total.0, "published": projects_published.0 },
        "skills": skills_total.0,
        "achievements": achievements_total.0,
        "education": education_total.0,
        "experience": experience_total.0,
        "research": research_total.0,
        "media": media_total.0,
    })))
}
