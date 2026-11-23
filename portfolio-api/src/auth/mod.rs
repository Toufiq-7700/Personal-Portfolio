use argon2::{Argon2, PasswordHash, PasswordHasher, PasswordVerifier};
use argon2::password_hash::{SaltString, rand_core::OsRng};
use axum::{extract::State, Json};
use axum_extra::extract::cookie::{Cookie, CookieJar, SameSite};
use chrono::Utc;
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{
    error::{AppError, AppResult},
    middleware::AuthAdmin,
    models::{AdminUser, AdminUserPublic, LoginDto},
    AppState,
};

pub async fn login(
    State(state): State<AppState>,
    jar: CookieJar,
    Json(dto): Json<LoginDto>,
) -> AppResult<(CookieJar, Json<Value>)> {
    if dto.username.trim().is_empty() || dto.password.trim().is_empty() {
        return Err(AppError::BadRequest("Username and password required".into()));
    }

    let user: Option<AdminUser> = sqlx::query_as(
        "SELECT id, username, email, password_hash, created_at, updated_at FROM admin_users WHERE username = $1",
    )
    .bind(dto.username.trim())
    .fetch_optional(&state.db)
    .await?;

    let user = user.ok_or(AppError::Unauthorized)?;

    let hash = PasswordHash::new(&user.password_hash)
        .map_err(|_| AppError::Internal(anyhow::anyhow!("Invalid password hash")))?;
    Argon2::default()
        .verify_password(dto.password.as_bytes(), &hash)
        .map_err(|_| AppError::Unauthorized)?;

    let session_id = Uuid::new_v4();
    let expires_at = Utc::now() + chrono::Duration::hours(state.config.session_duration_hours);

    sqlx::query("INSERT INTO sessions (id, admin_id, expires_at) VALUES ($1, $2, $3)")
        .bind(session_id)
        .bind(user.id)
        .bind(expires_at)
        .execute(&state.db)
        .await?;

    let is_prod = std::env::var("RUST_ENV").unwrap_or_default() == "production";
    let cookie = Cookie::build(("session_id", session_id.to_string()))
        .http_only(true)
        .secure(is_prod)
        .same_site(SameSite::Lax)
        .path("/")
        .max_age(time::Duration::hours(state.config.session_duration_hours))
        .build();

    let public: AdminUserPublic = user.into();
    Ok((jar.add(cookie), Json(json!({ "user": public, "message": "Logged in successfully" }))))
}

pub async fn logout(
    State(state): State<AppState>,
    AuthAdmin(admin_id): AuthAdmin,
    jar: CookieJar,
) -> AppResult<(CookieJar, Json<Value>)> {
    sqlx::query("DELETE FROM sessions WHERE admin_id = $1")
        .bind(admin_id)
        .execute(&state.db)
        .await?;

    let cookie = Cookie::build(("session_id", ""))
        .http_only(true)
        .path("/")
        .max_age(time::Duration::seconds(0))
        .build();

    Ok((jar.remove(cookie), Json(json!({ "message": "Logged out" }))))
}

pub async fn me(
    State(state): State<AppState>,
    AuthAdmin(admin_id): AuthAdmin,
) -> AppResult<Json<Value>> {
    let user: Option<AdminUser> = sqlx::query_as(
        "SELECT id, username, email, password_hash, created_at, updated_at FROM admin_users WHERE id = $1",
    )
    .bind(admin_id)
    .fetch_optional(&state.db)
    .await?;

    let user = user.ok_or(AppError::Unauthorized)?;
    let public: AdminUserPublic = user.into();
    Ok(Json(json!({ "user": public })))
}

pub fn hash_password(password: &str) -> anyhow::Result<String> {
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    let hash = argon2
        .hash_password(password.as_bytes(), &salt)
        .map_err(|e| anyhow::anyhow!("Hash failed: {e}"))?
        .to_string();
    Ok(hash)
}

pub async fn seed_admin_if_missing(db: &sqlx::PgPool, username: &str, email: &str, password: &str) -> anyhow::Result<()> {
    let exists: Option<(Uuid,)> = sqlx::query_as("SELECT id FROM admin_users WHERE username = $1")
        .bind(username)
        .fetch_optional(db)
        .await?;

    if exists.is_some() {
        tracing::info!("Admin user '{username}' already exists, skipping seed");
        return Ok(());
    }

    let hash = hash_password(password)?;
    sqlx::query("INSERT INTO admin_users (username, email, password_hash) VALUES ($1, $2, $3)")
        .bind(username)
        .bind(email)
        .bind(hash)
        .execute(db)
        .await?;

    tracing::info!("Admin user '{username}' created successfully");
    Ok(())
}
