use anyhow::Result;
use bytes::Bytes;

use crate::Config;

/// Storage abstraction — currently supports S3-compatible object storage
/// (Cloudflare R2, AWS S3, MinIO, etc.)
pub struct Storage {
    client: Option<aws_sdk_s3::Client>,
    bucket: String,
    public_url: String,
}

impl Storage {
    pub async fn new(config: &Config) -> Self {
        // If no access key is set, use a noop storage (store locally / skip)
        if config.storage_access_key.is_empty() {
            tracing::warn!("No STORAGE_ACCESS_KEY set — media uploads will be disabled");
            return Self { client: None, bucket: config.storage_bucket.clone(), public_url: config.storage_public_url.clone() };
        }

        let creds = aws_sdk_s3::config::Credentials::new(
            &config.storage_access_key,
            &config.storage_secret_key,
            None, None, "env",
        );

        let mut builder = aws_config::defaults(aws_config::BehaviorVersion::latest())
            .credentials_provider(creds)
            .region(aws_config::Region::new(config.storage_region.clone()));

        if let Some(endpoint) = &config.storage_endpoint {
            builder = builder.endpoint_url(endpoint);
        }

        let sdk_config = builder.load().await;
        let client = aws_sdk_s3::Client::new(&sdk_config);

        Self {
            client: Some(client),
            bucket: config.storage_bucket.clone(),
            public_url: config.storage_public_url.clone(),
        }
    }

    pub async fn upload(&self, key: &str, data: Bytes, content_type: &str) -> Result<String> {
        let client = self.client.as_ref()
            .ok_or_else(|| anyhow::anyhow!("Storage not configured"))?;

        client.put_object()
            .bucket(&self.bucket)
            .key(key)
            .content_type(content_type)
            .body(data.into())
            .send()
            .await?;

        Ok(format!("{}/{}", self.public_url.trim_end_matches('/'), key))
    }

    pub async fn delete(&self, key: &str) -> Result<()> {
        let client = self.client.as_ref()
            .ok_or_else(|| anyhow::anyhow!("Storage not configured"))?;

        client.delete_object()
            .bucket(&self.bucket)
            .key(key)
            .send()
            .await?;

        Ok(())
    }
}
