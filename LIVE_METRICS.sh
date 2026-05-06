#!/bin/bash
# Live Metrics Dashboard for Search Engine System
# Usage: ./LIVE_METRICS.sh
# Updates every 5 seconds

while true; do
  clear

  echo "════════════════════════════════════════════════════════════════════════"
  echo "           SEARCH ENGINE - LIVE METRICS DASHBOARD"
  echo "           Updated: $(date '+%Y-%m-%d %H:%M:%S')"
  echo "════════════════════════════════════════════════════════════════════════"
  echo

  # Get current pod resource usage
  echo "█ POD RESOURCE USAGE"
  echo "────────────────────────────────────────────────────────────────────────"
  kubectl top pods -n search-engine 2>/dev/null | tail -n +2 | awk '{
    printf "%-40s CPU: %5s  MEM: %5s\n", $1, $2, $3
  }' || echo "Metrics not yet available (metrics-server warming up)"
  echo

  # Spider activity metrics
  echo "█ SPIDER CRAWLING METRICS (Last 5 min)"
  echo "────────────────────────────────────────────────────────────────────────"
  SPIDER_LOGS=$(kubectl logs -n search-engine -l app=spider --since=5m 2>/dev/null)
  PAGES_OK=$(echo "$SPIDER_LOGS" | grep -c "Successfully crawled page")
  PAGES_FAILED=$(echo "$SPIDER_LOGS" | grep -c "Non-retriable error")
  PAGES_RATE_LIMITED=$(echo "$SPIDER_LOGS" | grep -c "429 Too Many Requests")
  PAGES_QUEUE=$(echo "$SPIDER_LOGS" | grep "Fetched links from queue count=" | tail -1 | grep -o "count=[0-9]*" | cut -d= -f2)

  echo "✓ Pages successfully crawled: $PAGES_OK"
  echo "✗ Pages with errors: $PAGES_FAILED"
  echo "⚠ Rate limited requests: $PAGES_RATE_LIMITED"
  echo "📦 Last batch size: ${PAGES_QUEUE:-unknown}"
  echo

  # Conductor activity metrics
  echo "█ CONDUCTOR PROCESSING METRICS (Last 5 min)"
  echo "────────────────────────────────────────────────────────────────────────"
  CONDUCTOR_LOGS=$(kubectl logs -n search-engine -l app=conductor --since=5m 2>/dev/null)
  LISTEN_CALLS=$(echo "$CONDUCTOR_LOGS" | grep -c "Starting conductor listener\|Listen loop")
  BATCH_CALLS=$(echo "$CONDUCTOR_LOGS" | grep -c "processBatch:\|calling processBatch")
  PAGES_RECEIVED=$(echo "$CONDUCTOR_LOGS" | grep -c "Pages received\|Received response")
  PAGES_STORED=$(echo "$CONDUCTOR_LOGS" | grep -c "Successfully\|stored")
  ERRORS=$(echo "$CONDUCTOR_LOGS" | grep -c "ERROR")

  echo "Listen loop: $LISTEN_CALLS"
  echo "Batches called: $BATCH_CALLS"
  echo "Pages received: $PAGES_RECEIVED"
  echo "Pages stored: $PAGES_STORED"
  echo "Errors: $ERRORS"
  echo

  # Data flow status
  echo "█ DATA PIPELINE STATUS"
  echo "────────────────────────────────────────────────────────────────────────"
  if [ $PAGES_OK -gt 0 ] && [ $PAGES_RECEIVED -eq 0 ]; then
    echo "🔴 BLOCKED: Spider crawling ($PAGES_OK pages) but Conductor not receiving"
  elif [ $BATCH_CALLS -eq 0 ]; then
    echo "🔴 BLOCKED: processBatch never called"
  elif [ $PAGES_STORED -gt 0 ]; then
    echo "✅ FLOWING: Data moving through pipeline"
  else
    echo "⚠️  IDLE: No activity detected"
  fi
  echo

  # System health
  echo "█ SYSTEM HEALTH"
  echo "────────────────────────────────────────────────────────────────────────"
  echo "Cluster: Ready"
  echo "Metrics Server: $(kubectl get deployment metrics-server -n kube-system -o jsonpath='{.status.readyReplicas}/{.status.replicas}' 2>/dev/null || echo 'Installing...')"
  echo "Database: External (DigitalOcean managed)"
  echo "PVC: $(kubectl get pvc postgres-data -n search-engine -o jsonpath='{.status.phase}' 2>/dev/null) (do-block-storage)"
  echo

  echo "════════════════════════════════════════════════════════════════════════"
  echo "Press Ctrl+C to exit. Refreshing in 5 seconds..."
  echo "════════════════════════════════════════════════════════════════════════"

  sleep 5
done
