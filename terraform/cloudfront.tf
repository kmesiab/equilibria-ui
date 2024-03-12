resource "aws_cloudfront_distribution" "angular_app_distribution" {
  origin {
    domain_name = aws_s3_bucket.angular_app_bucket.bucket_domain_name
    origin_id   = aws_s3_bucket.angular_app_bucket.id
  }

  aliases = [
    var.domain_name
  ]

  # Catch 403s
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }
  # Catch 404s
  custom_error_response {
    error_code         = 404 # Also handle 404 not found
    response_code      = 200
    response_page_path = "/index.html"
  }

  http_version        = "http2and3" # maybe just http1.1
  is_ipv6_enabled     = true # maybe false
  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.angular_app_bucket.id
    forwarded_values {
      query_string = false
      headers      = ["Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers"]

      cookies {
        forward = "all"
      }
    }
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = var.acm_certificate_arn
    ssl_support_method  = "sni-only"
    minimum_protocol_version = "TLSv1.2_2019"
  }
}
