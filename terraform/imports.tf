# Import existing DigitalOcean infrastructure into Terraform state.
#
# Usage (existing cluster):
#   cd terraform
#   cp terraform.tfvars.example terraform.tfvars  # add do_token
#   tofu init
#   tofu plan   # verify: should show no destroy/recreate actions
#   tofu apply
#
# After deleting and recreating the cluster, replace the IDs below with the
# new resource IDs from `doctl kubernetes cluster list` and `doctl databases list`.
#
# Note: cert-manager was installed via kubectl apply on the existing cluster and
# is not managed by Terraform. The ClusterIssuer below IS imported.

import {
  to = digitalocean_kubernetes_cluster.search_engine
  id = "58d25107-5f0a-46ca-9f0c-bc7bb4dac0c3"
}

import {
  to = digitalocean_database_cluster.search_engine_db
  id = "1d7e1ac9-0676-4375-b6d2-5d8e264e5ccf"
}

import {
  to = digitalocean_container_registry.search_engine
  id = "search-engine"
}

import {
  to = digitalocean_record.search
  id = "collie.codes,1817976281"
}

import {
  to = digitalocean_record.metrics
  id = "collie.codes,1817976282"
}

import {
  to = helm_release.traefik
  id = "kube-system/traefik"
}

import {
  to = kubernetes_namespace.search_engine
  id = "search-engine"
}

import {
  to = kubernetes_manifest.letsencrypt_clusterissuer
  id = "apiVersion=cert-manager.io/v1,kind=ClusterIssuer,name=letsencrypt-prod"
}
