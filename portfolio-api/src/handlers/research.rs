use axum::{extract::{Path, State}, Json};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{error::{AppError, AppResult}, middleware::AuthAdmin, models::*, AppState};

pub async fn list_public(State(state): State<AppState>) -> AppResult<Json<Value>> {
    let items: Vec<Research> = sqlx::query_as(
        "SELECT * FROM research WHERE is_published = true ORDER BY sort_order, year DESC",
    )
    .fetch_all(&state.db)
    .await?;
    Ok(Json(json!({ "data": items })))
}

pub async fn admin_list(State(state): State<AppState>, _: AuthAdmin) -> AppResult<Json<Value>> {
    let items: Vec<Research> = sqlx::query_as(
        "SELECT * FROM research ORDER BY sort_order, year DESC",
    )
    .fetch_all(&state.db)
    .await?;
    Ok(Json(json!({ "data": items })))
}

pub async fn admin_create(State(state): State<AppState>, _: AuthAdmin, Json(dto): Json<CreateResearchDto>) -> AppResult<Json<Value>> {
    if dto.title.trim().is_empty() { return Err(AppError::BadRequest("Title required".into())); }
    let id = Uuid::new_v4();
    sqlx::query(
        "INSERT INTO research (id, title, authors, publication, year, url, doi, abstract_text, status, sort_order, is_published) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
    )
    .bind(id)
    .bind(dto.title.trim())
    .bind(&dto.authors)
    .bind(&dto.publication)
    .bind(dto.year)
    .bind(&dto.url)
    .bind(&dto.doi)
    .bind(&dto.abstract_text)
    .bind(dto.status.as_deref().unwrap_or("published"))
    .bind(dto.sort_order.unwrap_or(0))
    .bind(dto.is_published.unwrap_or(true))
    .execute(&state.db)
    .await?;
    Ok(Json(json!({ "id": id, "message": "Research created" })))
}

pub async fn admin_update(State(state): State<AppState>, _: AuthAdmin, Path(id): Path<Uuid>, Json(dto): Json<UpdateResearchDto>) -> AppResult<Json<Value>> {
    sqlx::query(
        "UPDATE research SET title=COALESCE($1,title), authors=COALESCE($2,authors), publication=COALESCE($3,publication), year=COALESCE($4,year), url=COALESCE($5,url), doi=COALESCE($6,doi), abstract_text=COALESCE($7,abstract_text), status=COALESCE($8,status), sort_order=COALESCE($9,sort_order), is_published=COALESCE($10,is_published), updated_at=NOW() WHERE id=$11",
    )
    .bind(dto.title.as_deref())
    .bind(dto.authors.as_deref())
    .bind(dto.publication.as_deref())
    .bind(dto.year)
    .bind(dto.url.as_deref())
    .bind(dto.doi.as_deref())
    .bind(dto.abstract_text.as_deref())
    .bind(dto.status.as_deref())
    .bind(dto.sort_order)
    .bind(dto.is_published)
    .bind(id)
    .execute(&state.db)
    .await?;
    Ok(Json(json!({ "message": "Research updated" })))
}

pub async fn admin_delete(State(state): State<AppState>, _: AuthAdmin, Path(id): Path<Uuid>) -> AppResult<Json<Value>> {
    let r = sqlx::query("DELETE FROM research WHERE id = $1")
        .bind(id)
        .execute(&state.db)
        .await?;
    if r.rows_affected() == 0 { return Err(AppError::NotFound(format!("Research {id} not found"))); }
    Ok(Json(json!({ "message": "Research deleted" })))
}
