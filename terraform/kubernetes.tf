resource "kubernetes_namespace" "search_engine" {
  metadata {
    name   = "search-engine"
    labels = { name = "search-engine" }
  }

  depends_on = [digitalocean_kubernetes_cluster.search_engine]
}

# Let's Encrypt ClusterIssuer — requires cert-manager CRDs to be installed first
resource "kubernetes_manifest" "letsencrypt_clusterissuer" {
  manifest = {
    apiVersion = "cert-manager.io/v1"
    kind       = "ClusterIssuer"
    metadata = {
      name = "letsencrypt-prod"
    }
    spec = {
      acme = {
        email  = var.acme_email
        server = "https://acme-v02.api.letsencrypt.org/directory"
        privateKeySecretRef = {
          name = "letsencrypt-prod-account-key"
        }
        solvers = [{
          http01 = {
            ingress = {
              ingressClassName = "traefik"
            }
          }
        }]
      }
    }
  }

  # cert-manager CRDs must be installed before apply (see scripts/install-cert-manager.sh)
  depends_on = [helm_release.traefik, kubernetes_namespace.search_engine]
}
