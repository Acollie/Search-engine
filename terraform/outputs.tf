output "registry_endpoint" {
  description = "DOCR endpoint — use this as the image prefix in K8s manifests"
  value       = "registry.digitalocean.com/${digitalocean_container_registry.main.name}"
}

output "cluster_id" {
  value = digitalocean_kubernetes_cluster.main.id
}

output "kubeconfig_path" {
  description = "Path to the kubeconfig file written by this Terraform run"
  value       = "${path.module}/kubeconfig.yaml"
}

output "database_host" {
  value = digitalocean_database_cluster.postgres.host
}

output "database_port" {
  value = digitalocean_database_cluster.postgres.port
}

output "database_name" {
  value = digitalocean_database_cluster.postgres.database
}

output "database_user" {
  value = digitalocean_database_cluster.postgres.user
}

output "database_password" {
  value     = digitalocean_database_cluster.postgres.password
  sensitive = true
}

output "database_uri" {
  description = "Full PostgreSQL connection URI (sensitive)"
  value       = digitalocean_database_cluster.postgres.uri
  sensitive   = true
}

output "next_steps" {
  value = <<-EOT

    ── After terraform apply ──────────────────────────────────────────
    1. Export kubeconfig:
         export KUBECONFIG=${path.module}/kubeconfig.yaml

    2. Integrate DOCR with the cluster (one-time):
         doctl registry kubernetes-manifest --name ${digitalocean_container_registry.main.name} \
           | kubectl apply -f -

    3. Build and push images:
         make build-and-push-all REGISTRY=registry.digitalocean.com/${digitalocean_container_registry.main.name}

    4. Apply K8s manifests:
         kubectl apply -f ../deployments/namespace.yaml
         kubectl apply -f ../deployments/configmap.yaml
         # Create the DB secret using terraform output values:
         kubectl create secret generic search-engine-secrets \
           --namespace=search-engine \
           --from-literal=DB_HOST=$(terraform output -raw database_host) \
           --from-literal=DB_USER=$(terraform output -raw database_user) \
           --from-literal=DB_PASSWORD=$(terraform output -raw database_password) \
           --from-literal=DB_NAME=$(terraform output -raw database_name)
         kubectl apply -f ../deployments/
    ───────────────────────────────────────────────────────────────────
  EOT
}
