# Grafana Dashboards Setup Guide

## Quick Start

### 1. Port Forward to Grafana
```bash
kubectl port-forward svc/grafana 3000:3000 -n search-engine &
```

Then access: **http://localhost:3000**

### 2. Default Login
- **Username:** admin
- **Password:** admin (change on first login!)

### 3. Add Prometheus Data Source
1. Go to Configuration → Data Sources
2. Click "Add data source"
3. Select "Prometheus"
4. URL: `http://prometheus:9090`
5. Click "Save & Test"

---

## Dashboards Available

### 1. **Pipeline Overview** 
Real-time monitoring of data flow: Spider → Conductor → Searcher

**Key Panels:**
- Spider pages crawled (per minute) - shows active crawling rate
- Spider error rate (%) - detects crawling issues
- Conductor batches processed - shows indexing throughput
- Conductor queue depth - identifies backlogs
- Data flow rate - monitors pipeline health
- Searcher queries - tracks search usage
- Pipeline status - shows service availability

**Alerts to set:**
- Error rate > 25% (Spider)
- Queue depth > 50,000 URLs
- Zero batches processed for > 5 minutes

### 2. **Performance Metrics**
Latency, throughput, and performance analysis

**Key Panels:**
- Page processing latency (P95) - target: < 100ms
- Search query latency (P95) - target: < 500ms
- Spider throughput - expected: 100-150 pages/min
- Conductor throughput - scales with spider
- Peak throughput tracking
- Queue wait time estimation

### 3. **System Health**
Infrastructure and service health monitoring

**Key Panels:**
- Pod CPU/Memory usage - capacity planning
- Service status (up/down) - availability
- Database connectivity - data persistence
- Disk space available
- Network I/O rates
- System uptime

### 4. **Error Analysis**
Error rates, failures, and issue detection

**Key Panels:**
- Spider error rate with thresholds
- Conductor processing errors
- Circuit breaker state
- gRPC stream errors
- Database connection errors
- Timeout occurrences

---

## Key Prometheus Queries

### Data Pipeline Flow
```promql
rate(spider_pages_fetched_total[1m])          # Pages crawled/min
rate(conductor_pages_received_total[1m])      # Pages processed/min
rate(searcher_queries_total[1m])              # Queries/min
conductor_queue_depth                         # Pending URLs
```

### Error Metrics
```promql
(rate(spider_pages_failed_total[1m]) / (rate(spider_pages_fetched_total[1m]) + rate(spider_pages_failed_total[1m]))) * 100
rate(conductor_errors_total[1m])
conductor_circuit_breaker_state               # 0=closed, 1=open
```

### Performance (Latency)
```promql
histogram_quantile(0.95, rate(conductor_processing_duration_seconds_bucket[5m]))
histogram_quantile(0.95, rate(searcher_query_duration_seconds_bucket[5m]))
histogram_quantile(0.5, rate(searcher_query_duration_seconds_bucket[5m]))
```

### Resource Usage
```promql
rate(container_cpu_usage_seconds_total{pod=~"spider.*|conductor.*|searcher.*"}[1m])
container_memory_usage_bytes{pod=~"spider.*|conductor.*|searcher.*"} / 1024 / 1024
```

---

## Manual Dashboard Setup

### Create Dashboard from Scratch
1. Click "+" → Dashboard
2. Add panels for key metrics:
   - Pages crawled: `rate(spider_pages_fetched_total[1m])`
   - Pages processed: `rate(conductor_pages_received_total[1m])`
   - Queue depth: `conductor_queue_depth`
   - Error rate: `(rate(spider_pages_failed_total[1m]) / (rate(spider_pages_fetched_total[1m]) + rate(spider_pages_failed_total[1m]))) * 100`
   - Search latency P95: `histogram_quantile(0.95, rate(searcher_query_duration_seconds_bucket[5m]))`

### Set Refresh Rates
- **Real-time monitoring:** 5 seconds
- **Detailed analysis:** 10 seconds
- **Infrastructure:** 15-30 seconds

---

## Alert Configuration

### High Error Rate
```
Condition: spider_error_rate > 25%
Duration: 5 minutes
Action: Notify Slack #alerts
```

### Queue Backlog
```
Condition: conductor_queue_depth > 50000
Duration: 10 minutes
Action: Page on-call engineer
```

### Service Down
```
Condition: up{job=~"spider|conductor|searcher"} == 0
Duration: 1 minute
Action: Critical alert
```

---

## Troubleshooting

### No Metrics Showing
1. Verify Prometheus is scraping:
   - Check: http://localhost:9090/targets
   - All services should show "UP"

2. Check metric names:
   - In Prometheus graph view, type `up` and execute
   - Should see metrics for your services

3. Verify data source:
   - Configuration → Data Sources
   - Ensure URL is `http://prometheus:9090`
   - Click "Save & Test"

### Dashboards Not Loading
1. Refresh browser (Ctrl+F5)
2. Check Grafana logs: `kubectl logs deployment/grafana -n search-engine`
3. Verify Prometheus connection in data sources

---

## Best Practices

✅ **Set refresh rate to 5s for live monitoring**
✅ **Create specific alerts for business metrics**
✅ **Document metric meanings in descriptions**
✅ **Share dashboards with team**
✅ **Review dashboards weekly for trends**
✅ **Archive metrics after 90 days**

---

## Dashboard Files

Pre-built dashboards available in:
- `deployments/grafana-dashboards-pipeline.json`
- `deployments/grafana-dashboards-performance.json`
- `deployments/grafana-dashboards-health.json`
- `deployments/grafana-dashboards-errors.json`

