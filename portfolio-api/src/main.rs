mod auth;
mod config;
mod db;
mod error;
mod handlers;
mod middleware;
mod models;
mod routes;
mod storage;

use std::sync::Arc;
use axum::Router;
use tower_http::cors::{Any, CorsLayer};
use tower_http::trace::TraceLayer;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

pub use config::Config;
pub use db::AppDb;
pub use error::AppError;
pub use storage::Storage;

#[derive(Clone)]
pub struct AppState {
    pub db: AppDb,
    pub config: Arc<Config>,
    pub storage: Arc<Storage>,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Load .env
    dotenvy::dotenv().ok();

    // Init tracing
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::try_from_default_env()
            .unwrap_or_else(|_| "portfolio_api=debug,tower_http=debug".into()))
        .with(tracing_subscriber::fmt::layer())
        .init();

    let config = Arc::new(Config::from_env()?);
    tracing::info!("Starting portfolio-api on port {}", config.port);

    // Database pool
    let db = db::connect(&config.database_url).await?;

    // Run migrations
    let migrator = sqlx::migrate::Migrator::new(std::path::Path::new("./migrations")).await?;
    migrator.run(&db).await?;
    tracing::info!("Migrations applied successfully");

    // Seed admin if credentials are provided in env
    if let (Ok(u), Ok(p)) = (std::env::var("ADMIN_USERNAME"), std::env::var("ADMIN_PASSWORD")) {
        let email = std::env::var("ADMIN_EMAIL").unwrap_or_else(|_| "admin@portfolio.local".into());
        if let Err(e) = auth::seed_admin_if_missing(&db, &u, &email, &p).await {
            tracing::warn!("Admin seed skipped or failed: {e}");
        }
    }

    // Storage client
    let storage = Arc::new(Storage::new(&config).await);

    let state = AppState { db, config: config.clone(), storage };

    // CORS
    let cors = CorsLayer::new()
        .allow_origin(config.allowed_origins.iter()
            .map(|o| o.parse().unwrap())
            .collect::<Vec<_>>())
        .allow_methods(Any)
        .allow_headers(Any)
        .allow_credentials(true);

    let app = Router::new()
        .merge(routes::public::router())
        .merge(routes::admin::router())
        .layer(cors)
        .layer(TraceLayer::new_for_http())
        .with_state(state);

    let addr = format!("0.0.0.0:{}", config.port);
    let listener = tokio::net::TcpListener::bind(&addr).await?;
    tracing::info!("Listening on {addr}");
    axum::serve(listener, app).await?;
    Ok(())
}
