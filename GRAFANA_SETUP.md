# Grafana Dashboard Setup

## Overview

This guide explains how to access and use the Grafana dashboard for monitoring the search engine.

## Dashboard Features

The Search Engine Overview dashboard provides:

1. **Search Requests per Second** - Real-time request rate by status (success/error)
2. **Search Latency** - p50, p95, and p99 latency percentiles
3. **Total Searches** - Count of successful searches in the last hour
4. **Error Rate** - Percentage of failed searches
5. **Service Status** - Health status of all 5 microservices

## Accessing Grafana

### Docker Compose

```bash
# Grafana is available at:
http://localhost:3001

# Default credentials:
Username: admin
Password: admin (or check GRAFANA_PASSWORD in .env)
```

### Kubernetes

```bash
# Port forward to access Grafana
kubectl port-forward svc/grafana 3000:3000 -n search-engine

# Access at:
http://localhost:3000

# Get the admin password
kubectl get secret search-engine-secrets -n search-engine -o jsonpath='{.data.GRAFANA_PASSWORD}' | base64 --decode
```

## Dashboard Locations

### Auto-provisioned (Kubernetes)

The dashboard is automatically provisioned when you deploy monitoring:

```bash
kubectl apply -f deployments/monitoring.yaml
```

Navigate to: **Dashboards → Search Engine → Search Engine Overview**

### Manual Import

If the dashboard is not automatically loaded:

1. Open Grafana
2. Click **+** (Create) in the left sidebar
3. Select **Import**
4. Upload `deployments/grafana-dashboard.json`
5. Select **Prometheus** as the data source
6. Click **Import**

## Dashboard Panels Explained

### 1. Search Requests per Second

**What it shows:** Rate of search requests over time
**Metrics:** `rate(frontend_search_requests_total[5m])`
**Colors:**
- Green: Successful requests
- Red: Failed requests

**What to watch for:**
- Sudden drops (service issues)
- High error rate (backend problems)
- Spikes (traffic surge, potential DDoS)

### 2. Search Latency (p50, p95, p99)

**What it shows:** Search response time percentiles
**Metrics:** `histogram_quantile(0.XX, rate(frontend_search_duration_seconds_bucket[5m]))`

**Interpretation:**
- **p50** (median): Half of requests complete faster
- **p95**: 95% of requests complete faster
- **p99**: 99% of requests complete faster (worst-case)

**What to watch for:**
- p99 > 2s: Poor user experience
- Increasing trend: Performance degradation
- Large gap between p50 and p99: Inconsistent performance

### 3. Total Searches (1h)

**What it shows:** Total successful searches in the last hour
**Metrics:** `increase(frontend_search_requests_total{status="success"}[1h])`

**Use cases:**
- Traffic monitoring
- Usage analytics
- Capacity planning

### 4. Error Rate

**What it shows:** Percentage of failed searches
**Metrics:** `rate(frontend_search_requests_total{status="error"}[5m]) / rate(frontend_search_requests_total[5m])`

**Thresholds:**
- Green: < 1% (healthy)
- Yellow: 1-5% (warning)
- Red: > 5% (critical)

**What to watch for:**
- > 1%: Investigate immediately
- Sudden spike: Deployment issue or backend failure

### 5. Service Status

**What it shows:** Health status of all microservices
**Metrics:** `up{job="<service>"}`

**Colors:**
- Green (1): Service is up
- Red (0): Service is down

**Services monitored:**
- Frontend
- Searcher
- Spider
- Conductor
- Cartographer

## Setting Up Alerts

### Example Alert: High Error Rate

1. Click on the **Error Rate** panel
2. Click **Edit**
3. Go to **Alert** tab
4. Click **Create Alert**
5. Set condition:
   - WHEN: `avg()` OF `query(A, 5m, now)` IS ABOVE `0.05`
   - FOR: `5m`
6. Add notification channel
7. Save

### Example Alert: Service Down

