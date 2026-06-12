#cloud-config

# k3s agent bootstrap for Hetzner Cloud (Ubuntu 22.04)
# Waits for the control-plane API to be available before joining.

write_files:
  - path: /root/bootstrap.sh
    permissions: '0755'
    content: |
      #!/bin/bash
      set -euo pipefail

      # Wait until control-plane k3s API is reachable
      until curl -sk https://${server_ip}:6443 > /dev/null 2>&1; do
        echo "Waiting for control-plane at ${server_ip}:6443..."
        sleep 10
      done

      curl -sfL https://get.k3s.io | \
        INSTALL_K3S_VERSION="${k3s_version}" \
        K3S_TOKEN="${k3s_token}" \
        K3S_URL=https://${server_ip}:6443 \
        sh -s - agent \
          --kubelet-arg=cloud-provider=external

runcmd:
  - apt-get update -y && apt-get install -y curl
  - bash /root/bootstrap.sh
