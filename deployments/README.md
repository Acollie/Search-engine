# Kubernetes Deployment Manifests

This directory contains production-ready Kubernetes manifests for deploying the distributed search engine system.

## File Structure

```
deployments/
├── README.md                    # This file
├── DEPLOYMENT_GUIDE.md          # Detailed deployment and troubleshooting guide
├── namespace.yaml               # Kubernetes namespace
├── configmap.yaml               # Configuration for all services
├── secrets.yaml                 # Credentials (template - update with real values)
│
├── postgres.yaml                # PostgreSQL StatefulSet
├── spider.yaml                  # Spider service Deployment
├── conductor.yaml               # Conductor service Deployment
├── cartographer.yaml            # Cartographer service Deployment (CronJob)
├── searcher.yaml                # Searcher service Deployment
│
├── monitoring.yaml              # Prometheus, Grafana, AlertManager
└── ingress.yaml                 # Ingress controller configuration
```

## Quick Start

### 1. Prerequisites

- Kubernetes 1.24+
- kubectl configured to access your cluster
- Persistent Volume provisioner
- RBAC enabled

### 2. Create Namespace and Secrets

```bash
# Create namespace
kubectl apply -f deployments/namespace.yaml

# Update secrets.yaml with your credentials, then apply:
kubectl apply -f deployments/secrets.yaml

# Verify
kubectl get namespace search-engine
kubectl get secrets -n search-engine
```

### 3. Deploy Database

```bash
kubectl apply -f deployments/postgres.yaml

# Wait for StatefulSet to be ready
kubectl rollout status statefulset/postgres -n search-engine --timeout=5m
```

### 4. Deploy Services

```bash
kubectl apply -f deployments/spider.yaml
kubectl apply -f deployments/conductor.yaml
kubectl apply -f deployments/cartographer.yaml
kubectl apply -f deployments/searcher.yaml

# Monitor deployment
kubectl get pods -n search-engine -w
```

### 5. Deploy Monitoring

```bash
kubectl apply -f deployments/monitoring.yaml

# Verify monitoring stack
kubectl get pods -n search-engine -l app=prometheus,app=grafana,app=alertmanager
```

### 6. Configure Ingress

```bash
# Update domain names in ingress.yaml
vim deployments/ingress.yaml

# Apply ingress
kubectl apply -f deployments/ingress.yaml
```

## Configuration

### Environment Variables

All services are configured via ConfigMap (`search-engine-config`) and Secrets (`search-engine-secrets`).

**To update configuration:**

```bash
# Edit ConfigMap
kubectl edit configmap search-engine-config -n search-engine

# Edit Secrets (use base64 encoding)
kubectl edit secret search-engine-secrets -n search-engine
```

### Resource Scaling

Edit replica counts in deployment manifests:

```bash
# Spider
kubectl patch deployment spider -p '{"spec":{"replicas":3}}' -n search-engine

# Conductor
kubectl patch deployment conductor -p '{"spec":{"replicas":3}}' -n search-engine

# Searcher
kubectl patch deployment searcher -p '{"spec":{"replicas":5}}' -n search-engine
```

## Monitoring

### Accessing Grafana

```bash
# Port forward (without Ingress)
kubectl port-forward svc/grafana 3000:3000 -n search-engine

# Visit http://localhost:3000
# Default credentials: admin / admin
```

### Checking Metrics

```bash
# Port forward Prometheus
kubectl port-forward svc/prometheus 9090:9090 -n search-engine

# Visit http://localhost:9090
```

## Health Checks

### Service Readiness

```bash
# Check pod status
kubectl get pods -n search-engine

# Check specific pod
kubectl describe pod spider-0 -n search-engine

# Check service endpoints
kubectl get endpoints -n search-engine
```

### Database Health

```bash
# Connect to PostgreSQL
kubectl exec -it postgres-0 -n search-engine -- \
  psql -U postgres -d databaseName

# Run health query
SELECT version();
```

## Scaling Configuration

