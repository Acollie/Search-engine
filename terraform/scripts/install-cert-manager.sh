#!/usr/bin/env bash
# Install cert-manager via kubectl apply (matches how the existing cluster was set up).
# Run this ONCE before `tofu apply` on a fresh cluster.
# The ClusterIssuer is managed by Terraform (kubernetes_manifest.letsencrypt_clusterissuer).

set -euo pipefail

VERSION="${1:-v1.17.2}"

echo "Installing cert-manager ${VERSION}..."
kubectl apply -f "https://github.com/cert-manager/cert-manager/releases/download/${VERSION}/cert-manager.yaml"

echo "Waiting for cert-manager to be ready..."
kubectl rollout status deployment/cert-manager -n cert-manager --timeout=120s
kubectl rollout status deployment/cert-manager-webhook -n cert-manager --timeout=120s
kubectl rollout status deployment/cert-manager-cainjector -n cert-manager --timeout=120s

echo "cert-manager ${VERSION} is ready."
