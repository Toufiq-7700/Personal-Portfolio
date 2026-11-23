use axum::{
    extract::{Path, Query, State},
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
struct ProjectRow {
    pub id: Uuid,
    pub title: String,
    pub slug: String,
    pub short_desc: Option<String>,
    pub long_desc: Option<String>,
    pub category: Option<String>,
    pub badge: Option<String>,
    pub github_url: Option<String>,
    pub demo_url: Option<String>,
    pub thumbnail_url: Option<String>,
    pub is_featured: bool,
    pub status: String,
    pub sort_order: i32,
    pub created_at: chrono::DateTime<chrono::Utc>,
    pub updated_at: chrono::DateTime<chrono::Utc>,
    pub tags: Vec<String>,
}

pub async fn list_public(
    State(state): State<AppState>,
    Query(_q): Query<PaginationQuery>,
) -> AppResult<Json<Value>> {
    let projects: Vec<ProjectRow> = sqlx::query_as(
        r#"SELECT p.id, p.title, p.slug, p.short_desc, p.long_desc,
                  p.category, p.badge, p.github_url, p.demo_url,
                  p.thumbnail_url, p.is_featured, p.status, p.sort_order,
                  p.created_at, p.updated_at,
                  COALESCE(array_agg(pt.tag) FILTER (WHERE pt.tag IS NOT NULL), ARRAY[]::text[]) as tags
           FROM projects p
           LEFT JOIN project_tags pt ON pt.project_id = p.id
           WHERE p.status = 'published'
           GROUP BY p.id
           ORDER BY p.sort_order ASC, p.created_at DESC"#,
    )
    .fetch_all(&state.db)
    .await?;

    let result: Vec<Value> = projects.iter().map(|r| json!({
        "id": r.id,
        "title": r.title,
        "slug": r.slug,
        "short_desc": r.short_desc,
        "long_desc": r.long_desc,
        "category": r.category,
        "badge": r.badge,
        "github_url": r.github_url,
        "demo_url": r.demo_url,
        "thumbnail_url": r.thumbnail_url,
        "is_featured": r.is_featured,
        "status": r.status,
        "sort_order": r.sort_order,
        "created_at": r.created_at,
        "updated_at": r.updated_at,
        "tags": r.tags,
    })).collect();

    Ok(Json(json!({ "data": result, "total": result.len() })))
}

pub async fn get_public_by_slug(
    State(state): State<AppState>,
    Path(slug): Path<String>,
) -> AppResult<Json<Value>> {
    let r: Option<ProjectRow> = sqlx::query_as(
        r#"SELECT p.id, p.title, p.slug, p.short_desc, p.long_desc,
                  p.category, p.badge, p.github_url, p.demo_url,
                  p.thumbnail_url, p.is_featured, p.status, p.sort_order,
                  p.created_at, p.updated_at,
                  COALESCE(array_agg(pt.tag) FILTER (WHERE pt.tag IS NOT NULL), ARRAY[]::text[]) as tags
           FROM projects p
           LEFT JOIN project_tags pt ON pt.project_id = p.id
           WHERE p.slug = $1 AND p.status = 'published'
           GROUP BY p.id"#,
    )
    .bind(&slug)
    .fetch_optional(&state.db)
    .await?;

    let r = r.ok_or_else(|| AppError::NotFound(format!("Project '{slug}' not found")))?;

    Ok(Json(json!({
        "id": r.id, "title": r.title, "slug": r.slug,
        "short_desc": r.short_desc, "long_desc": r.long_desc,
        "category": r.category, "badge": r.badge,
        "github_url": r.github_url, "demo_url": r.demo_url,
        "thumbnail_url": r.thumbnail_url, "is_featured": r.is_featured,
        "status": r.status, "sort_order": r.sort_order,
        "created_at": r.created_at, "updated_at": r.updated_at,
        "tags": r.tags,
    })))
}

pub async fn admin_list(
    State(state): State<AppState>,
    _: AuthAdmin,
    Query(q): Query<PaginationQuery>,
) -> AppResult<Json<Value>> {
    let page = q.page.unwrap_or(1).max(1);
    let per_page = q.per_page.unwrap_or(20).min(100);
    let offset = (page - 1) * per_page;

    let projects: Vec<ProjectRow> = sqlx::query_as(
        r#"SELECT p.id, p.title, p.slug, p.short_desc, p.long_desc,
                  p.category, p.badge, p.github_url, p.demo_url,
                  p.thumbnail_url, p.is_featured, p.status, p.sort_order,
                  p.created_at, p.updated_at,
                  COALESCE(array_agg(pt.tag) FILTER (WHERE pt.tag IS NOT NULL), ARRAY[]::text[]) as tags
           FROM projects p
           LEFT JOIN project_tags pt ON pt.project_id = p.id
           GROUP BY p.id
           ORDER BY p.sort_order ASC, p.created_at DESC
           LIMIT $1 OFFSET $2"#,
    )
    .bind(per_page)
    .bind(offset)
    .fetch_all(&state.db)
    .await?;

    let total: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM projects")
        .fetch_one(&state.db)
        .await?;

    let data: Vec<Value> = projects.iter().map(|r| json!({
        "id": r.id, "title": r.title, "slug": r.slug,
        "short_desc": r.short_desc, "long_desc": r.long_desc,
        "category": r.category, "badge": r.badge,
        "github_url": r.github_url, "demo_url": r.demo_url,
        "thumbnail_url": r.thumbnail_url, "is_featured": r.is_featured,
        "status": r.status, "sort_order": r.sort_order,
        "created_at": r.created_at, "updated_at": r.updated_at,
        "tags": r.tags,
    })).collect();

    Ok(Json(json!({
        "data": data,
        "total": total.0,
        "page": page,
        "per_page": per_page,
        "total_pages": (total.0 as f64 / per_page as f64).ceil() as i64,
    })))
}

pub async fn admin_create(
    State(state): State<AppState>,
    _: AuthAdmin,
    Json(dto): Json<CreateProjectDto>,
) -> AppResult<Json<Value>> {
    if dto.title.trim().is_empty() {
        return Err(AppError::BadRequest("Title is required".into()));
    }

    let slug = dto.slug.unwrap_or_else(|| slugify(&dto.title));
    let id = Uuid::new_v4();

    sqlx::query(
        r#"INSERT INTO projects (id, title, slug, short_desc, long_desc, category, badge,
                                 github_url, demo_url, thumbnail_url, is_featured, status, sort_order)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)"#,
    )
    .bind(id)
    .bind(dto.title.trim())
    .bind(&slug)
    .bind(&dto.short_desc)
    .bind(&dto.long_desc)
    .bind(&dto.category)
    .bind(&dto.badge)
    .bind(&dto.github_url)
    .bind(&dto.demo_url)
    .bind(&dto.thumbnail_url)
    .bind(dto.is_featured.unwrap_or(false))
    .bind(dto.status.as_deref().unwrap_or("draft"))
    .bind(dto.sort_order.unwrap_or(0))
    .execute(&state.db)
    .await?;

    if let Some(tags) = dto.tags {
        for tag in tags {
            sqlx::query("INSERT INTO project_tags (project_id, tag) VALUES ($1, $2) ON CONFLICT DO NOTHING")
                .bind(id)
                .bind(tag)
                .execute(&state.db)
                .await?;
        }
    }

    Ok(Json(json!({ "id": id, "message": "Project created" })))
}

