# Search Engine Deployment Guide

Complete guide for deploying the distributed search engine to local Docker or Kubernetes environments.

## Table of Contents

1. [Local Development with Docker Compose](#local-development-with-docker-compose)
2. [Kubernetes Deployment](#kubernetes-deployment)
3. [Configuration](#configuration)
4. [Monitoring and Observability](#monitoring-and-observability)
5. [Troubleshooting](#troubleshooting)
6. [Database Management](#database-management)
7. [Production Considerations](#production-considerations)

---

## Local Development with Docker Compose

### Prerequisites

- Docker 20.10+
- Docker Compose 2.0+
- At least 8GB RAM available for containers
- 50GB disk space for database

### Quick Start

1. **Clone the repository and navigate to the project root:**

```bash
cd /path/to/Search-engine
```

2. **Copy environment file:**

```bash
cp .env.local .env
```

3. **Build all service images:**

```bash
docker-compose build
```

4. **Start the core services:**

```bash
docker-compose up -d
```

5. **Wait for services to be healthy:**

```bash
docker-compose ps

# All services should show "healthy" status
```

6. **Verify database initialization:**

```bash
docker-compose exec postgres psql -U postgres -d databaseName -c "SELECT COUNT(*) FROM SeenPages;"
```

### Starting the Monitoring Stack

In a separate terminal, start monitoring services:

```bash
docker-compose -f docker-compose.yml -f docker-compose-monitoring.yml up -d
```

This adds:
- **Prometheus** (http://localhost:9090) - Metrics collection
- **Grafana** (http://localhost:3000) - Dashboards (admin/admin)
- **AlertManager** - Alert routing and management

### Accessing Services

| Service | URL | Description |
|---------|-----|-------------|
| Grafana | http://localhost:3000 | Monitoring dashboards |
| Prometheus | http://localhost:9090 | Metrics database |
| Adminer | http://localhost:8888 | Database admin UI |
| AlertManager | http://localhost:9093 | Alert management |

**Credentials:**
- PostgreSQL: postgres/postgres
- Grafana: admin/admin

### Stopping Services

```bash
# Stop monitoring stack
docker-compose -f docker-compose.yml -f docker-compose-monitoring.yml down

# Stop all services
docker-compose down

# Remove volumes (clears data)
docker-compose down -v
```

### Viewing Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f spider
docker-compose logs -f conductor
docker-compose logs -f cartographer
docker-compose logs -f searcher
```

---

## Kubernetes Deployment

### Prerequisites

- Kubernetes 1.24+
- kubectl configured to access your cluster
- Persistent Volume provisioner (e.g., EBS, local storage)
- RBAC enabled
- Ingress controller (nginx-ingress recommended)

### Cluster Setup

#### 1. Create namespace and apply base resources

```bash
# Apply all manifests
kubectl apply -f deployments/namespace.yaml
kubectl apply -f deployments/configmap.yaml
kubectl apply -f deployments/secrets.yaml

# Verify namespace creation
kubectl get namespace search-engine
```

#### 2. Update secrets with production values

Before deploying to production, update credentials in `deployments/secrets.yaml`:

```bash
# Edit secrets
kubectl edit secret search-engine-secrets -n search-engine

# Or create from file with base64 encoding
# DB_USER=myuser, DB_PASSWORD=mypass, GRAFANA_PASSWORD=mygrafanapass
kubectl create secret generic search-engine-secrets \
  --from-literal=DB_USER=myuser \
  --from-literal=DB_PASSWORD=mypass \
  --from-literal=GRAFANA_PASSWORD=mygrafanapass \
  -n search-engine --dry-run=client -o yaml | kubectl apply -f -
```

#### 3. Deploy PostgreSQL

```bash
kubectl apply -f deployments/postgres.yaml

# Wait for StatefulSet to be ready
kubectl rollout status statefulset/postgres -n search-engine --timeout=5m

# Verify database initialization
kubectl exec -it postgres-0 -n search-engine -- \
  psql -U postgres -d databaseName -c "SELECT COUNT(*) FROM SeenPages;"
```

#### 4. Deploy Core Services

```bash
# Deploy all services
kubectl apply -f deployments/spider.yaml
kubectl apply -f deployments/conductor.yaml
kubectl apply -f deployments/cartographer.yaml
kubectl apply -f deployments/searcher.yaml

# Monitor rollout
kubectl rollout status deployment/spider -n search-engine --timeout=5m
kubectl rollout status deployment/conductor -n search-engine --timeout=5m
kubectl rollout status deployment/searcher -n search-engine --timeout=5m

# Check all pods
kubectl get pods -n search-engine
```

#### 5. Deploy Monitoring Stack

```bash
kubectl apply -f deployments/monitoring.yaml

# Verify monitoring services
kubectl get pods -n search-engine -l app=prometheus,app=grafana,app=alertmanager
```

#### 6. Configure Ingress

Update domain names in `deployments/ingress.yaml`:

```yaml
- host: search-engine.yourdomain.com
- host: grafana.yourdomain.com
```

Then apply:

```bash
kubectl apply -f deployments/ingress.yaml
```

### Verifying Deployment

```bash
# Check all resources
kubectl get all -n search-engine

# Check pod status
kubectl get pods -n search-engine -w

# Check service endpoints
kubectl get svc -n search-engine

# Check for errors
kubectl get events -n search-engine --sort-by='.lastTimestamp'

# Check logs
kubectl logs -n search-engine -l app=spider --tail=50 -f
```

### Accessing Services

Once Ingress is configured with DNS:

```bash
# Port-forward for local access without Ingress
kubectl port-forward -n search-engine svc/grafana 3000:3000
kubectl port-forward -n search-engine svc/prometheus 9090:9090
kubectl port-forward -n search-engine svc/searcher-api 9002:9002
```

---

## Configuration

### Environment Variables

All services read from `ConfigMap` (search-engine-config) and `Secret` (search-engine-secrets).

**Database Configuration:**
- `DB_USER` - PostgreSQL username
- `DB_PASSWORD` - PostgreSQL password (secret)
- `DB_HOST` - PostgreSQL hostname
- `DB_NAME` - Database name

**Service Configuration:**
- `SPIDER_GRPC_PORT` - Spider gRPC port (default: 9001)
- `SPIDER_HEALTH_PORT` - Spider health check port (default: 8080)
- `CONDUCTOR_HEALTH_PORT` - Conductor health check port (default: 8080)
- `CARTOGRAPHER_HEALTH_PORT` - Cartographer health check port (default: 8080)
- `SEARCHER_GRPC_PORT` - Searcher gRPC port (default: 9002)
- `SEARCHER_HEALTH_PORT` - Searcher health check port (default: 8080)

**AWS Configuration:**
- `QUEUE_URL` - SQS queue URL
- `AWS_REGION` - AWS region
- `AWS_ACCESS_KEY_ID` - AWS credentials (secret, optional)
- `AWS_SECRET_ACCESS_KEY` - AWS credentials (secret, optional)

**Logging:**
- `LOG_LEVEL` - Logging level (debug, info, warn, error)
- `ENVIRONMENT` - Environment name (local, staging, production)

### Scaling Configuration

Adjust replicas in deployment manifests:

```bash
# Edit deployment
kubectl edit deployment spider -n search-engine

# Or patch directly
kubectl patch deployment spider -p '{"spec":{"replicas":5}}' -n search-engine
```

### Resource Limits

Update resource requests/limits in manifests for your cluster capacity:

```yaml
resources:
  requests:
    cpu: 500m
    memory: 512Mi
  limits:
    cpu: 2
    memory: 1Gi
```

---

## Monitoring and Observability

### Prometheus Metrics

Each service exposes metrics on port 9090 at `/metrics` endpoint.

**Key metrics to monitor:**

Spider:
- `spider_pages_fetched_total` - Total pages crawled
- `spider_pages_failed_total` - Failed crawl attempts
- `spider_queue_depth` - Current queue size
- `spider_crawl_duration_seconds` - Crawl latency histogram

Conductor:
- `conductor_pages_received_total` - Pages from Spider
- `conductor_duplicate_pages_total` - Duplicate detections
- `conductor_database_errors_total` - Database errors
- `conductor_queue_depth` - Processing queue depth

Searcher:
- `searcher_queries_processed_total` - Total queries processed
- `searcher_query_duration_seconds` - Query latency histogram
- `searcher_errors_total` - Query errors
- `searcher_cache_hits_total` - Cache performance

### Grafana Dashboards

Default dashboard: **Search Engine Overview**

Shows:
- System throughput (pages/queries per second)
- Service status indicators (up/down)
- Latency metrics (p95 percentiles)
- Queue depths
- Error rates

To create additional dashboards:

1. Go to http://grafana.yourdomain.com
2. Click "Create Dashboard"
3. Select "Prometheus" data source
4. Build panels with queries:

```promql
# Pages crawled per minute
rate(spider_pages_fetched_total[1m])

# Error rate
rate(spider_pages_failed_total[5m]) / rate(spider_pages_fetched_total[5m])

# Query latency p95
histogram_quantile(0.95, rate(searcher_query_duration_seconds_bucket[5m]))
```

### Alert Rules

Alerts are defined in `deployments/configmap.yaml` under `alert-rules.yml`.

**Active alerts:**

| Alert | Condition | Severity |
|-------|-----------|----------|
| ServiceDown | Service unavailable for 2m | Critical |
| SpiderHighFailureRate | >10% failures over 5m | Warning |
| SpiderQueueDepthHigh | Queue > 10K items for 10m | Warning |
| ConductorDatabaseErrorRate | >0.01 errors/sec | Warning |
| SearcherQueryLatencyHigh | p95 > 5s for 5m | Warning |
| HighErrorRate | Overall error rate > 10% | Critical |

To add more alerts, edit the ConfigMap:

```bash
kubectl edit configmap alert-rules -n search-engine
```

---

## Troubleshooting

### Service Health Checks

```bash
# Check pod readiness
kubectl get pods -n search-engine -o wide

# Check service endpoints
kubectl get endpoints -n search-engine

# Test connectivity
kubectl run -it --rm debug --image=curlimages/curl -n search-engine --restart=Never -- \
  curl http://spider:8080/healthz
```

### Database Issues

```bash
# Connect to PostgreSQL
kubectl exec -it postgres-0 -n search-engine -- \
  psql -U postgres -d databaseName

# Check table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

# Check active connections
SELECT * FROM pg_stat_activity;
```

### Log Analysis

```bash
# Recent errors
kubectl logs -n search-engine -l app=spider --tail=100 | grep -i error

# All service logs with timestamps
kubectl logs -n search-engine -l app=spider --timestamps=true --tail=200

# Stream logs from multiple pods
kubectl logs -n search-engine -l app=spider -f --max-log-requests=10
```

### Pod Debugging

```bash
# Describe pod for events
kubectl describe pod spider-abc123 -n search-engine

# Get pod YAML
kubectl get pod spider-abc123 -n search-engine -o yaml

# Execute commands in pod
kubectl exec -it spider-abc123 -n search-engine -- /bin/sh

# Port-forward for local testing
kubectl port-forward spider-abc123 8080:8080 -n search-engine
```

### Common Issues

**Pod CrashLoopBackOff:**
```bash
# Check startup logs
kubectl logs spider-abc123 -n search-engine --previous

# Check resource availability
kubectl describe node <node-name>
```

**Database Connection Failures:**
```bash
# Verify PostgreSQL is running
kubectl get statefulset postgres -n search-engine

# Check PostgreSQL logs
kubectl logs postgres-0 -n search-engine
```

**Metrics Not Appearing in Prometheus:**
```bash
# Verify Prometheus scrape config
kubectl exec prometheus-abc123 -n search-engine -- \
  cat /etc/prometheus/prometheus.yml

# Check Prometheus targets
curl http://prometheus:9090/api/v1/targets
```

---

## Database Management

### Backups

**Manual backup:**

```bash
kubectl exec -it postgres-0 -n search-engine -- \
  pg_dump -U postgres databaseName > backup-$(date +%Y%m%d).sql
```

**Automated backups (Kubernetes CronJob):**

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: postgres-backup
  namespace: search-engine
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: backup
              image: postgres:15-alpine
              command:
                - sh
                - -c
                - pg_dump -h postgres -U postgres databaseName | gzip > /backups/db-$(date +\%Y\%m\%d-\%H\%M\%S).sql.gz
              volumeMounts:
                - name: backup-storage
                  mountPath: /backups
          volumes:
            - name: backup-storage
              persistentVolumeClaim:
                claimName: postgres-backups
          restartPolicy: OnFailure
```

### Restore

```bash
# From file
kubectl exec -i postgres-0 -n search-engine -- \
  psql -U postgres databaseName < backup.sql

# Restore from backup in pod
kubectl cp backup.sql search-engine/postgres-0:/tmp/backup.sql
kubectl exec postgres-0 -n search-engine -- \
  psql -U postgres databaseName < /tmp/backup.sql
```

### Migrations

```bash
# Apply schema changes
kubectl exec -i postgres-0 -n search-engine -- \
  psql -U postgres databaseName < migrations/001-initial-schema.sql
```

---

## Production Considerations

### Security

1. **Use secret management:**
   - AWS Secrets Manager
   - HashiCorp Vault
   - Sealed Secrets in Kubernetes

2. **Enable TLS:**
   - Use cert-manager for automatic certificate management
   - Enable gRPC TLS between services
   - Use HTTPS for all external endpoints

3. **RBAC:**
   - Restrict service account permissions
   - Implement pod security policies
   - Use network policies to limit traffic

4. **Secrets:**
   - Never commit secrets to git
   - Rotate credentials regularly
   - Use external secret stores

### High Availability

1. **Database:**
   - Use PostgreSQL replication (Primary-Replica)
   - Enable connection pooling (PgBouncer)
   - Configure automated failover

2. **Services:**
   - Deploy multiple replicas
   - Use pod disruption budgets
   - Configure horizontal pod autoscaling

3. **Monitoring:**
   - Set up alerting for all critical metrics
   - Configure log aggregation (ELK, Loki)
   - Use distributed tracing (Jaeger, Zipkin)

### Performance Tuning

1. **Database:**
   - Tune PostgreSQL parameters
   - Create appropriate indexes
   - Enable connection pooling

2. **Services:**
   - Adjust resource requests/limits
   - Implement caching strategies
   - Use connection pooling

3. **Network:**
   - Use service mesh (Istio, Linkerd)
   - Implement rate limiting
   - Configure load balancing

### Compliance

1. **Data:**
   - Implement data retention policies
   - Enable encryption at rest
   - Comply with privacy regulations (GDPR, CCPA)

2. **Logging:**
   - Maintain audit logs
   - Implement log retention policies
   - Secure log storage

---

## Quick Reference

### Common Kubectl Commands

```bash
# Apply manifests
kubectl apply -f deployments/

# View resources
kubectl get all -n search-engine
kubectl describe pod spider-0 -n search-engine

# Logs
kubectl logs spider-0 -n search-engine
kubectl logs -f spider-0 -n search-engine

# Port forwarding
kubectl port-forward svc/grafana 3000:3000 -n search-engine

# Scaling
kubectl scale deployment spider --replicas=5 -n search-engine

# Rolling restart
kubectl rollout restart deployment/spider -n search-engine

# Delete resources
kubectl delete deployment spider -n search-engine
```

### Monitoring Commands

```bash
# Check metrics
kubectl exec -it prometheus-0 -n search-engine -- \
  promtool query instant 'up{job="spider"}'

# Alerts
kubectl get alert -n search-engine
```

---

For additional help, check service-specific documentation in each service's README or contact the DevOps team.
