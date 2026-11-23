use axum::{extract::{Path, State}, Json};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{error::{AppError, AppResult}, middleware::AuthAdmin, models::*, AppState};

pub async fn list_public(State(state): State<AppState>) -> AppResult<Json<Value>> {
    let items: Vec<Experience> = sqlx::query_as(
        "SELECT * FROM experience WHERE is_published = true ORDER BY sort_order, start_date DESC",
    )
    .fetch_all(&state.db)
    .await?;
    Ok(Json(json!({ "data": items })))
}

pub async fn admin_list(State(state): State<AppState>, _: AuthAdmin) -> AppResult<Json<Value>> {
    let items: Vec<Experience> = sqlx::query_as(
        "SELECT * FROM experience ORDER BY sort_order, start_date DESC",
    )
    .fetch_all(&state.db)
    .await?;
    Ok(Json(json!({ "data": items })))
}

pub async fn admin_create(State(state): State<AppState>, _: AuthAdmin, Json(dto): Json<CreateExperienceDto>) -> AppResult<Json<Value>> {
    if dto.company.trim().is_empty() || dto.role.trim().is_empty() {
        return Err(AppError::BadRequest("Company and role are required".into()));
    }
    let id = Uuid::new_v4();
    sqlx::query(
        "INSERT INTO experience (id, company, role, start_date, end_date, is_current, description, location, exp_type, sort_order, is_published) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
    )
    .bind(id)
    .bind(dto.company.trim())
    .bind(dto.role.trim())
    .bind(dto.start_date)
    .bind(dto.end_date)
    .bind(dto.is_current.unwrap_or(false))
    .bind(&dto.description)
    .bind(&dto.location)
    .bind(dto.exp_type.as_deref().unwrap_or("work"))
    .bind(dto.sort_order.unwrap_or(0))
    .bind(dto.is_published.unwrap_or(true))
    .execute(&state.db)
    .await?;
    Ok(Json(json!({ "id": id, "message": "Experience created" })))
}

pub async fn admin_update(State(state): State<AppState>, _: AuthAdmin, Path(id): Path<Uuid>, Json(dto): Json<UpdateExperienceDto>) -> AppResult<Json<Value>> {
    sqlx::query(
        "UPDATE experience SET company=COALESCE($1,company), role=COALESCE($2,role), start_date=COALESCE($3,start_date), end_date=COALESCE($4,end_date), is_current=COALESCE($5,is_current), description=COALESCE($6,description), location=COALESCE($7,location), exp_type=COALESCE($8,exp_type), sort_order=COALESCE($9,sort_order), is_published=COALESCE($10,is_published), updated_at=NOW() WHERE id=$11",
    )
    .bind(dto.company.as_deref())
    .bind(dto.role.as_deref())
    .bind(dto.start_date)
    .bind(dto.end_date)
    .bind(dto.is_current)
    .bind(dto.description.as_deref())
    .bind(dto.location.as_deref())
    .bind(dto.exp_type.as_deref())
    .bind(dto.sort_order)
    .bind(dto.is_published)
    .bind(id)
    .execute(&state.db)
    .await?;
    Ok(Json(json!({ "message": "Experience updated" })))
}

pub async fn admin_delete(State(state): State<AppState>, _: AuthAdmin, Path(id): Path<Uuid>) -> AppResult<Json<Value>> {
    let r = sqlx::query("DELETE FROM experience WHERE id = $1")
        .bind(id)
        .execute(&state.db)
        .await?;
    if r.rows_affected() == 0 { return Err(AppError::NotFound(format!("Experience {id} not found"))); }
    Ok(Json(json!({ "message": "Experience deleted" })))
}
