variable "region" {
  description = "DigitalOcean region"
  type        = string
  default     = "lon1"
}

variable "cluster_name" {
  description = "Name used for all resources (cluster, registry, database)"
  type        = string
  default     = "search-engine"
}

variable "k8s_version" {
  description = "DOKS Kubernetes version slug"
  type        = string
  default     = "1.35.1-do.5"
}

variable "registry_region" {
  description = "DOCR region (subset of DO regions — lon1 not supported; fra1 is closest to London)"
  type        = string
  default     = "fra1"
}

variable "node_size" {
  description = "DOKS worker node size"
  type        = string
  default     = "s-4vcpu-8gb"
}
