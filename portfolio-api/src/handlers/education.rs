use axum::{extract::{Path, State}, Json};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{error::{AppError, AppResult}, middleware::AuthAdmin, models::*, AppState};

pub async fn list_public(State(state): State<AppState>) -> AppResult<Json<Value>> {
    let items: Vec<Education> = sqlx::query_as(
        "SELECT * FROM education WHERE is_published = true ORDER BY sort_order, start_date DESC",
    )
    .fetch_all(&state.db)
    .await?;
    Ok(Json(json!({ "data": items })))
}

pub async fn admin_list(State(state): State<AppState>, _: AuthAdmin) -> AppResult<Json<Value>> {
    let items: Vec<Education> = sqlx::query_as(
        "SELECT * FROM education ORDER BY sort_order, start_date DESC",
    )
    .fetch_all(&state.db)
    .await?;
    Ok(Json(json!({ "data": items })))
}

pub async fn admin_create(State(state): State<AppState>, _: AuthAdmin, Json(dto): Json<CreateEducationDto>) -> AppResult<Json<Value>> {
    if dto.institution.trim().is_empty() { return Err(AppError::BadRequest("Institution required".into())); }
    let id = Uuid::new_v4();
    sqlx::query(
        "INSERT INTO education (id, institution, degree, field, start_date, end_date, is_current, description, gpa, sort_order, is_published) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
    )
    .bind(id)
    .bind(dto.institution.trim())
    .bind(&dto.degree)
    .bind(&dto.field)
    .bind(dto.start_date)
    .bind(dto.end_date)
    .bind(dto.is_current.unwrap_or(false))
    .bind(&dto.description)
    .bind(&dto.gpa)
    .bind(dto.sort_order.unwrap_or(0))
    .bind(dto.is_published.unwrap_or(true))
    .execute(&state.db)
    .await?;
    Ok(Json(json!({ "id": id, "message": "Education created" })))
}

pub async fn admin_update(State(state): State<AppState>, _: AuthAdmin, Path(id): Path<Uuid>, Json(dto): Json<UpdateEducationDto>) -> AppResult<Json<Value>> {
    sqlx::query(
        "UPDATE education SET institution=COALESCE($1,institution), degree=COALESCE($2,degree), field=COALESCE($3,field), start_date=COALESCE($4,start_date), end_date=COALESCE($5,end_date), is_current=COALESCE($6,is_current), description=COALESCE($7,description), gpa=COALESCE($8,gpa), sort_order=COALESCE($9,sort_order), is_published=COALESCE($10,is_published), updated_at=NOW() WHERE id=$11",
    )
    .bind(dto.institution.as_deref())
    .bind(dto.degree.as_deref())
    .bind(dto.field.as_deref())
    .bind(dto.start_date)
    .bind(dto.end_date)
    .bind(dto.is_current)
    .bind(dto.description.as_deref())
    .bind(dto.gpa.as_deref())
    .bind(dto.sort_order)
    .bind(dto.is_published)
    .bind(id)
    .execute(&state.db)
    .await?;
    Ok(Json(json!({ "message": "Education updated" })))
}

pub async fn admin_delete(State(state): State<AppState>, _: AuthAdmin, Path(id): Path<Uuid>) -> AppResult<Json<Value>> {
    let r = sqlx::query("DELETE FROM education WHERE id = $1")
        .bind(id)
        .execute(&state.db)
        .await?;
    if r.rows_affected() == 0 { return Err(AppError::NotFound(format!("Education {id} not found"))); }
    Ok(Json(json!({ "message": "Education deleted" })))
}
