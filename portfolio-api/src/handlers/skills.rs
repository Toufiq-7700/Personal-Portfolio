use axum::{
    extract::{Path, State},
    Json,
};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{
    error::{AppError, AppResult},
    middleware::AuthAdmin,
    models::*,
    AppState,
};

#[derive(sqlx::FromRow)]
struct SkillRow {
    pub id: Uuid,
    pub name: String,
    pub category_id: Option<Uuid>,
    pub category_name: Option<String>,
    pub tag: Option<String>,
    pub description: Option<String>,
    pub level: i16,
    pub sort_order: i32,
    pub is_published: bool,
    pub created_at: chrono::DateTime<chrono::Utc>,
    pub updated_at: chrono::DateTime<chrono::Utc>,
}

pub async fn list_public(State(state): State<AppState>) -> AppResult<Json<Value>> {
    let skills: Vec<SkillRow> = sqlx::query_as(
        r#"SELECT s.id, s.name, s.category_id, sc.name as category_name,
                  s.tag, s.description, s.level, s.sort_order, s.is_published,
                  s.created_at, s.updated_at
           FROM skills s
           LEFT JOIN skill_categories sc ON sc.id = s.category_id
           WHERE s.is_published = true
           ORDER BY sc.sort_order, s.sort_order"#,
    )
    .fetch_all(&state.db)
    .await?;

    let categories: Vec<SkillCategory> = sqlx::query_as(
        "SELECT id, name, sort_order FROM skill_categories ORDER BY sort_order",
    )
    .fetch_all(&state.db)
    .await?;

    let data: Vec<Value> = skills.iter().map(|r| json!({
        "id": r.id, "name": r.name,
        "category_id": r.category_id, "category_name": r.category_name,
        "tag": r.tag, "description": r.description,
        "level": r.level, "sort_order": r.sort_order,
    })).collect();

    Ok(Json(json!({ "data": data, "categories": categories })))
}

pub async fn admin_list(
    State(state): State<AppState>,
    _: AuthAdmin,
) -> AppResult<Json<Value>> {
    let skills: Vec<SkillRow> = sqlx::query_as(
        r#"SELECT s.id, s.name, s.category_id, sc.name as category_name,
                  s.tag, s.description, s.level, s.sort_order, s.is_published,
                  s.created_at, s.updated_at
           FROM skills s
           LEFT JOIN skill_categories sc ON sc.id = s.category_id
           ORDER BY sc.sort_order, s.sort_order"#,
    )
    .fetch_all(&state.db)
    .await?;

    let data: Vec<Value> = skills.iter().map(|r| json!({
        "id": r.id, "name": r.name,
        "category_id": r.category_id, "category_name": r.category_name,
        "tag": r.tag, "description": r.description,
        "level": r.level, "sort_order": r.sort_order,
        "is_published": r.is_published,
        "created_at": r.created_at, "updated_at": r.updated_at,
    })).collect();

    Ok(Json(json!({ "data": data })))
}

pub async fn admin_create(
    State(state): State<AppState>,
    _: AuthAdmin,
    Json(dto): Json<CreateSkillDto>,
) -> AppResult<Json<Value>> {
    if dto.name.trim().is_empty() {
        return Err(AppError::BadRequest("Name is required".into()));
    }

    let id = Uuid::new_v4();
    sqlx::query(
        r#"INSERT INTO skills (id, name, category_id, tag, description, level, sort_order, is_published)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)"#,
    )
    .bind(id)
    .bind(dto.name.trim())
    .bind(dto.category_id)
    .bind(&dto.tag)
    .bind(&dto.description)
    .bind(dto.level.unwrap_or(0))
    .bind(dto.sort_order.unwrap_or(0))
    .bind(dto.is_published.unwrap_or(true))
    .execute(&state.db)
    .await?;

    Ok(Json(json!({ "id": id, "message": "Skill created" })))
}

pub async fn admin_update(
    State(state): State<AppState>,
    _: AuthAdmin,
    Path(id): Path<Uuid>,
    Json(dto): Json<UpdateSkillDto>,
) -> AppResult<Json<Value>> {
    sqlx::query(
        r#"UPDATE skills SET
            name = COALESCE($1, name),
            category_id = COALESCE($2, category_id),
            tag = COALESCE($3, tag),
            description = COALESCE($4, description),
            level = COALESCE($5, level),
            sort_order = COALESCE($6, sort_order),
            is_published = COALESCE($7, is_published),
            updated_at = NOW()
           WHERE id = $8"#,
    )
    .bind(dto.name.as_deref())
    .bind(dto.category_id)
    .bind(dto.tag.as_deref())
    .bind(dto.description.as_deref())
    .bind(dto.level)
    .bind(dto.sort_order)
    .bind(dto.is_published)
    .bind(id)
    .execute(&state.db)
    .await?;

    Ok(Json(json!({ "message": "Skill updated" })))
}

pub async fn admin_delete(
    State(state): State<AppState>,
    _: AuthAdmin,
    Path(id): Path<Uuid>,
) -> AppResult<Json<Value>> {
    let result = sqlx::query("DELETE FROM skills WHERE id = $1")
        .bind(id)
        .execute(&state.db)
        .await?;

    if result.rows_affected() == 0 {
        return Err(AppError::NotFound(format!("Skill {id} not found")));
    }

    Ok(Json(json!({ "message": "Skill deleted" })))
}
