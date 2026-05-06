# Monitoring & Observability

This document covers the monitoring infrastructure for the search engine pipeline, including Prometheus metrics collection, Grafana dashboards, and health checks.

## Overview

The system uses:
- **Prometheus** - Metrics collection and time-series database
- **Grafana** - Visualization and dashboarding
- **Kubernetes Metrics-Server** - Pod resource monitoring

## Grafana Dashboards

Four production-ready dashboards are configured to monitor the entire pipeline:

### 1. Data Pipeline Dashboard
**Purpose:** Real-time monitoring of data flow through the system

**Key Metrics:**
- Spider pages crawled per minute
- Spider error rate (%)
- Conductor batches processed
- Conductor queue depth (pending URLs)
- Data flow rate (Spider → Conductor)
- Searcher queries processed
- Pipeline service availability

**Refresh Rate:** 5 seconds
**UID:** `pipeline-overview`

### 2. Performance Metrics Dashboard
**Purpose:** Latency, throughput, and resource efficiency tracking

**Key Metrics:**
- P95 latency for Spider crawl operations
- P95 latency for Conductor processing
- P95 latency for Searcher queries
- Cartographer PageRank sweep duration
- CPU usage by service
- Memory usage by service
- Throughput (pages/second)
- Queue wait time estimation
- Database query latency

**Refresh Rate:** 5 seconds
**UID:** `performance-metrics`

### 3. System Health Dashboard
**Purpose:** Infrastructure and service health monitoring

**Key Metrics:**
- Service availability status
- Database connection pool usage
- Disk space available
- Memory pressure
- Pod CPU and memory usage
- gRPC connection health
- Kubernetes node status
- Metrics-server health
- PVC (persistent volume claim) status
- Pod restart counts

**Refresh Rate:** 10 seconds
**UID:** `system-health`

### 4. Error Analysis Dashboard
**Purpose:** Error tracking and failure pattern analysis

**Key Metrics:**
- Spider error rate by domain
- Conductor error rate
- Searcher error rate
- Circuit breaker state and trip count
- Spider failure type distribution
- Database error rate by operation
- gRPC stream errors
- Connection timeouts
- Circuit breaker trips

**Refresh Rate:** 5 seconds
**UID:** `error-analysis`

## Prometheus Queries

### Spider Service
```promql
# Pages crawled per minute
rate(spider_pages_fetched_total[1m])

# Failed crawl attempts
rate(spider_pages_failed_total[1m])

# Error rate percentage
(rate(spider_pages_failed_total[1m]) / (rate(spider_pages_fetched_total[1m]) + rate(spider_pages_failed_total[1m]))) * 100
```

### Conductor Service
```promql
# Batches processed per minute
rate(conductor_batches_processed_total[1m])

# Pages received from Spider
rate(conductor_pages_received_total[1m])

# Queue depth (pending URLs)
conductor_queue_depth

# Processing latency (p95)
histogram_quantile(0.95, rate(conductor_processing_duration_seconds_bucket[5m]))
```

### Searcher Service
```promql
# Search queries processed per minute
rate(searcher_queries_total[1m])

# Query latency (p95)
histogram_quantile(0.95, rate(searcher_query_duration_seconds_bucket[5m]))
```

### System Metrics
```promql
# Service availability
up{job=~"spider|conductor|searcher"}

# Pod CPU usage
rate(process_cpu_seconds_total[1m])

# Pod memory usage (MB)
process_resident_memory_bytes / (1024 * 1024)
```

## Health Checks

All services expose a `/health` endpoint on port 8081:

```bash
# Check Spider health
curl http://spider:8081/health

# Check Conductor health
curl http://conductor:8081/health

# Check Searcher health
curl http://searcher:8081/health
```

Response format:
```json
{
  "status": "healthy",
  "uptime_seconds": 3600,
  "version": "1.0.0"
}
```

## Accessing Dashboards

### Local Development
```bash
# Port-forward to Grafana (port 3000)
kubectl port-forward svc/grafana 3000:3000 -n search-engine

# Port-forward to Prometheus (port 9090)
kubectl port-forward svc/prometheus 9090:9090 -n search-engine

# Access:
# Grafana: http://localhost:3000
# Prometheus: http://localhost:9090
```

### Production
Access Grafana at: `https://metrics.collie.codes`

## Alerts & SLOs

### Critical Alerts
- Service down (any component)
- Error rate > 25%
- Spider queue depth > 50K URLs
- Database connection pool > 80%

### Warning Alerts
- Error rate > 15%
- Latency p95 > 1 second
- Memory usage > 80%
- CPU usage > 70% sustained

### SLO Targets
- **Data Pipeline:** 99% of pages processed within 5 minutes
- **Search Latency:** 95th percentile < 500ms
- **Availability:** 99.5% uptime

## Troubleshooting

### Dashboard Not Loading Data
1. Check Prometheus is scraping metrics:
   ```bash
   kubectl logs -n search-engine -l app=prometheus | grep "scrape"
   ```

2. Verify service metrics are being exported:
   ```bash
   curl http://spider:8080/metrics | grep spider_pages
   ```

### Missing Metrics
1. Check ServiceMonitor is configured:
   ```bash
   kubectl get servicemonitor -n search-engine
   ```

2. Verify Prometheus targets:
   ```
   http://localhost:9090/targets
   ```

### Grafana Authentication Issues
Grafana uses the credentials stored in `search-engine-secrets` secret.

## Metrics Retention

- **Prometheus:** 15 days (configurable in ConfigMap)
- **Grafana:** Unlimited (stores dashboard definitions only)

## Adding New Dashboards

Dashboards are provisioned from the `grafana-dashboards` ConfigMap:

1. Create dashboard JSON in `deployments/grafana-dashboards-{name}.json`
2. Ensure top-level object has:
   - `title` (required)
   - `uid` (unique identifier)
   - `id` (numeric ID)
   - `panels` array
3. Update ConfigMap:
   ```bash
   kubectl create cm grafana-dashboards \
     --from-file=deployments/grafana-dashboards-*.json \
     -n search-engine --dry-run=client -o yaml | kubectl apply -f -
   ```
4. Restart Grafana:
   ```bash
   kubectl rollout restart deployment/grafana -n search-engine
   ```

## Related Documentation

- See `TROUBLESHOOTING.md` for debugging pipeline issues
- See `DEPLOYMENT_GUIDE.md` for infrastructure setup
- See `cmd/{service}/main.go` for metric definitions

