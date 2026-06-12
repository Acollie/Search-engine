#!/usr/bin/env bash
# Hetzner k3s post-provision setup
#
# Run after `tofu apply` to:
#   1. Fetch kubeconfig from the control-plane
#   2. Install Hetzner CCM + CSI (LoadBalancer + PVC support)
#   3. Install cert-manager + Let's Encrypt ClusterIssuer
#   4. Install Traefik (NodePort, ports 30080/30443)
#   5. Create ECR pull secret + AWS credentials secret
#   6. Apply all Kubernetes manifests
#
# Prerequisites:
#   aws-vault (brew install aws-vault)
#   helm      (brew install helm)
#   kubectl   (brew install kubectl)
#   tofu

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
KUBECONFIG_PATH="$HOME/.kube/search-engine.yaml"
AWS_VAULT_PROFILE="${AWS_VAULT_PROFILE:-dev}"
ECR_REGION="${ECR_REGION:-eu-west-1}"
ACME_EMAIL="${ACME_EMAIL:-alex@collie.codes}"

cd "$REPO_ROOT/terraform"

# ---------------------------------------------------------------------------
# 1. Fetch kubeconfig
# ---------------------------------------------------------------------------
echo "==> Fetching kubeconfig from control-plane..."
CP_IP=$(tofu output -raw control_plane_ip)

echo "    Waiting for k3s to finish bootstrapping on $CP_IP..."
until ssh -o StrictHostKeyChecking=no -o ConnectTimeout=5 root@"$CP_IP" \
    "test -f /etc/rancher/k3s/k3s.yaml" 2>/dev/null; do
  echo "    ... not ready yet, retrying in 10s"
  sleep 10
done

mkdir -p "$(dirname "$KUBECONFIG_PATH")"
ssh -o StrictHostKeyChecking=no root@"$CP_IP" \
    "cat /etc/rancher/k3s/k3s.yaml" \
  | sed "s/127.0.0.1/$CP_IP/g" \
  > "$KUBECONFIG_PATH"
chmod 600 "$KUBECONFIG_PATH"
export KUBECONFIG="$KUBECONFIG_PATH"
echo "    Kubeconfig written to $KUBECONFIG_PATH"

echo "    Waiting for all nodes to be Ready..."
kubectl wait --for=condition=Ready nodes --all --timeout=180s

# ---------------------------------------------------------------------------
# 2. Hetzner CCM (enables LoadBalancer-type Services → Hetzner LBs)
# ---------------------------------------------------------------------------
echo "==> Installing Hetzner Cloud Controller Manager..."
# Read HCLOUD_TOKEN from env or fall back to terraform.tfvars
if [[ -z "${HCLOUD_TOKEN:-}" ]]; then
  HCLOUD_TOKEN=$(grep 'hcloud_token' "$REPO_ROOT/terraform/terraform.tfvars" 2>/dev/null | cut -d'"' -f2)
fi
if [[ -z "${HCLOUD_TOKEN:-}" ]]; then
  echo "ERROR: HCLOUD_TOKEN not set and not found in terraform/terraform.tfvars"
  exit 1
fi

kubectl -n kube-system create secret generic hcloud \
  --from-literal=token="$HCLOUD_TOKEN" \
  --from-literal=network="search-engine" \
  --dry-run=client -o yaml | kubectl apply -f -

helm repo add hetzner https://charts.hetzner.cloud 2>/dev/null || true
helm repo update hetzner

helm upgrade --install hcloud-ccm hetzner/hcloud-cloud-controller-manager \
  --namespace kube-system \
  --set networking.enabled=true \
  --set networking.clusterCIDR="10.244.0.0/16" \
  --wait

# ---------------------------------------------------------------------------
# 3. Hetzner CSI driver (enables PVCs backed by Hetzner block volumes)
# ---------------------------------------------------------------------------
echo "==> Installing Hetzner CSI driver..."
helm upgrade --install hcloud-csi hetzner/hcloud-csi \
  --namespace kube-system \
  --wait

# ---------------------------------------------------------------------------
# 4. cert-manager
# ---------------------------------------------------------------------------
echo "==> Installing cert-manager..."
helm repo add jetstack https://charts.jetstack.io 2>/dev/null || true
helm repo update jetstack

helm upgrade --install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --set installCRDs=true \
  --wait

echo "    Creating Let's Encrypt ClusterIssuer..."
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: $ACME_EMAIL
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-prod-account-key
    solvers:
      - http01:
          ingress:
            ingressClassName: traefik
EOF

