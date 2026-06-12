#!/usr/bin/env bash
set -euo pipefail

echo "==> Patching k3s config on control plane..."
ssh -o StrictHostKeyChecking=no root@167.233.25.31 '
grep -q "kubelet-insecure-tls" /etc/rancher/k3s/config.yaml 2>/dev/null && echo "Already patched" && exit 0
cat >> /etc/rancher/k3s/config.yaml << CFGEOF
kube-apiserver-arg:
  - kubelet-insecure-tls
CFGEOF
systemctl restart k3s
echo "k3s restarted"
'

echo "==> Waiting for API server to come back..."
sleep 15

export KUBECONFIG=~/.kube/search-engine.yaml

echo "==> Tables in database:"
kubectl exec -n search-engine postgres-0 -- psql -U searchengine -d databaseName -c "\dt"

echo ""
echo "==> Row counts:"
kubectl exec -n search-engine postgres-0 -- psql -U searchengine -d databaseName -c "
SELECT 'SeenPages'        AS table_name, COUNT(*) AS rows FROM SeenPages
UNION ALL SELECT 'Queue',               COUNT(*) FROM Queue
UNION ALL SELECT 'Links',               COUNT(*) FROM Links
UNION ALL SELECT 'PageRankResults',     COUNT(*) FROM PageRankResults;"

echo ""
echo "==> 5 most recently crawled pages:"
kubectl exec -n search-engine postgres-0 -- psql -U searchengine -d databaseName -c "
SELECT url, title, crawl_time FROM SeenPages ORDER BY crawl_time DESC LIMIT 5;"
