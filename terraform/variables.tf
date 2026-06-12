variable "hcloud_token" {
  description = "Hetzner Cloud API token (generate a new one — never reuse a token shared in chat)"
  type        = string
  sensitive   = true
}

variable "ssh_public_key" {
  description = "SSH public key to install on all nodes (e.g. contents of ~/.ssh/id_ed25519.pub)"
  type        = string
  sensitive   = true
}

variable "location" {
  description = "Hetzner datacenter location"
  type        = string
  default     = "fsn1"
}

variable "k3s_version" {
  description = "k3s release to install on all nodes (see https://github.com/k3s-io/k3s/releases)"
  type        = string
  default     = "v1.32.5+k3s1"
}

variable "control_plane_type" {
  description = "Hetzner server type for the control-plane node"
  type        = string
  default     = "cx33"
}

variable "worker_type" {
  description = "Hetzner server type for worker nodes (cx43 = 8 vCPU / 16 GB, good for HPA scaling)"
  type        = string
  default     = "cx43"
}

variable "worker_count" {
  description = "Number of worker nodes"
  type        = number
  default     = 2
}

variable "allowed_ssh_ips" {
  description = "CIDR list allowed to reach SSH (22) and kubectl (6443) — tighten to your IP before production"
  type        = list(string)
  default     = ["0.0.0.0/0", "::/0"]
}

variable "acme_email" {
  description = "Email for Let's Encrypt ACME registration"
  type        = string
  default     = "alex@collie.codes"
}
