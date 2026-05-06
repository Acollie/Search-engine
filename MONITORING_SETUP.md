# Comprehensive Monitoring & Metrics Setup

## Live Metrics Dashboard

Run the live metrics script to see real-time system status:

```bash
chmod +x LIVE_METRICS.sh
./LIVE_METRICS.sh
```

This provides:
- **Pod Resource Usage** - CPU/Memory consumption per service
- **Spider Metrics** - Pages crawled, failures, rate limits
- **Conductor Metrics** - Batch processing, deduplication, storage
- **Searcher Metrics** - Queries processed
- **System Health** - Cluster status, metrics-server, database

---

## Prometheus Queries for Key Metrics

### Data Pipeline Throughput
```promql
# Pages crawled per minute
rate(spider_pages_fetched_total[1m])

# Pages processed per minute
rate(conductor_pages_received_total[1m])

# Pages indexed per minute
rate(searcher_pages_indexed_total[1m])
```

### Error Rates
```promql
# Spider error rate (% of pages)
(rate(spider_pages_failed_total[5m]) / (rate(spider_pages_fetched_total[5m]) + rate(spider_pages_failed_total[5m]))) * 100

# Conductor processing errors
rate(conductor_errors_total[5m])

# Search errors
rate(searcher_errors_total[5m])
```

### Queue Depth
```promql
# Conductor queue depth (unprocessed URLs)
conductor_queue_depth

# Spider processing queue
spider_queue_depth
```

### Latency
```promql
# Page processing latency (p95)
histogram_quantile(0.95, rate(conductor_processing_duration_seconds_bucket[5m]))

# Search query latency (p95)
histogram_quantile(0.95, rate(searcher_query_duration_seconds_bucket[5m]))
```

### Service Health
```promql
# gRPC connection health (0 = down, 1 = up)
grpc_connection_health

# Database connection pool usage
postgres_connection_pool_used / postgres_connection_pool_max

# Memory pressure
process_resident_memory_bytes / (1024 * 1024) # In MB
```

---

## Grafana Dashboards to Create

### 1. Data Pipeline Overview
- Top: Spider crawl rate (pages/min)
- Middle: Conductor processing rate (pages/min)
- Bottom: Search queries processed

### 2. Error & Health Dashboard
- Error rates by service
- Circuit breaker status
- gRPC connection health
- Database connectivity

### 3. Performance Dashboard
- P50/P95/P99 latencies for each service
- Queue depths
- Memory/CPU usage

### 4. Data Flow Dashboard
- Spider → Conductor flow (pages/sec)
- Conductor → Searcher flow
- Bottleneck detection

---

## Key Metrics to Monitor

### Critical (Alert if fail)
1. **Conductor processBatch() called regularly**
   - Should see logs every 5-30 seconds
   - If none appear in 1 minute: 🔴 CRITICAL

2. **Data flow through pipeline**
   - Spider pages > 0 AND Conductor pages = 0 → BLOCKED
   - Conductor pages > 0 AND Searcher pages = 0 → BLOCKED

3. **gRPC streaming health**
   - GetSeenList RPC calls/min > 0
   - Stream.Recv() timeouts < 5%
   - Spider "Sending response" logs visible

4. **Database connectivity**
   - PVC status = Bound
   - Connection pool < 80% utilized
   - No write errors

### Warning (Monitor closely)
1. Spider error rate > 25%
2. Conductor latency p95 > 500ms
3. Search index not updating for > 5 minutes
4. Memory usage > 80%
5. CPU > 70% sustained

---

## Troubleshooting Guide

### If Conductor shows 0 pages processed:

**Step 1: Check if Listen loop is running**
```bash
kubectl logs conductor-* -n search-engine | grep "Listen loop\|processBatch:"
```
- If you see these logs: processBatch is being called
- If not: Listen loop not executing (context cancelled?)

**Step 2: Check if GetSeenList is being called**
```bash
kubectl logs spider-* -n search-engine | grep "GetSeenList:"
```
- If you see: Spider RPC is being invoked
- If not: Conductor.processBatch() blocking before GetSeenList call

**Step 3: Check stream operations**
```bash
kubectl logs conductor-* -n search-engine | grep "stream.Send\|stream.Recv"
```
- If blocked on Send: Spider not accepting requests
- If blocked on Recv: Spider not sending responses
- If timeout in logs: 30-second timeout triggered

**Step 4: Verify network connectivity**
```bash
kubectl exec conductor-* -n search-engine -- sh -c 'nc -zv spider 9090'
```
- Should succeed immediately
- If timeout: network/DNS issue

---

## Real-Time Monitoring Commands

### Watch Conductor processing
```bash
kubectl logs conductor-* -n search-engine -f | grep -E "processBatch|Listen loop|ERROR"
```

### Watch Spider RPC calls
```bash
kubectl logs spider-* -n search-engine -f | grep -E "GetSeenList|Sending response|Stream"
```

### Monitor resource usage
```bash
kubectl top pods -n search-engine --containers --sort-by=memory
```

### Check metrics-server health
```bash
kubectl get deployment metrics-server -n kube-system
kubectl logs deployment/metrics-server -n kube-system
```

---

## Metrics Retention & Long-Term Monitoring

### Prometheus Setup
- Metrics retention: 15 days (configurable in ConfigMap)
- Scrape interval: 15 seconds
- Query resolution: 1 minute

### Grafana Dashboards
- Create alerts for critical metrics
- Set up notification channels (Slack, email, etc.)
- Create SLO dashboards:
  - Data flow SLO: 99% of pages processed within 5 minutes
  - Search latency SLO: 95th percentile < 500ms
  - Availability SLO: 99.5% uptime

### Long-term Analysis
1. Daily: Review error logs and failure patterns
2. Weekly: Analyze throughput trends and optimization opportunities
3. Monthly: Capacity planning based on growth rate

---

## Current System Status

**Last Scan:** 2026-05-06 19:47:14

| Component | Status | Metric |
|-----------|--------|--------|
| Spider | ✅ Healthy | 9 pages/5min (~1.8 pages/sec) |
| Conductor | 🔴 Blocked | 0 pages/5min |
| Searcher | ℹ️ Idle | 0 queries |
| Database | ✅ Ready | PVC Bound |
| Metrics | ✅ Ready | metrics-server 1/1 |

---

## Next Steps

1. ✅ Metrics server installed
2. ✅ PVC storage fixed
3. ⏳ Conductor processBatch fix (awaiting image push)
4. ⏳ Comprehensive Prometheus setup
5. ⏳ Grafana dashboard creation
6. ⏳ Alert rules configuration
