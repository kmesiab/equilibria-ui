resource "aws_s3_bucket" "eq_lander_redirect" {
  bucket = var.redirect_domain_name
}

resource "aws_s3_bucket_website_configuration" "lander_website_config" {
  bucket = aws_s3_bucket.eq_lander_redirect.id

  redirect_all_requests_to {
    host_name = var.lander_redirect_url
    protocol  = "https"
  }
}

resource "aws_s3_bucket_public_access_block" "enable_public_s3_access" {
  bucket = aws_s3_bucket.eq_lander_redirect.id

  block_public_acls   = false
  ignore_public_acls  = false
  block_public_policy = false
  restrict_public_buckets = false
}
