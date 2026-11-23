use axum::{
    async_trait,
    extract::FromRequestParts,
    http::request::Parts,
};
use axum_extra::extract::CookieJar;
use uuid::Uuid;

use crate::{error::AppError, AppState};

/// Extractor: validates session cookie and returns the admin's UUID
pub struct AuthAdmin(pub Uuid);

#[async_trait]
impl FromRequestParts<AppState> for AuthAdmin {
    type Rejection = AppError;

    async fn from_request_parts(parts: &mut Parts, state: &AppState) -> Result<Self, Self::Rejection> {
        let jar = CookieJar::from_request_parts(parts, state).await.unwrap();

        let session_id = jar
            .get("session_id")
            .map(|c| c.value().to_string())
            .ok_or(AppError::Unauthorized)?;

        let session_uuid = Uuid::parse_str(&session_id).map_err(|_| AppError::Unauthorized)?;

        let now = chrono::Utc::now();
        let row: Option<(Uuid,)> = sqlx::query_as(
            "SELECT admin_id FROM sessions WHERE id = $1 AND expires_at > $2",
        )
        .bind(session_uuid)
        .bind(now)
        .fetch_optional(&state.db)
        .await
        .map_err(|e| AppError::Internal(e.into()))?;

        match row {
            Some((admin_id,)) => Ok(AuthAdmin(admin_id)),
            None => Err(AppError::Unauthorized),
        }
    }
}
