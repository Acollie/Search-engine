# Deployment Index - Complete Reference Guide

Quick index of all deployment files, configurations, and documentation for the distributed search engine.

## Table of Contents

1. [Getting Started](#getting-started)
2. [File Organization](#file-organization)
3. [Quick Reference](#quick-reference)
4. [Detailed Documentation](#detailed-documentation)
5. [Configuration Files](#configuration-files)
6. [Database Scripts](#database-scripts)
7. [Common Tasks](#common-tasks)
8. [Troubleshooting](#troubleshooting)

---

## Getting Started

### First Time? Start Here

1. **Read:** [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md) - 10-minute overview
2. **Local Dev:** [docker-compose setup](#docker-compose-local-development)
3. **Production:** [Kubernetes setup](#kubernetes-deployment)
4. **Monitoring:** [Set up Grafana/Prometheus](#monitoring-stack)

### Prerequisites

**For Local Development:**
- Docker 20.10+ and Docker Compose 2.0+
- 8GB RAM, 50GB disk space

**For Kubernetes:**
- Kubernetes 1.24+
- kubectl configured
- Persistent Volume provisioner
- Optional: Ingress controller, cert-manager

---

## File Organization

### Root Level Files

| File | Purpose |
|------|---------|
| `DEPLOYMENT_SUMMARY.md` | Quick reference guide (read first!) |
| `DEPLOYMENT_INDEX.md` | This file - navigation guide |
| `docker-compose.yml` | Local dev stack (all 4 services + PostgreSQL) |
| `docker-compose-monitoring.yml` | Monitoring stack (Prometheus, Grafana, AlertManager) |
| `.env.local` | Environment variables for local development |

### Kubernetes Manifests (`deployments/`)

| File | Component | Description |
|------|-----------|-------------|
| `namespace.yaml` | Setup | Creates search-engine namespace |
| `configmap.yaml` | Setup | Configuration and alert rules for all services |
| `secrets.yaml` | Setup | Credentials template (update before use) |
| `postgres.yaml` | Database | PostgreSQL StatefulSet with 50Gi PVC |
| `spider.yaml` | Service | Spider deployment (2 replicas, auto-scales to 10) |
| `conductor.yaml` | Service | Conductor deployment (2 replicas, auto-scales to 8) |
| `cartographer.yaml` | Service | Cartographer CronJob (runs every 6 hours) |
| `searcher.yaml` | Service | Searcher deployment (3 replicas, auto-scales to 15) |
| `monitoring.yaml` | Monitoring | Prometheus, Grafana, AlertManager |
| `ingress.yaml` | Networking | Ingress rules and network policies |
| `README.md` | Guide | Kubernetes quick start |
| `DEPLOYMENT_GUIDE.md` | Guide | Comprehensive deployment instructions |

### Database Scripts (`scripts/`)

| File | Purpose |
|------|---------|
| `01-init-schema.sql` | Create core schema (tables, indexes, constraints) |
| `02-seed-data.sql` | Populate development data |
| `03-migrations.sql` | Apply incremental schema enhancements |
| `maintenance.sql` | Monitoring and maintenance utilities |
| `README.md` | Database setup and management guide |

### Monitoring Configuration (`monitoring/`)

| File | Purpose |
|------|---------|
| `prometheus.yml` | Prometheus scrape configuration |
| `alerts.yml` | Alerting rules for all services |
| `alertmanager.yml` | Alert routing and notification config |
| `grafana/datasources/prometheus.yml` | Grafana datasource setup |
| `grafana/dashboards/dashboards.yml` | Dashboard provisioning config |
| `grafana/dashboards/overview.json` | System overview dashboard |

---

## Quick Reference

### Docker Compose (Local Development)

**Start:**
```bash
cp .env.local .env
docker-compose build
docker-compose up -d
```

**Monitor:**
```bash
docker-compose ps
docker-compose logs -f spider
```

**Stop:**
```bash
docker-compose down
```

**With monitoring:**
```bash
docker-compose -f docker-compose.yml -f docker-compose-monitoring.yml up -d
```

### Kubernetes (Production)

**Deploy:**
```bash
# 1. Setup
kubectl apply -f deployments/namespace.yaml
kubectl apply -f deployments/configmap.yaml
kubectl apply -f deployments/secrets.yaml

# 2. Database
kubectl apply -f deployments/postgres.yaml

# 3. Services
kubectl apply -f deployments/spider.yaml
kubectl apply -f deployments/conductor.yaml
kubectl apply -f deployments/cartographer.yaml
kubectl apply -f deployments/searcher.yaml

# 4. Monitoring
kubectl apply -f deployments/monitoring.yaml

# 5. Ingress
kubectl apply -f deployments/ingress.yaml
```

**Verify:**
```bash
kubectl get pods -n search-engine
kubectl get svc -n search-engine
kubectl get ingress -n search-engine
```

**Port forward:**
```bash
kubectl port-forward svc/grafana 3000:3000 -n search-engine
kubectl port-forward svc/prometheus 9090:9090 -n search-engine
```

### Database

**Local setup:**
```bash
# Docker - automatic via init scripts
docker-compose up postgres

# Manual - connect and apply
psql -h localhost -U postgres -d databaseName < scripts/01-init-schema.sql
psql -h localhost -U postgres -d databaseName < scripts/02-seed-data.sql
```

**Kubernetes setup:**
```bash
# Automatic via StatefulSet
kubectl apply -f deployments/postgres.yaml

# Verify
kubectl exec -it postgres-0 -n search-engine -- \
  psql -U postgres -d databaseName -c "SELECT COUNT(*) FROM SeenPages;"
```

**Backup:**
```bash
# Docker
docker-compose exec postgres pg_dump -U postgres databaseName > backup.sql

# Kubernetes
kubectl exec postgres-0 -n search-engine -- \
  pg_dump -U postgres databaseName > backup.sql
```

---

## Detailed Documentation

### Main Documentation

- **[DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md)**
  - Complete overview
  - Quick links to all sections
  - Configuration reference
  - Troubleshooting guide
  - Production checklist

### Kubernetes Documentation

- **[deployments/README.md](./deployments/README.md)**
  - Quick start guide
  - File structure overview
  - Common kubectl commands
  - Scaling and performance tuning

- **[deployments/DEPLOYMENT_GUIDE.md](./deployments/DEPLOYMENT_GUIDE.md)**
  - Step-by-step deployment
  - Configuration details
  - Monitoring setup
  - Database management
  - Production considerations
  - Troubleshooting procedures

### Database Documentation

- **[scripts/README.md](./scripts/README.md)**
  - Schema overview
  - Table descriptions
  - Migration information
  - Performance tuning
  - Backup and restore procedures
  - Maintenance scripts

### Project Documentation

- **[CLAUDE.md](./CLAUDE.md)**
  - Project overview
  - Development commands
  - Code structure
  - Testing patterns
  - Service architecture

---

## Configuration Files

### Docker Compose

**[docker-compose.yml](./docker-compose.yml)**
- Spider service (port 9001 gRPC, 8001 health)
- Conductor service (port 8002 health)
- Cartographer service (port 8003 health)
- Searcher service (port 9002 gRPC, 8004 health)
- PostgreSQL (port 5432)
- Network: search-engine bridge
- Health checks for all services
- Volume mounts for data persistence

**[docker-compose-monitoring.yml](./docker-compose-monitoring.yml)**
- Prometheus (port 9090)
- Grafana (port 3000)
- AlertManager (port 9093)
- Node Exporter
- cAdvisor
- Redis (optional caching)

**[.env.local](./.env.local)**
- Database credentials (postgres/postgres)
- Service port configuration
- Grafana admin password (admin)
- Log level and environment settings

### Kubernetes ConfigMaps

**[deployments/configmap.yaml](./deployments/configmap.yaml)**
- `search-engine-config`: Service configuration
- `prometheus-config`: Prometheus scrape configuration
- `alert-rules`: Prometheus alerting rules

### Kubernetes Secrets

**[deployments/secrets.yaml](./deployments/secrets.yaml)** (TEMPLATE - UPDATE BEFORE USE)
- `search-engine-secrets`: Database and service credentials
- `postgres-backup-credentials`: Backup credentials
- `grpc-tls-certs`: Optional TLS certificates

### Database Configuration

**[scripts/01-init-schema.sql](./scripts/01-init-schema.sql)**
- SeenPages table (full-text search enabled)
- Queue table (priority and retry support)
- Links table (graph structure)
- PageRankResults table (versioned scores)
- SearchSessions table (analytics)
- Comprehensive indexes for query optimization

**[scripts/02-seed-data.sql](./scripts/02-seed-data.sql)**
- 13 sample web pages
- 8 queue items
- 14 links for graph structure
- Initial PageRank scores
- 10 search sessions

**[scripts/03-migrations.sql](./scripts/03-migrations.sql)**
- Service health tracking
- URL classification (spam, duplicates)
- Crawl metadata (redirects, canonical URLs)
- Queue improvements (backoff, scheduling)
- Search optimization tables
- Crawl statistics
- Domain reputation
- Error logging
- PageRank history

**[scripts/maintenance.sql](./scripts/maintenance.sql)**
- Vacuuming and autovacuum configuration
- Cleanup operations
- Statistics and analysis queries
- Performance tuning scripts
- Connection monitoring
- Data integrity checks
- Backup verification

### Monitoring Configuration

**[monitoring/prometheus.yml](./monitoring/prometheus.yml)**
- Global settings (15s scrape interval)
- Alert manager configuration
- Scrape configs for all 4 services
- Kubernetes service discovery
- Node and pod monitoring

**[monitoring/alerts.yml](./monitoring/alerts.yml)**
- Service availability alerts (critical)
- Spider-specific alerts (failure rate, queue depth, latency)
- Conductor alerts (duplicate rate, database errors)
- Searcher alerts (query latency, error rate)
- Database connection pool alerts
- System error rate alerts

**[monitoring/alertmanager.yml](./monitoring/alertmanager.yml)**
- Alert routing (critical, warning, info)
- Grouping and deduplication rules
- Inhibition rules to reduce noise
- Receiver configurations (commented out templates for email/Slack)

**[monitoring/grafana/datasources/prometheus.yml](./monitoring/grafana/datasources/prometheus.yml)**
- Prometheus datasource configuration
- Proxy access mode
- 15s time interval

**[monitoring/grafana/dashboards/overview.json](./monitoring/grafana/dashboards/overview.json)**
- System Throughput panel (pages/queries per second)
- Service Status panels (Spider, Conductor, Cartographer, Searcher)
- Latency Metrics panel (p95 percentiles)
- Queue Depths panel
- Error Rates panel

---

## Database Scripts

### Schema Creation

**Location:** `scripts/01-init-schema.sql`

**Tables Created:**
- `SeenPages` - Crawled pages (full-text search via tsvector)
- `Queue` - URLs to crawl (priority and retry logic)
- `Links` - Link graph structure
- `PageRankResults` - Computed PageRank scores
- `SearchSessions` - Search query analytics

**Indexes:** 35+ indexes for optimal query performance

### Seed Data

**Location:** `scripts/02-seed-data.sql`

**Data Inserted:**
- 13 sample pages from example.com, wikipedia.org, github.com
- 8 queue items with varying priorities
- 14 links establishing graph structure
- Initial PageRank scores (version 1)
- 10 search sessions for analytics

**Use:** Populate development database for local testing

### Migrations

**Location:** `scripts/03-migrations.sql`

**Migrations Applied:**
1. Service health tracking
2. URL classification
3. Crawl metadata
4. Queue improvements
5. Search optimization
6. Crawl statistics
7. Domain reputation
8. Error logging
9. PageRank history
10. Migration status tracking

**Idempotent:** Safe to run multiple times

### Maintenance

**Location:** `scripts/maintenance.sql`

**Utilities Provided:**
- Vacuum and autovacuum configuration
- Table and index size analysis
- Query performance monitoring
- Connection pooling statistics
- Cache hit ratio analysis
- Data integrity checks
- Crawl and search analytics

---

## Common Tasks

### Local Development Setup

```bash
# 1. Copy environment
cp .env.local .env

# 2. Build images
docker-compose build

# 3. Start services
docker-compose up -d

# 4. Start monitoring (optional)
docker-compose -f docker-compose.yml -f docker-compose-monitoring.yml up -d

# 5. Access services
# Grafana: http://localhost:3000 (admin/admin)
# Prometheus: http://localhost:9090
# Adminer: http://localhost:8888 (postgres/postgres)
```

### Kubernetes Deployment

```bash
# 1. Prepare secrets
vim deployments/secrets.yaml  # Update credentials

# 2. Apply manifests
kubectl apply -f deployments/

# 3. Wait for readiness
kubectl rollout status deployment/spider -n search-engine

# 4. Access services
kubectl port-forward svc/grafana 3000:3000 -n search-engine

# 5. View dashboard
# http://localhost:3000 (admin/admin)
```

### Scale Services

**Docker:**
```bash
docker-compose up -d --scale spider=3
```

**Kubernetes:**
```bash
kubectl scale deployment spider --replicas=5 -n search-engine
```

### Database Backup

**Docker:**
```bash
docker-compose exec postgres pg_dump -U postgres databaseName | gzip > backup.sql.gz
```

**Kubernetes:**
```bash
kubectl exec postgres-0 -n search-engine -- pg_dump -U postgres databaseName | gzip > backup.sql.gz
```

### Database Restore

**Docker:**
```bash
gunzip < backup.sql.gz | docker-compose exec -T postgres psql -U postgres databaseName
```

**Kubernetes:**
```bash
gunzip < backup.sql.gz | kubectl exec -i postgres-0 -n search-engine -- psql -U postgres databaseName
```

### View Logs

**Docker:**
```bash
docker-compose logs -f spider
docker-compose logs -f conductor
docker-compose logs -f searcher
docker-compose logs -f cartographer
```

**Kubernetes:**
```bash
kubectl logs -f deployment/spider -n search-engine
kubectl logs -f deployment/conductor -n search-engine
kubectl logs -f deployment/searcher -n search-engine
kubectl logs -f pod/cartographer-xxxxx -n search-engine
```

### Check Health

**Docker:**
```bash
docker-compose exec spider curl http://localhost:8080/healthz
docker-compose exec conductor curl http://localhost:8080/healthz
```

**Kubernetes:**
```bash
kubectl get pods -n search-engine
kubectl describe pod spider-xxxxx -n search-engine
kubectl exec spider-xxxxx -n search-engine -- curl http://localhost:8080/healthz
```

---

## Troubleshooting

### Service Not Starting

1. **Check logs:**
   - Docker: `docker-compose logs <service>`
   - Kubernetes: `kubectl logs <pod> -n search-engine`

2. **Check configuration:**
   - Docker: `cat .env`
   - Kubernetes: `kubectl get configmap search-engine-config -n search-engine -o yaml`

3. **Check dependencies:**
   - Docker: `docker-compose ps`
   - Kubernetes: `kubectl get pods -n search-engine`

### Database Connection Issues

1. **Check connectivity:**
   ```bash
   docker-compose exec spider nc -zv postgres 5432
   # or
   kubectl exec spider-0 -n search-engine -- nc -zv postgres 5432
   ```

2. **Check credentials:**
   - Verify in .env (Docker) or secrets (Kubernetes)

3. **Check database status:**
   ```bash
   docker-compose exec postgres psql -U postgres -c "SELECT version();"
   # or
   kubectl exec postgres-0 -n search-engine -- psql -U postgres -c "SELECT version();"
   ```

### Metrics Not Showing

1. **Check Prometheus targets:**
   - Navigate to http://localhost:9090/targets
   - Verify all services show "UP"

2. **Check service metrics endpoint:**
   ```bash
   curl http://localhost:9090/metrics
   ```

3. **Check Prometheus config:**
   - Docker: Check `monitoring/prometheus.yml`
   - Kubernetes: `kubectl get configmap prometheus-config -n search-engine -o yaml`

### Out of Memory

1. **Check resource usage:**
   ```bash
   # Docker
   docker stats

   # Kubernetes
   kubectl top pods -n search-engine
   kubectl top nodes
   ```

2. **Increase limits:**
   - Edit docker-compose.yml (Docker) or deployments/*.yaml (Kubernetes)

3. **Identify memory leak:**
   - Check service logs
   - Monitor memory trend in Grafana

### Slow Queries

1. **Check query performance:**
   ```bash
   # Run maintenance script
   psql -h localhost -U postgres -d databaseName < scripts/maintenance.sql
   ```

2. **Check indexes:**
   - Verify indexes exist in `01-init-schema.sql`
   - Analyze table statistics: `ANALYZE;`

3. **Check table sizes:**
   - Identify large tables
   - Consider partitioning or archiving old data

---

## Summary

This index provides quick navigation to all deployment resources. For detailed information:

- **Getting started:** See [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md)
- **Kubernetes:** See [deployments/DEPLOYMENT_GUIDE.md](./deployments/DEPLOYMENT_GUIDE.md)
- **Database:** See [scripts/README.md](./scripts/README.md)
- **Development:** See [CLAUDE.md](./CLAUDE.md)

---

**Last Updated:** 2024

**Project:** Distributed Web Search Engine

**Status:** Production-ready deployment configuration complete