### Horizontal Pod Autoscaling

All services have HPA configured:

```bash
# Check HPA status
kubectl get hpa -n search-engine

# Manually scale
kubectl autoscale deployment spider --min=2 --max=10 -n search-engine
```

### Vertical Pod Autoscaling

For CPU/memory optimization:

1. Install Vertical Pod Autoscaler
2. Uncomment VPA sections in manifests
3. Let VPA recommend resource sizes

## Production Checklist

- [ ] Update database credentials in `secrets.yaml`
- [ ] Update AWS credentials (if using SQS)
- [ ] Configure Ingress domain names
- [ ] Enable TLS certificates
- [ ] Set up persistent volume storage
- [ ] Configure AlertManager notifications
- [ ] Set resource requests/limits appropriate for your cluster
- [ ] Enable network policies
- [ ] Configure pod security policies
- [ ] Set up log aggregation
- [ ] Enable backup strategy
- [ ] Configure monitoring dashboards
- [ ] Test failover scenarios

## Troubleshooting

### Pod Not Starting

```bash
kubectl describe pod <pod-name> -n search-engine
kubectl logs <pod-name> -n search-engine --previous
```

### Database Connection Issues

```bash
# Test connectivity from pod
kubectl exec -it spider-0 -n search-engine -- \
  curl -s http://postgres:5432/health

# Check PostgreSQL logs
kubectl logs postgres-0 -n search-engine
```

### Metrics Not Collected

```bash
# Verify Prometheus scrape config
kubectl get configmap prometheus-server-conf -n search-engine -o yaml

# Check Prometheus targets
kubectl port-forward svc/prometheus 9090:9090 -n search-engine
# Visit http://localhost:9090/targets
```

## Deployment Strategies

### Rolling Update (Default)

Services use `RollingUpdate` strategy with:
- `maxSurge: 1` - Create 1 extra pod during update
- `maxUnavailable: 0` - Always keep minimum replicas available

### Blue-Green Deployment

For zero-downtime deployments:

```bash
# Create new version
kubectl apply -f deployments/searcher-v2.yaml

# Route traffic to new version
kubectl patch service searcher-api -p '{"spec":{"selector":{"version":"v2"}}}'

# Delete old version
kubectl delete deployment searcher
```

### Canary Deployment

Roll out new version to subset of users:

```bash
# Deploy canary version with fewer replicas
kubectl apply -f deployments/searcher-canary.yaml

# Gradually increase traffic and replicas
kubectl patch deployment searcher-canary -p '{"spec":{"replicas":5}}'
```

## Backup and Restore

### Database Backup

```bash
# Create backup
kubectl exec postgres-0 -n search-engine -- \
  pg_dump -U postgres databaseName | gzip > db-backup.sql.gz

# List backups in persistent storage
kubectl exec postgres-0 -n search-engine -- ls -la /backups/
```

### Restore from Backup

```bash
# Copy backup to pod
kubectl cp db-backup.sql.gz search-engine/postgres-0:/tmp/

# Restore
kubectl exec postgres-0 -n search-engine -- \
  gunzip < /tmp/db-backup.sql.gz | psql -U postgres databaseName
```

## Performance Tuning

### Database Tuning

Edit ConfigMap with PostgreSQL parameters:

```bash
kubectl patch configmap postgres-init-scripts \
  -p '{"data":{"postgresql.conf":"shared_buffers = 4GB"}}'
```

### Service Optimization

Adjust resource requests/limits based on load:

```bash
kubectl patch deployment spider \
  -p '{"spec":{"template":{"spec":{"containers":[{"name":"spider","resources":{"limits":{"cpu":"4","memory":"2Gi"}}}]}}}}'
```

## Additional Resources

- [Full Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [PostgreSQL on Kubernetes](https://kubernetes.io/docs/tasks/run-application/run-replicated-stateful-application/)

## Support

For detailed deployment instructions and troubleshooting, see `DEPLOYMENT_GUIDE.md`.