pub async fn admin_update(
    State(state): State<AppState>,
    _: AuthAdmin,
    Path(id): Path<Uuid>,
    Json(dto): Json<UpdateProjectDto>,
) -> AppResult<Json<Value>> {
    let existing: Option<(Uuid,)> = sqlx::query_as("SELECT id FROM projects WHERE id = $1")
        .bind(id)
        .fetch_optional(&state.db)
        .await?;

    if existing.is_none() {
        return Err(AppError::NotFound(format!("Project {id} not found")));
    }

    sqlx::query(
        r#"UPDATE projects SET
            title = COALESCE($1, title),
            slug = COALESCE($2, slug),
            short_desc = COALESCE($3, short_desc),
            long_desc = COALESCE($4, long_desc),
            category = COALESCE($5, category),
            badge = COALESCE($6, badge),
            github_url = COALESCE($7, github_url),
            demo_url = COALESCE($8, demo_url),
            thumbnail_url = COALESCE($9, thumbnail_url),
            is_featured = COALESCE($10, is_featured),
            status = COALESCE($11, status),
            sort_order = COALESCE($12, sort_order),
            updated_at = NOW()
           WHERE id = $13"#,
    )
    .bind(dto.title.as_deref())
    .bind(dto.slug.as_deref())
    .bind(dto.short_desc.as_deref())
    .bind(dto.long_desc.as_deref())
    .bind(dto.category.as_deref())
    .bind(dto.badge.as_deref())
    .bind(dto.github_url.as_deref())
    .bind(dto.demo_url.as_deref())
    .bind(dto.thumbnail_url.as_deref())
    .bind(dto.is_featured)
    .bind(dto.status.as_deref())
    .bind(dto.sort_order)
    .bind(id)
    .execute(&state.db)
    .await?;

    if let Some(tags) = dto.tags {
        sqlx::query("DELETE FROM project_tags WHERE project_id = $1")
            .bind(id)
            .execute(&state.db)
            .await?;
        for tag in tags {
            sqlx::query("INSERT INTO project_tags (project_id, tag) VALUES ($1, $2) ON CONFLICT DO NOTHING")
                .bind(id)
                .bind(tag)
                .execute(&state.db)
                .await?;
        }
    }

    Ok(Json(json!({ "message": "Project updated" })))
}

pub async fn admin_delete(
    State(state): State<AppState>,
    _: AuthAdmin,
    Path(id): Path<Uuid>,
) -> AppResult<Json<Value>> {
    let result = sqlx::query("DELETE FROM projects WHERE id = $1")
        .bind(id)
        .execute(&state.db)
        .await?;

    if result.rows_affected() == 0 {
        return Err(AppError::NotFound(format!("Project {id} not found")));
    }

    Ok(Json(json!({ "message": "Project deleted" })))
}

fn slugify(s: &str) -> String {
    s.to_lowercase()
        .chars()
        .map(|c| if c.is_alphanumeric() { c } else { '-' })
        .collect::<String>()
        .split('-')
        .filter(|s| !s.is_empty())
        .collect::<Vec<_>>()
        .join("-")
}
