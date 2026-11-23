use sqlx::{PgPool, postgres::PgPoolOptions};

pub type AppDb = PgPool;

pub async fn connect(url: &str) -> anyhow::Result<AppDb> {
    let pool = PgPoolOptions::new()
        .max_connections(10)
        .connect(url)
        .await?;
    Ok(pool)
}
