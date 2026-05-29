# Import existing DigitalOcean infrastructure into Terraform state.
#
# Usage (existing cluster):
#   cd terraform
#   cp terraform.tfvars.example terraform.tfvars  # add do_token
#   tofu init
#   tofu plan   # verify: should show no destroy/recreate actions
#   tofu apply
#
# After deleting and recreating the cluster, replace the K8s cluster ID below
# with the new ID from `doctl kubernetes cluster list`.
#
# Note: cert-manager was installed via kubectl apply and is not managed by
# Terraform. The ClusterIssuer below IS imported. Traefik will be installed
# fresh by Terraform on recreation (no import needed).

import {
  to = digitalocean_kubernetes_cluster.search_engine
  id = "58d25107-5f0a-46ca-9f0c-bc7bb4dac0c3"
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
  to = kubernetes_namespace.search_engine
  id = "search-engine"
}

import {
  to = kubernetes_manifest.letsencrypt_clusterissuer
  id = "apiVersion=cert-manager.io/v1,kind=ClusterIssuer,name=letsencrypt-prod"
}
