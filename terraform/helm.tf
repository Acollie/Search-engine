# cert-manager was installed via kubectl apply (not Helm) on the existing cluster.
# For fresh installs, run scripts/install-cert-manager.sh before terraform apply.
# See: https://cert-manager.io/docs/installation/kubectl/

resource "helm_release" "traefik" {
  name       = "traefik"
  repository = "https://traefik.github.io/charts"
  chart      = "traefik"
  namespace  = "kube-system"
  version    = "39.0.9"

  values = [file("${path.module}/../deployments/traefik-values.yaml")]

  depends_on = [digitalocean_kubernetes_cluster.search_engine]
}
