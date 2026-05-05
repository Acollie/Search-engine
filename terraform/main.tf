terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

provider "digitalocean" {
  # Reads DIGITALOCEAN_TOKEN from environment automatically.
  # Run: export DIGITALOCEAN_TOKEN=$(awk '/access-token:/{print $2}' \
  #   "$HOME/Library/Application Support/doctl/config.yaml")
}

# Container Registry
resource "digitalocean_container_registry" "main" {
  name                   = var.cluster_name
  subscription_tier_slug = "basic"
  region                 = var.registry_region
}

# Kubernetes Cluster (single node, minimum viable)
resource "digitalocean_kubernetes_cluster" "main" {
  name    = var.cluster_name
  region  = var.region
  version = var.k8s_version

  node_pool {
    name       = "worker-pool"
    size       = var.node_size
    node_count = 1

    labels = {
      service = "search-engine"
    }
  }

  lifecycle {
    prevent_destroy = true
  }
}

# Managed PostgreSQL
resource "digitalocean_database_cluster" "postgres" {
  name       = "${var.cluster_name}-db"
  engine     = "pg"
  version    = "16"
  size       = "db-s-1vcpu-1gb"
  region     = var.region
  node_count = 1

  lifecycle {
    prevent_destroy = true
  }
}

# Lock the DB down to only accept connections from the K8s cluster
resource "digitalocean_database_firewall" "postgres" {
  cluster_id = digitalocean_database_cluster.postgres.id

  rule {
    type  = "k8s"
    value = digitalocean_kubernetes_cluster.main.id
  }
}

# Save kubeconfig locally so kubectl works immediately after apply
resource "local_file" "kubeconfig" {
  content         = digitalocean_kubernetes_cluster.main.kube_config[0].raw_config
  filename        = "${path.module}/kubeconfig.yaml"
  file_permission = "0600"
}
