# Quick Deployment Guide

## Prerequisites

- Docker and Docker Compose installed
- Go 1.24+ installed (for local builds)
- kubectl configured (for Kubernetes deployment)
- AWS CLI configured (for ECR deployment)

## Local Development (Docker Compose)

### 1. Set Environment Variables

Create a `.env` file or export variables:

```bash
export DB_USER=postgres
export DB_PASSWORD=postgres
export DB_HOST=localhost
```

### 2. Build All Services

```bash
make build-all
```

This builds:
- Spider
- Conductor
- Cartographer
- Searcher
- Frontend (NEW)

### 3. Start the Stack

```bash
docker-compose up -d
```

### 4. Verify Services

```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs -f frontend
docker-compose logs -f searcher

# Check health endpoints
curl http://localhost:8001/health  # Spider
curl http://localhost:8002/health  # Conductor
curl http://localhost:8003/health  # Cartographer
curl http://localhost:8004/health  # Searcher
curl http://localhost:8005/health  # Frontend
```

### 5. Access Services

- **Frontend**: http://localhost:3000 ← START HERE
- **Adminer (DB UI)**: http://localhost:8888
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001 (default: admin/admin)

### 6. Test Search

1. Open http://localhost:3000
2. Enter a search query (e.g., "golang")
3. View results with PageRank scores

### 7. Stop Services

```bash
docker-compose down
```

## Kubernetes Deployment

### 1. Create Namespace

```bash
kubectl apply -f deployments/namespace.yaml
```

### 2. Create Secrets

```bash
# Option 1: Quick start (development only)
kubectl apply -f deployments/secrets.yaml

# Option 2: Production secrets
kubectl create secret generic search-engine-secrets \
  --namespace=search-engine \
  --from-literal=DB_USER=postgres \
  --from-literal=DB_PASSWORD=YOUR_STRONG_PASSWORD \
  --from-literal=GRAFANA_PASSWORD=YOUR_GRAFANA_PASSWORD \
  --from-literal=AWS_ACCESS_KEY_ID=YOUR_AWS_KEY \
  --from-literal=AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET \
  --from-literal=AWS_REGION=eu-west-1
```

### 3. Deploy Database

```bash
kubectl apply -f deployments/configmap.yaml
kubectl apply -f deployments/postgres.yaml

# Wait for database to be ready
kubectl wait --for=condition=ready pod -l app=postgres -n search-engine --timeout=120s
```

### 4. Deploy Services

```bash
# Deploy in order
kubectl apply -f deployments/spider.yaml
kubectl apply -f deployments/conductor.yaml
kubectl apply -f deployments/cartographer.yaml
kubectl apply -f deployments/searcher.yaml
kubectl apply -f deployments/frontend.yaml

# Wait for all pods to be ready
kubectl wait --for=condition=ready pod -l app=frontend -n search-engine --timeout=120s
```

### 5. Deploy Monitoring

```bash
kubectl apply -f deployments/monitoring.yaml

# Wait for Prometheus and Grafana
kubectl wait --for=condition=ready pod -l app=prometheus -n search-engine --timeout=60s
kubectl wait --for=condition=ready pod -l app=grafana -n search-engine --timeout=60s
```

### 6. Deploy Ingress

```bash
kubectl apply -f deployments/ingress.yaml
```

### 7. Access Frontend

```bash
# Option 1: Port forwarding (development)
kubectl port-forward svc/frontend 3000:80 -n search-engine

# Option 2: LoadBalancer (cloud)
kubectl get svc frontend -n search-engine
# Access via EXTERNAL-IP

# Option 3: Ingress (production)
# Configure DNS to point to Ingress controller
# Access via https://search-engine.example.com
```

### 8. Monitor Deployment

```bash
# Check pod status
kubectl get pods -n search-engine

# Check services
kubectl get svc -n search-engine

# View logs
kubectl logs -f deployment/frontend -n search-engine
kubectl logs -f deployment/searcher -n search-engine

# Check HPA status
kubectl get hpa -n search-engine

# Check PVC status
kubectl get pvc -n search-engine
```

## Build and Push to ECR

### 1. Login to ECR

```bash
aws ecr get-login-password --region eu-west-1 | \
  docker login --username AWS --password-stdin \
  967991486854.dkr.ecr.eu-west-1.amazonaws.com
```

### 2. Build and Push

```bash
# Push all services
make build-and-push-all

# Or push individual services
make build-and-push-frontend
make build-and-push-searcher
make build-and-push-spider
make build-and-push-conductor
make build-and-push-cartographer
```

**Note:** Uncomment the `docker push` lines in Makefile to actually push images.

### 3. Update Kubernetes Deployments

```bash
# After pushing new images, restart deployments
kubectl rollout restart deployment/frontend -n search-engine
kubectl rollout restart deployment/searcher -n search-engine
# etc.

# Watch rollout status
kubectl rollout status deployment/frontend -n search-engine
```

## Database Initialization

The database schema is automatically created from `pkg/db/init/01-init-schema.sql` when the PostgreSQL container starts.

To manually run schema:

```bash
# Docker Compose
docker-compose exec postgres psql -U postgres -d databaseName -f /docker-entrypoint-initdb.d/01-init-schema.sql

# Kubernetes
kubectl exec -it postgres-0 -n search-engine -- psql -U postgres -d databaseName < scripts/01-init-schema.sql
```

## Monitoring

### Prometheus

```bash
# Port forward
kubectl port-forward svc/prometheus 9090:9090 -n search-engine

# Access: http://localhost:9090
```

**Metrics to watch:**
- `frontend_search_requests_total` - Total searches
- `frontend_search_duration_seconds` - Search latency
- `up{job="frontend"}` - Service health
- `up{job="searcher"}` - Searcher health

### Grafana

```bash
# Port forward
kubectl port-forward svc/grafana 3001:3000 -n search-engine

# Access: http://localhost:3001
# Default: admin/admin (change on first login)
```

Create dashboard with:
- Search request rate
- Search latency (p50, p95, p99)
- Error rate
- Service uptime

## Troubleshooting

### Frontend can't connect to Searcher

```bash
# Check Searcher is running
kubectl get pods -l app=searcher -n search-engine

# Check Searcher service
kubectl get svc searcher -n search-engine

# Test connectivity from frontend pod
kubectl exec -it $(kubectl get pod -l app=frontend -n search-engine -o name | head -1) -n search-engine -- \
  wget -O- http://searcher:9002/health
```

### Database connection issues

```bash
# Check PostgreSQL is running
kubectl get pods -l app=postgres -n search-engine

# Check database logs
kubectl logs -l app=postgres -n search-engine

# Test connection
kubectl exec -it postgres-0 -n search-engine -- psql -U postgres -d databaseName -c "SELECT version();"
```

### No search results

```bash
# Check if database has data
kubectl exec -it postgres-0 -n search-engine -- psql -U postgres -d databaseName -c "SELECT COUNT(*) FROM SeenPages;"

# Check if Spider is crawling
kubectl logs -f deployment/spider -n search-engine

# Check if PageRank has run
kubectl exec -it postgres-0 -n search-engine -- psql -U postgres -d databaseName -c "SELECT COUNT(*) FROM PageRankResults WHERE is_latest = true;"
```

### HPA not scaling

```bash
# Check metrics server is installed
kubectl top nodes
kubectl top pods -n search-engine

# If not installed:
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Check HPA status
kubectl describe hpa frontend -n search-engine
```

## Scaling

### Manual Scaling

```bash
# Scale frontend
kubectl scale deployment frontend --replicas=5 -n search-engine

# Scale searcher
kubectl scale deployment searcher --replicas=3 -n search-engine
```

### Auto-scaling

HPA is configured for frontend:
- Min replicas: 2
- Max replicas: 10
- Target CPU: 70%
- Target Memory: 80%

## Backup and Restore

### Backup PostgreSQL

```bash
# Docker Compose
docker-compose exec postgres pg_dump -U postgres databaseName > backup.sql

# Kubernetes
kubectl exec postgres-0 -n search-engine -- pg_dump -U postgres databaseName > backup.sql
```

### Restore PostgreSQL

```bash
# Docker Compose
docker-compose exec -T postgres psql -U postgres databaseName < backup.sql

# Kubernetes
kubectl exec -i postgres-0 -n search-engine -- psql -U postgres databaseName < backup.sql
```

## Performance Tuning

### Database Tuning

Edit PostgreSQL config in `deployments/postgres.yaml`:

```yaml
env:
- name: POSTGRES_SHARED_BUFFERS
  value: "256MB"
- name: POSTGRES_EFFECTIVE_CACHE_SIZE
  value: "1GB"
- name: POSTGRES_WORK_MEM
  value: "16MB"
```

### Search Performance

The search now uses full-text indexing with GIN indices. To improve:

1. **Increase PostgreSQL memory** for better cache
2. **Add more Searcher replicas** for query distribution
3. **Use read replicas** for PostgreSQL
4. **Add caching layer** (Redis) for frequent queries

## Health Checks Summary

| Service      | Health Endpoint     | Port |
|--------------|-------------------|------|
| Frontend     | /health           | 8080 |
| Searcher     | /health (gRPC)    | 9002 |
| Spider       | /health (gRPC)    | 9001 |
| Conductor    | /health           | 8080 |
| Cartographer | /health           | 8080 |
| PostgreSQL   | pg_isready        | 5432 |
| Prometheus   | /-/healthy        | 9090 |
| Grafana      | /api/health       | 3000 |

## Next Steps

1. ✅ Deploy to local Docker Compose
2. ✅ Verify all services are healthy
3. ✅ Test search functionality
4. ✅ Deploy to Kubernetes
5. ✅ Configure monitoring dashboards
6. ⏳ Set up alerting rules
7. ⏳ Configure TLS/SSL for production
8. ⏳ Implement backup automation
9. ⏳ Load testing
10. ⏳ Production hardening

## Support

For issues or questions:
- Check logs: `kubectl logs -f deployment/<service> -n search-engine`
- Review metrics: http://localhost:9090 (Prometheus)
- Inspect database: http://localhost:8888 (Adminer)
