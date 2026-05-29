variable "do_token" {
  description = "DigitalOcean API token"
  type        = string
  sensitive   = true
}

variable "region" {
  description = "DigitalOcean region"
  type        = string
  default     = "lon1"
}

variable "k8s_version" {
  description = "Kubernetes version (run: doctl kubernetes options versions)"
  type        = string
  default     = "1.35.1-do.5"
}

variable "node_size" {
  description = "Node droplet size slug"
  type        = string
  default     = "s-4vcpu-8gb"
}

variable "node_count" {
  description = "Number of nodes in the worker pool"
  type        = number
  default     = 1
}

variable "db_size" {
  description = "Managed PostgreSQL size slug"
  type        = string
  default     = "db-s-2vcpu-4gb"
}

variable "db_storage_size_mib" {
  description = "Total DB storage in MiB (61440 = 60 GiB)"
  type        = number
  default     = 61440
}

variable "load_balancer_ip" {
  description = "IP of the Traefik load balancer — obtain after first deploy with: kubectl get svc -n search-engine traefik"
  type        = string
  default     = "159.65.211.230"
}

variable "acme_email" {
  description = "Email for Let's Encrypt ACME registration"
  type        = string
  default     = "alex@collie.codes"
}
