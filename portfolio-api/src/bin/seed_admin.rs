use anyhow::Context;
use argon2::{Argon2, password_hash::{SaltString, rand_core::OsRng}, PasswordHasher};
use uuid::Uuid;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenvy::dotenv().ok();

    let db_url = std::env::var("DATABASE_URL").context("DATABASE_URL must be set")?;
    let username = std::env::var("ADMIN_USERNAME").unwrap_or_else(|_| "admin".into());
    let email = std::env::var("ADMIN_EMAIL").unwrap_or_else(|_| "admin@portfolio.local".into());
    let password = std::env::var("ADMIN_PASSWORD").context("ADMIN_PASSWORD must be set")?;

    let pool = sqlx::PgPool::connect(&db_url).await?;

    let exists: Option<(Uuid,)> = sqlx::query_as("SELECT id FROM admin_users WHERE username = $1")
        .bind(&username)
        .fetch_optional(&pool)
        .await?;

    if exists.is_some() {
        println!("Admin user '{username}' already exists.");
        return Ok(());
    }

    let salt = SaltString::generate(&mut OsRng);
    let hash = Argon2::default()
        .hash_password(password.as_bytes(), &salt)
        .map_err(|e| anyhow::anyhow!("Hash failed: {e}"))?
        .to_string();

    let id = Uuid::new_v4();
    sqlx::query("INSERT INTO admin_users (id, username, email, password_hash) VALUES ($1, $2, $3, $4)")
        .bind(id)
        .bind(&username)
        .bind(&email)
        .bind(&hash)
        .execute(&pool)
        .await?;

    println!("Admin user '{username}' ({email}) created successfully with ID: {id}");
    Ok(())
}
