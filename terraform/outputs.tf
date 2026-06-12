output "control_plane_ip" {
  description = "Public IP of the k3s control-plane — used by setup.sh to fetch kubeconfig"
  value       = hcloud_server.control_plane.ipv4_address
}

output "worker_ips" {
  description = "Public IPs of the worker nodes"
  value       = [for w in hcloud_server.workers : w.ipv4_address]
}

output "load_balancer_ip" {
  description = "Hetzner LB public IP — DNS A records for search.collie.codes and metrics.collie.codes point here"
  value       = hcloud_load_balancer.ingress.ipv4
}

output "k3s_token" {
  description = "k3s cluster join token — keep this secret, needed to add nodes later"
  value       = random_password.k3s_token.result
  sensitive   = true
}
