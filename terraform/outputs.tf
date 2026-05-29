output "cluster_id" {
  description = "Kubernetes cluster ID"
  value       = digitalocean_kubernetes_cluster.search_engine.id
}

output "cluster_endpoint" {
  description = "Kubernetes API endpoint"
  value       = digitalocean_kubernetes_cluster.search_engine.endpoint
}

output "kubeconfig" {
  description = "Kubeconfig for kubectl — save to ~/.kube/config or use KUBECONFIG env var"
  value       = digitalocean_kubernetes_cluster.search_engine.kube_config[0].raw_config
  sensitive   = true
}

output "db_host" {
  description = "Managed PostgreSQL hostname (public)"
  value       = digitalocean_database_cluster.search_engine_db.host
}

output "db_private_host" {
  description = "Managed PostgreSQL hostname (private, use inside cluster)"
  value       = digitalocean_database_cluster.search_engine_db.private_host
}

output "db_port" {
  description = "Managed PostgreSQL port"
  value       = digitalocean_database_cluster.search_engine_db.port
}

output "db_user" {
  description = "Managed PostgreSQL admin user"
  value       = digitalocean_database_cluster.search_engine_db.user
}

output "db_password" {
  description = "Managed PostgreSQL admin password"
  value       = digitalocean_database_cluster.search_engine_db.password
  sensitive   = true
}

output "db_uri" {
  description = "Full PostgreSQL connection URI"
  value       = digitalocean_database_cluster.search_engine_db.uri
  sensitive   = true
}

output "registry_endpoint" {
  description = "Container registry endpoint"
  value       = digitalocean_container_registry.search_engine.endpoint
}

output "registry_server_url" {
  description = "Container registry server URL (for docker login)"
  value       = digitalocean_container_registry.search_engine.server_url
}
