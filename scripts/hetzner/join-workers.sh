#!/usr/bin/env bash
set -euo pipefail

K3S_TOKEN="P5GkDELCRKz9f1MD6ZY9Pw2JMJRx5rVpTh91LL1ArS4NCk216mH7ilQ7Z7UtBbWJ"
K3S_URL="https://167.233.25.31:6443"
K3S_VERSION="v1.32.5+k3s1"

for IP in 91.99.86.248 167.233.17.249; do
  echo "==> Installing k3s agent on $IP..."
  ssh -o StrictHostKeyChecking=no root@$IP \
    "curl -sfL https://get.k3s.io | K3S_TOKEN='$K3S_TOKEN' K3S_URL='$K3S_URL' INSTALL_K3S_VERSION='$K3S_VERSION' sh -s - agent --kubelet-arg=cloud-provider=external" &
done

wait
echo "Done — both workers should be joining the cluster now"
