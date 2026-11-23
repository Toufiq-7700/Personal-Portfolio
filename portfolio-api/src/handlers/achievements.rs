use axum::{extract::{Path, State}, Json};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{error::{AppError, AppResult}, middleware::AuthAdmin, models::*, AppState};

pub async fn list_public(State(state): State<AppState>) -> AppResult<Json<Value>> {
    let items: Vec<Achievement> = sqlx::query_as(
        "SELECT * FROM achievements WHERE is_published = true ORDER BY sort_order, created_at DESC",
    )
    .fetch_all(&state.db)
    .await?;
    Ok(Json(json!({ "data": items })))
}

pub async fn admin_list(State(state): State<AppState>, _: AuthAdmin) -> AppResult<Json<Value>> {
    let items: Vec<Achievement> = sqlx::query_as(
        "SELECT * FROM achievements ORDER BY sort_order, created_at DESC",
    )
    .fetch_all(&state.db)
    .await?;
    Ok(Json(json!({ "data": items })))
}

pub async fn admin_create(State(state): State<AppState>, _: AuthAdmin, Json(dto): Json<CreateAchievementDto>) -> AppResult<Json<Value>> {
    if dto.title.trim().is_empty() { return Err(AppError::BadRequest("Title required".into())); }
    let id = Uuid::new_v4();
    sqlx::query(
        "INSERT INTO achievements (id, title, description, date, icon, sort_order, is_published) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    )
    .bind(id)
    .bind(dto.title.trim())
    .bind(&dto.description)
    .bind(dto.date)
    .bind(&dto.icon)
    .bind(dto.sort_order.unwrap_or(0))
    .bind(dto.is_published.unwrap_or(true))
    .execute(&state.db)
    .await?;
    Ok(Json(json!({ "id": id, "message": "Achievement created" })))
}

pub async fn admin_update(State(state): State<AppState>, _: AuthAdmin, Path(id): Path<Uuid>, Json(dto): Json<UpdateAchievementDto>) -> AppResult<Json<Value>> {
    sqlx::query(
        "UPDATE achievements SET title=COALESCE($1,title), description=COALESCE($2,description), date=COALESCE($3,date), icon=COALESCE($4,icon), sort_order=COALESCE($5,sort_order), is_published=COALESCE($6,is_published), updated_at=NOW() WHERE id=$7",
    )
    .bind(dto.title.as_deref())
    .bind(dto.description.as_deref())
    .bind(dto.date)
    .bind(dto.icon.as_deref())
    .bind(dto.sort_order)
    .bind(dto.is_published)
    .bind(id)
    .execute(&state.db)
    .await?;
    Ok(Json(json!({ "message": "Achievement updated" })))
}

pub async fn admin_delete(State(state): State<AppState>, _: AuthAdmin, Path(id): Path<Uuid>) -> AppResult<Json<Value>> {
    let r = sqlx::query("DELETE FROM achievements WHERE id = $1")
        .bind(id)
        .execute(&state.db)
        .await?;
    if r.rows_affected() == 0 { return Err(AppError::NotFound(format!("Achievement {id} not found"))); }
    Ok(Json(json!({ "message": "Achievement deleted" })))
}
