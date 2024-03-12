resource "aws_s3_bucket" "angular_app_bucket" {
  bucket = var.domain_name
}

# Enable versioning
resource "aws_s3_bucket_versioning" "angular_app_bucket_versioning" {
  bucket = aws_s3_bucket.angular_app_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Basic config
resource "aws_s3_bucket_website_configuration" "website_config" {
  bucket = aws_s3_bucket.angular_app_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# Enable C?ORs
resource "aws_s3_bucket_cors_configuration" "example" {
  bucket = aws_s3_bucket.angular_app_bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST"]
    allowed_origins = [
      "https://${var.domain_name}",
      "https://app.${var.domain_name}"
    ]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }

  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
}

# Enable public access
resource "aws_s3_bucket_public_access_block" "public_s3_access" {
  bucket = aws_s3_bucket.angular_app_bucket.id

  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.angular_app_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = ["s3:GetObject"]
        Effect    = "Allow"
        Resource  = "${aws_s3_bucket.angular_app_bucket.arn}/*"
        Principal = "*"
      },
    ]
  })
}
