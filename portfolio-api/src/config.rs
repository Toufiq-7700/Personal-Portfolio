use anyhow::{Context, Result};

#[derive(Debug, Clone)]
pub struct Config {
    pub database_url: String,
    pub port: u16,
    pub session_secret: String,
    pub session_duration_hours: i64,
    pub allowed_origins: Vec<String>,
    // S3 / R2 storage
    pub storage_bucket: String,
    pub storage_endpoint: Option<String>,
    pub storage_region: String,
    pub storage_access_key: String,
    pub storage_secret_key: String,
    pub storage_public_url: String,
}

impl Config {
    pub fn from_env() -> Result<Self> {
        Ok(Self {
            database_url: std::env::var("DATABASE_URL")
                .context("DATABASE_URL must be set")?,
            port: std::env::var("PORT")
                .unwrap_or_else(|_| "3001".into())
                .parse()
                .context("PORT must be a number")?,
            session_secret: std::env::var("SESSION_SECRET")
                .context("SESSION_SECRET must be set")?,
            session_duration_hours: std::env::var("SESSION_DURATION_HOURS")
                .unwrap_or_else(|_| "24".into())
                .parse()
                .unwrap_or(24),
            allowed_origins: std::env::var("ALLOWED_ORIGINS")
                .unwrap_or_else(|_| "http://localhost:3000".into())
                .split(',')
                .map(|s| s.trim().to_string())
                .collect(),
            storage_bucket: std::env::var("STORAGE_BUCKET")
                .unwrap_or_else(|_| "portfolio-media".into()),
            storage_endpoint: std::env::var("STORAGE_ENDPOINT").ok(),
            storage_region: std::env::var("STORAGE_REGION")
                .unwrap_or_else(|_| "auto".into()),
            storage_access_key: std::env::var("STORAGE_ACCESS_KEY")
                .unwrap_or_default(),
            storage_secret_key: std::env::var("STORAGE_SECRET_KEY")
                .unwrap_or_default(),
            storage_public_url: std::env::var("STORAGE_PUBLIC_URL")
                .unwrap_or_else(|_| "http://localhost:3001/media".into()),
        })
    }
}
