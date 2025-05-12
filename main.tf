terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.0.0"
    }
  }
}

resource "aws_sqs_queue" "links_queue" {
  name                      = "links-queue"
}