#cloud-config

# k3s control-plane bootstrap for Hetzner Cloud (Ubuntu 22.04)
# Installs k3s server with external cloud provider (Hetzner CCM) and no built-in LB/ingress.
# The setup script runs after Terraform to install CCM, CSI, cert-manager, and Traefik.

write_files:
  - path: /root/bootstrap.sh
    permissions: '0755'
    content: |
      #!/bin/bash
      set -euo pipefail

      # Hetzner metadata service — get this node's public IP for TLS SAN so kubectl works
      PUBLIC_IP=$(curl -s http://169.254.169.254/hetzner/v1/metadata/public-ipv4)

      curl -sfL https://get.k3s.io | \
        INSTALL_K3S_VERSION="${k3s_version}" \
        K3S_TOKEN="${k3s_token}" \
        sh -s - server \
          --disable traefik \
          --disable servicelb \
          --disable-cloud-controller \
          --kubelet-arg=cloud-provider=external \
          --tls-san $PUBLIC_IP

runcmd:
  - apt-get update -y && apt-get install -y curl
  - bash /root/bootstrap.sh