# ---------------------------------------------------------------------------
# 5. Traefik (NodePort — Hetzner LB forwards to 30080/30443)
# ---------------------------------------------------------------------------
echo "==> Installing Traefik..."
helm repo add traefik https://traefik.github.io/charts 2>/dev/null || true
helm repo update traefik

helm upgrade --install traefik traefik/traefik \
  --namespace kube-system \
  --values "$REPO_ROOT/deployments/traefik-values.yaml" \
  --wait

# ---------------------------------------------------------------------------
# 6. Application namespace + ECR secrets
# ---------------------------------------------------------------------------
echo "==> Creating search-engine namespace..."
kubectl create namespace search-engine --dry-run=client -o yaml | kubectl apply -f -

echo "==> Creating ECR pull secret..."
ECR_ACCOUNT=$(aws-vault exec "$AWS_VAULT_PROFILE" -- \
  aws sts get-caller-identity --query Account --output text)
ECR_REGISTRY="${ECR_ACCOUNT}.dkr.ecr.${ECR_REGION}.amazonaws.com"
ECR_TOKEN=$(aws-vault exec "$AWS_VAULT_PROFILE" -- \
  aws ecr get-login-password --region "$ECR_REGION")

kubectl create secret docker-registry ecr-registry \
  --docker-server="$ECR_REGISTRY" \
  --docker-username=AWS \
  --docker-password="$ECR_TOKEN" \
  -n search-engine \
  --dry-run=client -o yaml | kubectl apply -f -

echo "==> Creating AWS credentials secret for ECR token refresh CronJob..."
AWS_KEY_ID=$(aws-vault exec "$AWS_VAULT_PROFILE" -- \
  aws configure get aws_access_key_id 2>/dev/null || echo '')
AWS_SECRET=$(aws-vault exec "$AWS_VAULT_PROFILE" -- \
  aws configure get aws_secret_access_key 2>/dev/null || echo '')

if [[ -z "$AWS_KEY_ID" || -z "$AWS_SECRET" ]]; then
  echo "WARNING: Could not auto-detect AWS key/secret from aws-vault."
  echo "  Create the secret manually:"
  echo "  kubectl create secret generic aws-credentials -n search-engine \\"
  echo "    --from-literal=AWS_ACCESS_KEY_ID=... \\"
  echo "    --from-literal=AWS_SECRET_ACCESS_KEY=... \\"
  echo "    --from-literal=ECR_REGION=$ECR_REGION"
else
  kubectl create secret generic aws-credentials \
    --from-literal=AWS_ACCESS_KEY_ID="$AWS_KEY_ID" \
    --from-literal=AWS_SECRET_ACCESS_KEY="$AWS_SECRET" \
    --from-literal=ECR_REGION="$ECR_REGION" \
    -n search-engine \
    --dry-run=client -o yaml | kubectl apply -f -
fi

echo "==> Creating search-engine-secrets (DB credentials)..."
echo "    You need to set DB_USER and DB_PASSWORD. Enter them now (or Ctrl-C and create manually):"
echo "    kubectl create secret generic search-engine-secrets -n search-engine \\"
echo "      --from-literal=DB_USER=... --from-literal=DB_PASSWORD=..."

# ---------------------------------------------------------------------------
# 7. Apply manifests — ECR_REGISTRY_PLACEHOLDER replaced at deploy time
# ---------------------------------------------------------------------------
echo "==> Applying Kubernetes manifests (substituting ECR registry)..."
MANIFESTS=(
  deployments/namespace.yaml
  deployments/configmap.yaml
  deployments/postgres.yaml
  deployments/spider.yaml
  deployments/conductor.yaml
  deployments/searcher.yaml
  deployments/frontend.yaml
  deployments/cartographer.yaml
  deployments/ingress.yaml
  deployments/monitoring.yaml
  deployments/ecr-token-refresh.yaml
)

for manifest in "${MANIFESTS[@]}"; do
  if [[ -f "$REPO_ROOT/$manifest" ]]; then
    sed "s|ECR_REGISTRY_PLACEHOLDER|$ECR_REGISTRY|g" "$REPO_ROOT/$manifest" | kubectl apply -f -
  fi
done

echo ""
echo "==> Setup complete!"
echo ""
echo "    LB IP:          $(cd "$REPO_ROOT/terraform" && tofu output -raw load_balancer_ip)"
echo "    Kubeconfig:     $KUBECONFIG_PATH"
echo ""
echo "    Verify:"
echo "      kubectl get nodes"
echo "      kubectl get pods -n search-engine"
echo "      kubectl get pvc -n search-engine"
