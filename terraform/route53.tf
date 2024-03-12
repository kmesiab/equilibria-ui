data "aws_route53_zone" "primary" {
  name = "my-eq.com"
}

resource "aws_route53_record" "angular_app_record" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = "my-eq.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.angular_app_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.angular_app_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}


resource "aws_route53_record" "meet_my_eq_subdomain" {
  zone_id = var.hosted_zone_id
  name    = "meet.my-eq.com"
  type    = "A"

  alias {
    name                   = aws_s3_bucket_website_configuration.lander_website_config.website_endpoint
    zone_id                = var.zone_id
    evaluate_target_health = false
  }
}
