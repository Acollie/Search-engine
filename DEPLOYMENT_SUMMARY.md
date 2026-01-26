# Search Engine - Complete Deployment Summary

This document summarizes all deployment artifacts and provides quick reference for running the distributed search engine locally and in production.

## Quick Links

- **Local Dev Setup**: [Local Development with Docker Compose](#local-development-with-docker-compose)
- **Kubernetes Deployment**: [Kubernetes Deployment Guide](#kubernetes-deployment)
- **Monitoring Setup**: [Monitoring and Observability](#monitoring-and-observability)
- **Database Setup**: [Database Configuration](#database-configuration)
- **Troubleshooting**: [Troubleshooting Guide](#troubleshooting)

---

## Project Structure

### Deployment Artifacts

```
Search-engine/
├── docker-compose.yml                 # Core services (Spider, Conductor, Cartographer, Searcher)
├── docker-compose-monitoring.yml      # Monitoring stack (Prometheus, Grafana, AlertManager)
├── .env.local                         # Local development environment variables
│
├── deployments/                       # Kubernetes manifests
│   ├── README.md                      # Kubernetes quick start
│   ├── DEPLOYMENT_GUIDE.md            # Comprehensive deployment guide
│   ├── namespace.yaml                 # search-engine namespace
│   ├── configmap.yaml                 # Configuration and alert rules
│   ├── secrets.yaml                   # Credentials template
│   ├── postgres.yaml                  # PostgreSQL StatefulSet
│   ├── spider.yaml                    # Spider deployment
│   ├── conductor.yaml                 # Conductor deployment
│   ├── cartographer.yaml              # Cartographer CronJob
│   ├── searcher.yaml                  # Searcher deployment
│   ├── monitoring.yaml                # Prometheus, Grafana, AlertManager
│   └── ingress.yaml                   # Ingress configuration
│
├── scripts/                           # Database scripts
│   ├── README.md                      # Database setup guide
│   ├── 01-init-schema.sql            # Core schema creation
│   ├── 02-seed-data.sql              # Development data
│   ├── 03-migrations.sql             # Schema enhancements
│   └── maintenance.sql                # Maintenance utilities
│
└── monitoring/                        # Monitoring configuration
    ├── prometheus.yml                 # Prometheus scrape config
    ├── alerts.yml                     # Alerting rules
    ├── alertmanager.yml               # AlertManager config
    └── grafana/
        ├── datasources/
        │   └── prometheus.yml         # Grafana datasource
        ├── dashboards/
        │   ├── dashboards.yml         # Dashboard provisioning
        │   └── overview.json          # Overview dashboard
```

---

## Local Development with Docker Compose

### 1. Initial Setup

```bash
# Clone and navigate to project
cd /path/to/Search-engine

# Copy environment file
cp .env.local .env

# Build all images
docker-compose build

# Verify .env configuration
cat .env
```

### 2. Start Core Services

```bash
# Start Spider, Conductor, Cartographer, Searcher, PostgreSQL
docker-compose up -d

# Wait for services to be healthy
docker-compose ps

# Check logs
docker-compose logs -f spider
```

### 3. Start Monitoring Stack (Optional)

```bash
# In another terminal, start monitoring
docker-compose -f docker-compose.yml -f docker-compose-monitoring.yml up -d

# Or update docker-compose.yml to include monitoring services
```

### 4. Verify Services

```bash
# Check all containers
docker-compose ps

# All should show "healthy" or "running"
# If not healthy, check logs: docker-compose logs <service>
```

### 5. Access Services

| Service | URL | Purpose |
|---------|-----|---------|
| Grafana | http://localhost:3000 | Monitoring dashboards |
| Prometheus | http://localhost:9090 | Metrics database |
| Adminer | http://localhost:8888 | Database admin |
| AlertManager | http://localhost:9093 | Alert management |

**Credentials:**
- PostgreSQL: `postgres` / `postgres`
- Grafana: `admin` / `admin`

### 6. Stop Services

```bash
# Stop and remove containers (keep volumes)
docker-compose down

# Remove everything including volumes
docker-compose down -v

# View logs after stopping
docker-compose logs spider
```

---

## Kubernetes Deployment

### 1. Cluster Prerequisites

```bash
# Required versions and tools
- Kubernetes 1.24+
- kubectl configured
- Persistent Volume provisioner (EBS, local storage, etc.)
- Optional: NGINX Ingress Controller
- Optional: cert-manager for TLS
```

### 2. Deploy Namespace and Configuration

```bash
# Create namespace
kubectl apply -f deployments/namespace.yaml

# Create configuration
kubectl apply -f deployments/configmap.yaml

# Create secrets (update with real values first!)
kubectl apply -f deployments/secrets.yaml

# Verify
kubectl get namespace search-engine
kubectl get configmap -n search-engine
kubectl get secrets -n search-engine
```

### 3. Deploy Database

```bash
# Deploy PostgreSQL StatefulSet
kubectl apply -f deployments/postgres.yaml

# Wait for ready
kubectl rollout status statefulset/postgres -n search-engine --timeout=5m

# Verify tables created
kubectl exec -it postgres-0 -n search-engine -- \
  psql -U postgres -d databaseName -c "SELECT COUNT(*) FROM SeenPages;"
```

### 4. Deploy Core Services

```bash
# Deploy all four services
kubectl apply -f deployments/spider.yaml
kubectl apply -f deployments/conductor.yaml
kubectl apply -f deployments/cartographer.yaml
kubectl apply -f deployments/searcher.yaml

# Wait for deployments
kubectl rollout status deployment/spider -n search-engine --timeout=5m
kubectl rollout status deployment/conductor -n search-engine --timeout=5m
kubectl rollout status deployment/searcher -n search-engine --timeout=5m

# Check pod status
kubectl get pods -n search-engine
```

### 5. Deploy Monitoring

```bash
# Deploy Prometheus, Grafana, AlertManager
kubectl apply -f deployments/monitoring.yaml

# Verify monitoring pods
kubectl get pods -n search-engine -l app=prometheus,app=grafana,app=alertmanager
```

### 6. Configure Ingress

```bash
# Edit ingress with your domain names
vim deployments/ingress.yaml
# Update: search-engine.yourdomain.com and grafana.yourdomain.com

# Apply ingress
kubectl apply -f deployments/ingress.yaml

# Check ingress status
kubectl get ingress -n search-engine
```

### 7. Access Services

```bash
# Port forward for local access
kubectl port-forward -n search-engine svc/grafana 3000:3000 &
kubectl port-forward -n search-engine svc/prometheus 9090:9090 &
kubectl port-forward -n search-engine svc/searcher-api 9002:9002 &

# Or through Ingress (once configured)
# https://grafana.yourdomain.com
# https://search-engine.yourdomain.com
```

---

## Monitoring and Observability

### Prometheus

**Location:** `monitoring/prometheus.yml`

**Scrape Targets:**
- Spider (port 9090)
- Conductor (port 9090)
- Cartographer (port 9090)
- Searcher (port 9090)
- PostgreSQL metrics (optional)
- Node exporter (infrastructure metrics)

**Access:**
- Docker: http://localhost:9090
- Kubernetes: `kubectl port-forward svc/prometheus 9090:9090 -n search-engine`

### Grafana

**Dashboard:** Search Engine Overview

**Panels:**
1. System Throughput - Pages/queries per second
2. Service Status - Liveness indicators
3. Latency Metrics - p95 percentiles
4. Queue Depths - Processing backlog
5. Error Rates - Failure tracking

**Default Credentials:** admin/admin

**Access:**
- Docker: http://localhost:3000
- Kubernetes: `kubectl port-forward svc/grafana 3000:3000 -n search-engine`

### AlertManager

**Configuration:** `monitoring/alertmanager.yml`

**Alerts:**
- Service unavailable (critical)
- High failure rates (warning)
- Queue depth issues (warning)
- Database errors (warning)
- Latency spikes (warning)

**Configuration:**
- Critical alerts sent immediately
- Warning alerts grouped for 1m
- Info alerts grouped for 5m
- Supports email/Slack (commented out, enable as needed)

### Key Metrics to Monitor

**Spider:**
- `spider_pages_fetched_total` - Throughput
- `spider_pages_failed_total` - Failures
- `spider_queue_depth` - Backlog
- `spider_crawl_duration_seconds` - Latency

**Conductor:**
- `conductor_pages_received_total` - Ingestion rate
- `conductor_duplicate_pages_total` - Deduplication effectiveness
- `conductor_database_errors_total` - Database health
- `conductor_queue_depth` - Processing backlog

**Searcher:**
- `searcher_queries_processed_total` - Query throughput
- `searcher_query_duration_seconds` - Query latency
- `searcher_errors_total` - Query failures
- `searcher_cache_hits_total` - Cache performance

---

## Database Configuration

### Schema Overview

**Core Tables:**
1. `SeenPages` - Crawled web pages (13 indexes)
2. `Queue` - URLs to crawl (7 indexes)
3. `Links` - Link graph structure (4 indexes)
4. `PageRankResults` - Computed PageRank scores (4 indexes)
5. `SearchSessions` - Search query analytics (3 indexes)

**Extended Tables (optional):**
- `ServiceHealth` - Service status tracking
- `SearchIndex` - Optimized keyword indexing
- `CrawlStatistics` - Daily performance metrics
- `DomainReputation` - Domain scoring
- `ErrorLog` - Service error logs
- `PageRankHistory` - Score history

### Initialization

**Docker:**
```bash
# Automatically applied via docker-entrypoint-initdb.d
docker-compose up postgres
```

**Kubernetes:**
```bash
# Applied via StatefulSet init scripts
kubectl apply -f deployments/postgres.yaml
```

**Manual:**
```bash
# Apply scripts in order
psql -h localhost -U postgres -d databaseName < scripts/01-init-schema.sql
psql -h localhost -U postgres -d databaseName < scripts/02-seed-data.sql
psql -h localhost -U postgres -d databaseName < scripts/03-migrations.sql
```

### Backup and Restore

**Backup:**
```bash
# Docker
docker-compose exec postgres pg_dump -U postgres databaseName > backup.sql

# Kubernetes
kubectl exec postgres-0 -n search-engine -- \
  pg_dump -U postgres databaseName > backup.sql
```

**Restore:**
```bash
# Docker
docker-compose exec -T postgres psql -U postgres databaseName < backup.sql

# Kubernetes
kubectl exec -i postgres-0 -n search-engine -- \
  psql -U postgres databaseName < backup.sql
```

---

## Configuration

### Environment Variables

All services read from ConfigMap and Secrets:

**Database:**
- `DB_USER` - PostgreSQL username
- `DB_PASSWORD` - PostgreSQL password (secret)
- `DB_HOST` - PostgreSQL hostname
- `DB_NAME` - Database name (default: databaseName)

**Service Ports:**
- `SPIDER_GRPC_PORT` - Spider gRPC port (9001)
- `SPIDER_HEALTH_PORT` - Spider health port (8080)
- `CONDUCTOR_HEALTH_PORT` - Conductor health port (8080)
- `CARTOGRAPHER_HEALTH_PORT` - Cartographer health port (8080)
- `SEARCHER_GRPC_PORT` - Searcher gRPC port (9002)
- `SEARCHER_HEALTH_PORT` - Searcher health port (8080)

**Logging:**
- `LOG_LEVEL` - debug, info, warn, error
- `ENVIRONMENT` - local, staging, production

**AWS (if using SQS):**
- `QUEUE_URL` - SQS queue URL
- `AWS_REGION` - AWS region
- `AWS_ACCESS_KEY_ID` - AWS credentials (secret)
- `AWS_SECRET_ACCESS_KEY` - AWS credentials (secret)

### Update Configuration

**Docker:**
```bash
# Edit .env file
vim .env

# Recreate containers with new config
docker-compose up -d
```

**Kubernetes:**
```bash
# Edit ConfigMap
kubectl edit configmap search-engine-config -n search-engine

# Restart pods to apply changes
kubectl rollout restart deployment/spider -n search-engine
```

---

## Scaling Configuration

### Horizontal Scaling

**Docker:**
```bash
# Scale manually (limited by compose)
# Edit docker-compose.yml and rebuild
docker-compose up -d --scale spider=3
```

**Kubernetes:**
```bash
# Automatic scaling (HPA enabled)
kubectl get hpa -n search-engine

# Manual scaling
kubectl scale deployment spider --replicas=5 -n search-engine
```

### Resource Limits

Edit manifests to adjust for your cluster:

```yaml
resources:
  requests:
    cpu: 500m        # Minimum guaranteed
    memory: 512Mi
  limits:
    cpu: 2           # Maximum allowed
    memory: 1Gi
```

**Recommendations:**
- Spider: 500m-2 CPU, 512Mi-1Gi memory
- Conductor: 500m-2 CPU, 512Mi-1Gi memory
- Searcher: 500m-2 CPU, 512Mi-1Gi memory
- Cartographer: 1-4 CPU, 1Gi-4Gi memory

---

## Health Checks

### Service Endpoints

Each service exposes health checks on port 8080:

```bash
# Liveness probe (service running)
curl http://localhost:8080/healthz

# Readiness probe (ready to serve)
curl http://localhost:8080/ready
```

**Docker:**
```bash
docker-compose exec spider curl http://localhost:8080/healthz
```

**Kubernetes:**
```bash
kubectl exec spider-0 -n search-engine -- curl http://localhost:8080/healthz
```

### Database Health

```bash
# Docker
docker-compose exec postgres psql -U postgres -d databaseName -c "SELECT version();"

# Kubernetes
kubectl exec postgres-0 -n search-engine -- \
  psql -U postgres -d databaseName -c "SELECT version();"
```

---

## Troubleshooting

### Pod Not Starting

```bash
# Check pod status
kubectl describe pod <pod-name> -n search-engine

# Check logs
kubectl logs <pod-name> -n search-engine --previous

# Common issues:
# - Database not ready
# - Configuration missing
# - Image pull failure
```

### Database Connection Issues

```bash
# Test connectivity from pod
kubectl exec -it spider-0 -n search-engine -- \
  nc -zv postgres 5432

# Check database logs
kubectl logs postgres-0 -n search-engine

# Verify credentials in secrets
kubectl get secrets search-engine-secrets -n search-engine -o yaml
```

### Metrics Not Appearing

```bash
# Check Prometheus targets
kubectl port-forward svc/prometheus 9090:9090 -n search-engine
# Visit http://localhost:9090/targets

# Check service endpoints
kubectl get endpoints -n search-engine

# Verify service discovery
kubectl exec prometheus-0 -n search-engine -- \
  cat /etc/prometheus/prometheus.yml
```

### Memory Issues

```bash
# Check resource usage
kubectl top pods -n search-engine

# Check node capacity
kubectl top nodes

# Increase limits in manifests if needed
kubectl edit deployment spider -n search-engine
```

---

## Production Checklist

- [ ] Update database credentials in secrets.yaml
- [ ] Update AWS credentials (if using SQS)
- [ ] Configure Ingress domain names
- [ ] Install TLS certificates (cert-manager)
- [ ] Set up persistent volume storage
- [ ] Configure AlertManager notifications
- [ ] Set appropriate resource requests/limits
- [ ] Enable network policies
- [ ] Configure pod security policies
- [ ] Set up log aggregation (ELK/Loki)
- [ ] Enable backup strategy
- [ ] Configure additional Grafana dashboards
- [ ] Test failover scenarios
- [ ] Load testing and performance tuning

---

## Quick Command Reference

### Docker Commands

```bash
# View status
docker-compose ps

# View logs
docker-compose logs -f <service>

# Run command in container
docker-compose exec <service> <command>

# Scale service
docker-compose up -d --scale spider=3

# Remove everything
docker-compose down -v
```

### Kubernetes Commands

```bash
# View resources
kubectl get all -n search-engine

# View logs
kubectl logs -f <pod> -n search-engine

# Execute command
kubectl exec -it <pod> -n search-engine -- <command>

# Port forward
kubectl port-forward svc/<service> 3000:3000 -n search-engine

# Scale deployment
kubectl scale deployment spider --replicas=5 -n search-engine

# Restart deployment
kubectl rollout restart deployment/spider -n search-engine

# View events
kubectl get events -n search-engine --sort-by='.lastTimestamp'
```

---

## Additional Resources

1. **Detailed Deployment Guide**: `deployments/DEPLOYMENT_GUIDE.md`
2. **Kubernetes Setup**: `deployments/README.md`
3. **Database Management**: `scripts/README.md`
4. **Docker Compose**: `docker-compose.yml`, `docker-compose-monitoring.yml`
5. **CLAUDE.md**: Project-specific development guidelines

---

## Support and Debugging

### Log Locations

**Docker:**
```bash
docker-compose logs -f spider
docker-compose logs -f conductor
docker-compose logs -f cartographer
docker-compose logs -f searcher
docker-compose logs -f postgres
```

**Kubernetes:**
```bash
kubectl logs -f <pod> -n search-engine
kubectl logs -f <pod> -n search-engine --previous  # Previous run
```

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 5432, 8080, 8888, 9001, 9002, 9090, 9093 are available
2. **Database not initializing**: Check PostgreSQL logs, verify init scripts in volume
3. **Services not communicating**: Check network connectivity, DNS resolution, firewall rules
4. **Metrics not collected**: Verify Prometheus scrape config, check service endpoints
5. **Out of memory**: Adjust resource limits, enable memory-efficient modes

### Performance Tuning

1. **Database**: Tune PostgreSQL parameters, create appropriate indexes
2. **Services**: Adjust resource requests/limits, implement caching
3. **Monitoring**: Filter metrics, adjust scrape intervals, optimize dashboards
4. **Network**: Enable compression, use connection pooling

---

Last Updated: 2024
For the latest information, see project repository and CLAUDE.md
