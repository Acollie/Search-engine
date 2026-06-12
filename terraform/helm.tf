# Helm releases (CCM, CSI, cert-manager, Traefik) are installed by scripts/hetzner/setup.sh
# rather than Terraform to avoid the chicken-and-egg problem of needing kubeconfig before
# the cluster exists. Run setup.sh after `terraform apply` completes.
