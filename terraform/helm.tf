resource "helm_release" "cert_manager" {
  name             = "cert-manager"
  repository       = "https://charts.jetstack.io"
  chart            = "cert-manager"
  namespace        = "cert-manager"
  version          = "v1.17.2"
  create_namespace = true

  set {
    name  = "crds.enabled"
    value = "true"
  }

  depends_on = [digitalocean_kubernetes_cluster.search_engine]
}

resource "helm_release" "traefik" {
  name       = "traefik"
  repository = "https://traefik.github.io/charts"
  chart      = "traefik"
  namespace  = "kube-system"
  version    = "39.0.9"

  values = [file("${path.module}/../deployments/traefik-values.yaml")]

  depends_on = [digitalocean_kubernetes_cluster.search_engine]
}
