use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};

// ============================================================
// Project
// ============================================================
#[derive(Debug, Serialize, Deserialize, sqlx::FromRow, Clone)]
pub struct Project {
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
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ProjectWithTags {
    #[serde(flatten)]
    pub project: Project,
    pub tags: Vec<String>,
}

#[derive(Debug, Deserialize)]
pub struct CreateProjectDto {
    pub title: String,
    pub slug: Option<String>,
    pub short_desc: Option<String>,
    pub long_desc: Option<String>,
    pub category: Option<String>,
    pub badge: Option<String>,
    pub github_url: Option<String>,
    pub demo_url: Option<String>,
    pub thumbnail_url: Option<String>,
    pub is_featured: Option<bool>,
    pub status: Option<String>,
    pub sort_order: Option<i32>,
    pub tags: Option<Vec<String>>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateProjectDto {
    pub title: Option<String>,
    pub slug: Option<String>,
    pub short_desc: Option<String>,
    pub long_desc: Option<String>,
    pub category: Option<String>,
    pub badge: Option<String>,
    pub github_url: Option<String>,
    pub demo_url: Option<String>,
    pub thumbnail_url: Option<String>,
    pub is_featured: Option<bool>,
    pub status: Option<String>,
    pub sort_order: Option<i32>,
    pub tags: Option<Vec<String>>,
}

// ============================================================
// Skill Category + Skill
// ============================================================
#[derive(Debug, Serialize, Deserialize, sqlx::FromRow, Clone)]
pub struct SkillCategory {
    pub id: Uuid,
    pub name: String,
    pub sort_order: i32,
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow, Clone)]
pub struct Skill {
    pub id: Uuid,
    pub name: String,
    pub category_id: Option<Uuid>,
    pub tag: Option<String>,
    pub description: Option<String>,
    pub level: i16,
    pub sort_order: i32,
    pub is_published: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SkillWithCategory {
    #[serde(flatten)]
    pub skill: Skill,
    pub category_name: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct CreateSkillDto {
    pub name: String,
    pub category_id: Option<Uuid>,
    pub tag: Option<String>,
    pub description: Option<String>,
    pub level: Option<i16>,
    pub sort_order: Option<i32>,
    pub is_published: Option<bool>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateSkillDto {
    pub name: Option<String>,
    pub category_id: Option<Uuid>,
    pub tag: Option<String>,
    pub description: Option<String>,
    pub level: Option<i16>,
    pub sort_order: Option<i32>,
    pub is_published: Option<bool>,
}

// ============================================================
// Achievement
// ============================================================
#[derive(Debug, Serialize, Deserialize, sqlx::FromRow, Clone)]
pub struct Achievement {
    pub id: Uuid,
    pub title: String,
    pub description: Option<String>,
    pub date: Option<chrono::NaiveDate>,
    pub icon: Option<String>,
    pub sort_order: i32,
    pub is_published: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateAchievementDto {
    pub title: String,
    pub description: Option<String>,
    pub date: Option<chrono::NaiveDate>,
    pub icon: Option<String>,
    pub sort_order: Option<i32>,
    pub is_published: Option<bool>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateAchievementDto {
    pub title: Option<String>,
    pub description: Option<String>,
    pub date: Option<chrono::NaiveDate>,
    pub icon: Option<String>,
    pub sort_order: Option<i32>,
    pub is_published: Option<bool>,
}

// ============================================================
// Education
// ============================================================
#[derive(Debug, Serialize, Deserialize, sqlx::FromRow, Clone)]
pub struct Education {
    pub id: Uuid,
    pub institution: String,
    pub degree: Option<String>,
    pub field: Option<String>,
    pub start_date: Option<chrono::NaiveDate>,
    pub end_date: Option<chrono::NaiveDate>,
    pub is_current: bool,
    pub description: Option<String>,
    pub gpa: Option<String>,
    pub sort_order: i32,
    pub is_published: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateEducationDto {
    pub institution: String,
    pub degree: Option<String>,
    pub field: Option<String>,
    pub start_date: Option<chrono::NaiveDate>,
    pub end_date: Option<chrono::NaiveDate>,
    pub is_current: Option<bool>,
    pub description: Option<String>,
    pub gpa: Option<String>,
    pub sort_order: Option<i32>,
    pub is_published: Option<bool>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateEducationDto {
    pub institution: Option<String>,
    pub degree: Option<String>,
    pub field: Option<String>,
    pub start_date: Option<chrono::NaiveDate>,
    pub end_date: Option<chrono::NaiveDate>,
    pub is_current: Option<bool>,
    pub description: Option<String>,
    pub gpa: Option<String>,
    pub sort_order: Option<i32>,
    pub is_published: Option<bool>,
}

// ============================================================
// Experience
// ============================================================
#[derive(Debug, Serialize, Deserialize, sqlx::FromRow, Clone)]
pub struct Experience {
    pub id: Uuid,
    pub company: String,
    pub role: String,
    pub start_date: Option<chrono::NaiveDate>,
    pub end_date: Option<chrono::NaiveDate>,
    pub is_current: bool,
    pub description: Option<String>,
    pub location: Option<String>,
    pub exp_type: Option<String>,
    pub sort_order: i32,
    pub is_published: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateExperienceDto {
    pub company: String,
    pub role: String,
    pub start_date: Option<chrono::NaiveDate>,
    pub end_date: Option<chrono::NaiveDate>,
    pub is_current: Option<bool>,
    pub description: Option<String>,
    pub location: Option<String>,
    pub exp_type: Option<String>,
    pub sort_order: Option<i32>,
    pub is_published: Option<bool>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateExperienceDto {
    pub company: Option<String>,
    pub role: Option<String>,
    pub start_date: Option<chrono::NaiveDate>,
    pub end_date: Option<chrono::NaiveDate>,
    pub is_current: Option<bool>,
    pub description: Option<String>,
    pub location: Option<String>,
    pub exp_type: Option<String>,
    pub sort_order: Option<i32>,
    pub is_published: Option<bool>,
}

// ============================================================
// Research
// ============================================================
#[derive(Debug, Serialize, Deserialize, sqlx::FromRow, Clone)]
pub struct Research {
    pub id: Uuid,
    pub title: String,
    pub authors: Option<String>,
    pub publication: Option<String>,
    pub year: Option<i32>,
    pub url: Option<String>,
    pub doi: Option<String>,
    pub abstract_text: Option<String>,
    pub status: Option<String>,
    pub sort_order: i32,
    pub is_published: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateResearchDto {
    pub title: String,
    pub authors: Option<String>,
    pub publication: Option<String>,
    pub year: Option<i32>,
    pub url: Option<String>,
    pub doi: Option<String>,
    pub abstract_text: Option<String>,
    pub status: Option<String>,
    pub sort_order: Option<i32>,
    pub is_published: Option<bool>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateResearchDto {
    pub title: Option<String>,
    pub authors: Option<String>,
    pub publication: Option<String>,
    pub year: Option<i32>,
    pub url: Option<String>,
    pub doi: Option<String>,
    pub abstract_text: Option<String>,
    pub status: Option<String>,
    pub sort_order: Option<i32>,
    pub is_published: Option<bool>,
}

// ============================================================
// Admin User + Session + Auth DTOs
// ============================================================
#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct AdminUser {
    pub id: Uuid,
    pub username: String,
    pub email: String,
    pub password_hash: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Session {
    pub id: Uuid,
    pub admin_id: Uuid,
    pub expires_at: DateTime<Utc>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct LoginDto {
    pub username: String,
    pub password: String,
}

#[derive(Debug, Serialize)]
pub struct AdminUserPublic {
    pub id: Uuid,
    pub username: String,
    pub email: String,
}

impl From<AdminUser> for AdminUserPublic {
    fn from(u: AdminUser) -> Self {
        Self { id: u.id, username: u.username, email: u.email }
    }
}

// ============================================================
// Pagination
// ============================================================
#[derive(Debug, Deserialize)]
pub struct PaginationQuery {
    pub page: Option<i64>,
    pub per_page: Option<i64>,
    pub search: Option<String>,
    pub status: Option<String>,
    pub category: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct PaginatedResponse<T: Serialize> {
    pub data: Vec<T>,
    pub total: i64,
    pub page: i64,
    pub per_page: i64,
    pub total_pages: i64,
}

// ============================================================
// Media
// ============================================================
#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct MediaAsset {
    pub id: Uuid,
    pub filename: String,
    pub original_name: Option<String>,
    pub url: String,
    pub mime_type: Option<String>,
    pub size_bytes: Option<i64>,
    pub bucket: Option<String>,
    pub key: Option<String>,
    pub uploaded_at: DateTime<Utc>,
}