1. Create new alert rule in Prometheus
2. Add to `deployments/monitoring.yaml` under alert-rules ConfigMap:

```yaml
- alert: ServiceDown
  expr: up{namespace="search-engine"} == 0
  for: 1m
  labels:
    severity: critical
  annotations:
    summary: "Service {{ $labels.job }} is down"
    description: "{{ $labels.job }} has been down for more than 1 minute"
```

## Customizing the Dashboard

### Adding a New Panel

1. Click **Add panel** (top right)
2. Select **Add a new panel**
3. Enter PromQL query in **Metrics browser**
4. Configure visualization
5. Click **Apply**

### Example Queries

**Request rate by endpoint:**
```promql
rate(http_requests_total[5m])
```

**Memory usage:**
```promql
container_memory_usage_bytes{namespace="search-engine"}
```

**CPU usage:**
```promql
rate(container_cpu_usage_seconds_total{namespace="search-engine"}[5m])
```

**Database connections:**
```promql
pg_stat_activity_count{namespace="search-engine"}
```

**Query duration:**
```promql
histogram_quantile(0.95, rate(postgres_query_duration_seconds_bucket[5m]))
```

## Advanced Features

### Variables

Add variables for dynamic filtering:

1. Dashboard settings → Variables → Add variable
2. Name: `service`
3. Type: `Query`
4. Query: `label_values(up{namespace="search-engine"}, job)`
5. Use in panels: `up{job="$service"}`

### Annotations

Show deployment events on graphs:

1. Dashboard settings → Annotations
2. Add annotation query
3. Example: Show pod restarts
   ```promql
   changes(kube_pod_container_status_restarts_total{namespace="search-engine"}[5m]) > 0
   ```

### Template Dashboard

Save as template for other environments:

1. Dashboard settings → JSON Model
2. Replace hardcoded values with variables
3. Export and commit to Git

## Troubleshooting

### Dashboard Not Showing Data

**Check Prometheus is scraping targets:**
```bash
# Open Prometheus
kubectl port-forward svc/prometheus 9090:9090 -n search-engine

# Go to: http://localhost:9090/targets
# Verify all targets are "UP"
```

**Check metrics are being exported:**
```bash
# Test frontend metrics endpoint
curl http://localhost:8005/metrics | grep frontend_search
```

### Missing Panels

**Verify Prometheus data source:**
1. Configuration → Data Sources
2. Click **Prometheus**
3. Click **Test** (should show "Data source is working")

**Check PromQL queries:**
1. Edit panel
2. Click **Query inspector**
3. View query results

### No Kubernetes Metrics

**Install metrics-server:**
```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

**Install kube-state-metrics:**
```bash
kubectl apply -f https://github.com/kubernetes/kube-state-metrics/tree/main/examples/standard
```

## Best Practices

### 1. Set Time Range

- **Development:** Last 1 hour
- **Production:** Last 24 hours
- **Debugging:** Last 15 minutes with auto-refresh

### 2. Use Annotations

Mark deployments, incidents, and scaling events

### 3. Export Snapshots

Share dashboard snapshots for incident reports

### 4. Create Alerts

Don't rely on manual monitoring - set up alerts for:
- Service down
- High error rate (> 1%)
- High latency (p95 > 1s)
- High CPU/memory usage

### 5. Regular Review

Review metrics weekly to:
- Identify trends
- Plan capacity
- Optimize performance

## Useful Links

- **Prometheus Querying:** https://prometheus.io/docs/prometheus/latest/querying/basics/
- **Grafana Docs:** https://grafana.com/docs/grafana/latest/
- **Dashboard Examples:** https://grafana.com/grafana/dashboards/

## Support

If you encounter issues:

1. Check Prometheus targets: http://localhost:9090/targets
2. Verify metrics are exposed: `curl http://localhost:8005/metrics`
3. Check Grafana logs: `kubectl logs -f deployment/grafana -n search-engine`
4. Test PromQL queries in Prometheus UI before adding to Grafana
