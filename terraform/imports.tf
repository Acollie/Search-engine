# No import blocks — fresh Hetzner cluster, nothing to import.
# If re-applying against an existing cluster, add import blocks here using:
#   hcloud_server.control_plane  → server ID from: hcloud server list
#   hcloud_server.workers        → server IDs
#   hcloud_load_balancer.ingress → LB ID from: hcloud load-balancer list
#   digitalocean_record.search   → "collie.codes,<record_id>"
#   digitalocean_record.metrics  → "collie.codes,<record_id>"
