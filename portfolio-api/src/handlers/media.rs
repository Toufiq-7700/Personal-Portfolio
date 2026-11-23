use axum::{
    extract::{Multipart, State},
    Json,
};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{error::{AppError, AppResult}, middleware::AuthAdmin, models::MediaAsset, AppState};

pub async fn upload(
    State(state): State<AppState>,
    _: AuthAdmin,
    mut multipart: Multipart,
) -> AppResult<Json<Value>> {
    let mut uploaded = Vec::new();

    while let Some(field) = multipart.next_field().await.map_err(|e| AppError::BadRequest(e.to_string()))? {
        let filename = field.file_name()
            .unwrap_or("upload")
            .to_string();

        let content_type = field.content_type()
            .unwrap_or("application/octet-stream")
            .to_string();

        let data = field.bytes().await.map_err(|e| AppError::BadRequest(e.to_string()))?;
        let size = data.len() as i64;

        let key = format!("{}/{}", Uuid::new_v4(), &filename);
        let url = state.storage.upload(&key, data, &content_type).await
            .map_err(|e| AppError::Internal(e))?;

        let id = Uuid::new_v4();
        sqlx::query(
            "INSERT INTO media_assets (id, filename, original_name, url, mime_type, size_bytes, bucket, key) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
        )
        .bind(id)
        .bind(&key)
        .bind(&filename)
        .bind(&url)
        .bind(&content_type)
        .bind(size)
        .bind(&state.config.storage_bucket)
        .bind(&key)
        .execute(&state.db)
        .await?;

        uploaded.push(json!({ "id": id, "filename": filename, "url": url, "mime_type": content_type, "size_bytes": size }));
    }

    Ok(Json(json!({ "uploaded": uploaded })))
}

pub async fn list(State(state): State<AppState>, _: AuthAdmin) -> AppResult<Json<Value>> {
    let assets: Vec<MediaAsset> = sqlx::query_as(
        "SELECT id, filename, original_name, url, mime_type, size_bytes, bucket, key, uploaded_at FROM media_assets ORDER BY uploaded_at DESC",
    )
    .fetch_all(&state.db)
    .await?;

    let data: Vec<Value> = assets.iter().map(|r| json!({
        "id": r.id, "filename": r.filename, "original_name": r.original_name,
        "url": r.url, "mime_type": r.mime_type, "size_bytes": r.size_bytes,
        "uploaded_at": r.uploaded_at,
    })).collect();

    Ok(Json(json!({ "data": data })))
}
