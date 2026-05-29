terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

provider "helm" {
  kubernetes {
    host  = digitalocean_kubernetes_cluster.search_engine.endpoint
    token = digitalocean_kubernetes_cluster.search_engine.kube_config[0].token
    cluster_ca_certificate = base64decode(
      digitalocean_kubernetes_cluster.search_engine.kube_config[0].cluster_ca_certificate
    )
  }
}

provider "kubernetes" {
  host  = digitalocean_kubernetes_cluster.search_engine.endpoint
  token = digitalocean_kubernetes_cluster.search_engine.kube_config[0].token
  cluster_ca_certificate = base64decode(
    digitalocean_kubernetes_cluster.search_engine.kube_config[0].cluster_ca_certificate
  )
}

resource "digitalocean_kubernetes_cluster" "search_engine" {
  name    = "search-engine"
  region  = var.region
  version = var.k8s_version

  node_pool {
    name       = "worker-pool"
    size       = var.node_size
    node_count = var.node_count

    labels = {
      service = "search-engine"
    }
  }
}

resource "digitalocean_database_cluster" "search_engine_db" {
  name             = "search-engine-db"
  engine           = "pg"
  version          = "16"
  size             = var.db_size
  region           = var.region
  node_count       = 1
  storage_size_mib = var.db_storage_size_mib

  private_network_uuid = digitalocean_kubernetes_cluster.search_engine.vpc_uuid

  maintenance_window {
    day  = "sunday"
    hour = "15:57:37"
  }
}

resource "digitalocean_container_registry" "search_engine" {
  name                   = "search-engine"
  subscription_tier_slug = "basic"
  region                 = "fra1"
}

# DNS records — update load_balancer_ip after Traefik ingress provisions the LB
resource "digitalocean_record" "search" {
  domain = "collie.codes"
  type   = "A"
  name   = "search"
  value  = var.load_balancer_ip
  ttl    = 300
}

resource "digitalocean_record" "metrics" {
  domain = "collie.codes"
  type   = "A"
  name   = "metrics"
  value  = var.load_balancer_ip
  ttl    = 300
}
