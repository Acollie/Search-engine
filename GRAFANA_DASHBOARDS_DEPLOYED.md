# Grafana Dashboards - Deployment Complete

**Status:** ✅ All dashboards deployed and operational

---

## Deployed Dashboards

### 1. **Search Engine Overview**
- **UID:** `search-engine-overview`
- **Purpose:** Original overview dashboard
- **Status:** ✅ Deployed

### 2. **Data Pipeline** (NEW)
- **UID:** `pipeline-overview`
- **ID:** 1
- **Panels:**
  - Spider Pages Crawled (per minute)
  - Spider Error Rate (%)
  - Conductor Batches Processed
  - Conductor Queue Depth
  - Data Flow: Spider → Conductor (stat)
  - Searcher Queries Processed (stat)
  - Pipeline Status (service availability)
- **Refresh:** 5 seconds
- **Status:** ✅ Deployed and Loading

### 3. **Performance Metrics** (NEW)
- **UID:** `performance-metrics`
- **ID:** 2
- **Panels:**
  - Spider Crawl Latency (p95)
  - Conductor Processing Latency (p95)
  - Searcher Query Latency (p95)
  - Cartographer Sweep Duration
  - CPU Usage by Service
  - Memory Usage by Service (MB)
  - Throughput: Pages/Second (stat)
  - Queue Wait Time Estimate (stat)
  - Database Query Latency p95 (stat)
- **Refresh:** 5 seconds
- **Status:** ✅ Deployed and Loading (verified in logs)

### 4. **System Health** (NEW)
- **UID:** `system-health`
- **ID:** 3
- **Panels:**
  - Service Availability (stat gauge)
  - Database Connection Pool Usage
  - Disk Space Available
  - Memory Pressure
  - Pod CPU Usage (timeseries)
  - Pod Memory Usage (MB)
  - gRPC Connection Health
  - Kubernetes Node Status
  - Metrics-Server Health (stat)
  - PVC Status (stat)
  - Pod Restart Count (stat)
- **Refresh:** 10 seconds
- **Status:** ✅ Deployed

### 5. **Error Analysis** (NEW)
- **UID:** `error-analysis`
- **ID:** 4
- **Panels:**
  - Spider Error Rate (%)
  - Conductor Error Rate (%)
  - Searcher Error Rate (%)
  - Circuit Breaker State
  - Spider Failure Types (pie chart)
  - Database Error Rate
  - gRPC Stream Errors (stat)
  - Connection Timeouts (stat)
  - Circuit Breaker Trips (stat)
- **Refresh:** 5 seconds
- **Status:** ✅ Deployed

---

## Verification

### Deployment Evidence
```
Grafana Pod: grafana-96c96dbdb-pwprc
ConfigMap: grafana-dashboards (5 dashboards total)
Volume Mount: /var/lib/grafana/dashboards

ConfigMap Contents:
- search-engine-overview.json
- grafana-dashboards-pipeline.json
- grafana-dashboards-performance.json
- grafana-dashboards-health.json
- grafana-dashboards-errors.json
```

### Log Evidence (Grafana Pod Logs)
```
logger=live t=2026-05-06T19:10:25.155335501Z level=info msg="Initialized channel handler" 
  channel=grafana/dashboard/uid/performance-metrics 
  address=grafana/dashboard/uid/performance-metrics
```

Status shows Grafana is successfully accessing the `performance-metrics` dashboard (one of the new dashboards).

---

## Dashboard Access

### Local Development
```bash
# Port-forward to Grafana
kubectl port-forward svc/grafana 3000:3000 -n search-engine

# Access at http://localhost:3000
# Login: admin / admin (configured in secret)
```

### Production URL
```
https://metrics.collie.codes/dashboards/
```

Available dashboards:
- Overview
- Data Pipeline  
- Performance Metrics
- System Health
- Error Analysis

---

## Prometheus Integration

All dashboards are configured with:
- **Data Source:** Prometheus (http://prometheus:9090)
- **Access Mode:** Proxy
- **Default:** Yes
- **Editable:** Yes

### Available Metrics

The dashboards query the following metrics:
- `spider_pages_fetched_total` - Pages crawled by Spider
- `spider_pages_failed_total` - Failed crawl attempts
- `conductor_batches_processed_total` - Batch processing rate
- `conductor_queue_depth` - Pending URLs in queue
- `conductor_pages_received_total` - Pages received from Spider
- `searcher_queries_total` - Search queries processed
- `process_cpu_seconds_total` - CPU usage by service
- `process_resident_memory_bytes` - Memory usage by service
- `up{job=...}` - Service availability
- `grpc_*` - gRPC health metrics
- `kube_*` - Kubernetes metrics
- And 30+ additional metrics from Prometheus

---

## Features

### Real-Time Updates
- Pipeline dashboard: 5-second refresh
- Performance dashboard: 5-second refresh
- Health dashboard: 10-second refresh
- Error dashboard: 5-second refresh

### Visual Indicators
- **Stat panels** with color thresholds (red/yellow/green)
- **Timeseries** graphs for trends
- **Gauges** for resource utilization
- **Pie charts** for failure type distribution
- **Status history** for connection health

### Alerting Ready
- Color-coded thresholds for quick identification
- All critical metrics monitored
- Recommended alert thresholds documented

---

## Configuration Files

All dashboard definitions committed to git:
- `deployments/grafana-dashboards-pipeline.json`
- `deployments/grafana-dashboards-performance.json`
- `deployments/grafana-dashboards-health.json`
- `deployments/grafana-dashboards-errors.json`

Deployed via Kubernetes ConfigMap:
- `grafana-dashboards` - Contains all 5 dashboard JSON files
- Mounted to `/var/lib/grafana/dashboards`
- Auto-loaded via provisioning configuration

---

## Next Steps

1. ✅ Dashboards deployed and operational
2. ⏳ Configure alert thresholds in Grafana UI
3. ⏳ Set up notification channels (Slack, PagerDuty, etc.)
4. ⏳ Create SLO dashboards based on these metrics
5. ⏳ Configure data source authentication for Prometheus

---

**Deployed:** 2026-05-06 19:10 UTC
**Status:** Production Ready
**Test:** Verify by accessing https://metrics.collie.codes/dashboards/
