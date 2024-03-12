variable "aws_region" {
  type = string
  default = "us-west-2"
}

variable "domain_name" {
  type = string
  default = "my-eq.com"
}

variable "redirect_domain_name" {
  type = string
  default = "meet.my-eq.com"
}

variable "lander_redirect_url" {
  type = string
  default = "my-eq.carrd.co"
}

variable "hosted_zone_id" {
  type = string
  default = "Z1017894H0HIZEDKUB24"
}

variable "zone_id" {
  type = string
  default = "Z3BJ6K6RIION7M"
}

variable "acm_certificate_arn" {
  type  = string
  default = "arn:aws:acm:us-east-1:462498369025:certificate/4dbb0af8-a032-47af-9bc3-4b04042a61a3"
}
