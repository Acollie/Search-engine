# Search Engine Project - TODO List

## Critical Fixes (Priority 1 - Do First)

### 1. Fix WaitGroup Concurrency Bug in Spider
**Issue**: Current implementation has `wg.Wait()` inside the loop, blocking on each goroutine individually and defeating parallelism.

**Current Code** (`cmd/spider/handler/flow.go`):
```go
for _, link := range links {
    wg.Add(1)
    go func() {
        defer wg.Done()
        // work
    }()
    wg.Wait()  // BLOCKING - defeats parallelism!
}
```

**Fix**: Replace with worker pool pattern using semaphore:
```go
semaphore := make(chan struct{}, maxConcurrency)
for _, link := range links {
    wg.Add(1)
    semaphore <- struct{}{}
    go func(link string) {
        defer wg.Done()
        defer func() { <-semaphore }()
        // work
    }(link)
}
wg.Wait()
```

---

### 2. Add Graceful Shutdown with Signal Handling
**Issue**: Services don't handle SIGTERM/SIGINT properly and can't cleanly terminate.

**Required Changes**:
- Add signal handling in all service `main.go` files
- Implement graceful shutdown for gRPC servers
- Allow in-flight requests to complete
- Close database connections properly

**Example Implementation**:
```go
sigChan := make(chan os.Signal, 1)
signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)

go func() {
    <-sigChan
    slog.Info("Shutting down gracefully...")
    grpcServer.GracefulStop()
    db.Close()
    os.Exit(0)
}()
```

**Files to Update**:
- `cmd/spider/main.go`
- `cmd/conductor/main.go`
- `cmd/cartographer/main.go`
- `cmd/searcher/main.go`

---

### 3. Fix SQL Injection Vulnerability in Queue Operations
**Issue**: Queue operations use string formatting instead of parameterized queries.

**Vulnerable Code** (`pkg/queue/type.go`):
```go
sqlQuery := fmt.Sprintf(AddLink, url)  // Unsafe with user input
_, err := d.Sql.ExecContext(ctx, sqlQuery)
```

**Fix**: Use parameterized queries:
```go
_, err := d.Sql.ExecContext(ctx, AddLink, url)
```

**Files to Review**:
- `pkg/queue/type.go`
- `pkg/page/sql_strings.go`
- All SQL query construction

---

### 4. Configure Database Connection Pooling
**Issue**: Database connections not optimized with pooling configuration.

**Current Code** (`pkg/db/postgres.go`):
```go
func Postgres(username, password, host string, port int, dbname string) (*sql.DB, conn.Type, error) {
    connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
        host, port, username, password, dbname)
    c, err := sql.Open("postgres", connStr)
    // No pooling configuration!
    return c, conn.PG, nil
}
```

**Add**:
```go
c.SetMaxOpenConns(25)
c.SetMaxIdleConns(5)
c.SetConnMaxLifetime(5 * time.Minute)
```

---

### 5. Enhance Health Checks with Readiness/Liveness Probes
**Issue**: Current health checks are too simplistic - just return 200 OK.

**Current Code** (`pkg/health/health.go`):
```go
func Ok(writer http.ResponseWriter, _ *http.Request) {
    writer.WriteHeader(http.StatusOK)
    writer.Write([]byte(`ok`))
}
```

**Required**:
- **Liveness Probe**: Check if service is running (current behavior)
- **Readiness Probe**: Check database connectivity, downstream service availability

**Example**:
```go
func Ready(db *sql.DB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        if err := db.PingContext(r.Context()); err != nil {
            w.WriteHeader(http.StatusServiceUnavailable)
            json.NewEncoder(w).Encode(map[string]string{"status": "unhealthy", "reason": err.Error()})
            return
        }
        w.WriteHeader(http.StatusOK)
        json.NewEncoder(w).Encode(map[string]string{"status": "healthy"})
    }
}
```

---

## Documentation & Deployment (Priority 2)

### 6. Add Comprehensive Architecture Diagrams and Deployment Instructions
**Required**:
- Architecture diagram showing all 5 services and their interactions
- Sequence diagrams for crawl → index → search flow
- Database schema diagrams
- Deployment instructions for Kubernetes
- Local development setup guide
- Environment variable documentation

**Tools**:
- Use Mermaid for diagrams in README
- Or create PNG diagrams and store in `assets/`

---

### 7. Deploy Publicly with Demo
**Goal**: Show working system, even at small scale (10K pages indexed).

**Options**:
- Deploy to Google Cloud Run (free tier)
- Deploy to AWS ECS/Fargate
- Deploy to DigitalOcean Kubernetes
- Use Railway/Render for simple deployment

**Requirements**:
- Public URL for frontend
- Public search endpoint
- Metrics dashboard (Grafana?)
- At least 10K pages indexed from seed URLs

---

## Production Hardening (Priority 3)

### 8. Implement Circuit Breakers and Retry Logic
**Issue**: No resilience patterns for failing dependencies.

**Add**:
- Circuit breaker for gRPC calls
- Exponential backoff for HTTP requests
- Retry logic for transient failures

**Recommended Library**: `github.com/sony/gobreaker`

**Example**:
```go
cb := gobreaker.NewCircuitBreaker(gobreaker.Settings{
    Name:        "SpiderClient",
    MaxRequests: 3,
    Timeout:     60 * time.Second,
})

result, err := cb.Execute(func() (interface{}, error) {
    return spiderClient.GetSeenList(ctx, req)
})
```

---

### 9. Optimize Random Sampling Query
**Issue**: `ORDER BY RANDOM()` is O(n log n) and slow for large tables.

**Current Code** (`cmd/cartographer/pkg/fetch/fetch.go`):
```sql
SELECT url, title, body, prominence, links
FROM SeenPages
ORDER BY RANDOM()
LIMIT $1;
```

**Better Approach**:
```sql
-- Use TABLESAMPLE (PostgreSQL 9.5+)
SELECT url, title, body, prominence, links
FROM SeenPages TABLESAMPLE SYSTEM(1)
LIMIT $1;
```

Or use random OFFSET:
```sql
SELECT url, title, body, prominence, links
FROM SeenPages
OFFSET floor(random() * (SELECT COUNT(*) FROM SeenPages))
LIMIT $1;
```

---

### 10. Add Batch INSERT Operations for Queue AddLinks
**Issue**: Sequential inserts are slow.

**Current Code** (`pkg/queue/type.go`):
```go
func (d Db) AddLinks(ctx context.Context, url []string) error {
    for _, u := range url {
        sqlQuery := fmt.Sprintf(AddLink, u)
        _, err := d.Sql.ExecContext(ctx, sqlQuery)  // Individual inserts
    }
}
```

**Fix**: Use batch INSERT:
```go
func (d Db) AddLinks(ctx context.Context, urls []string) error {
    if len(urls) == 0 {
        return nil
    }

    valueStrings := make([]string, 0, len(urls))
    valueArgs := make([]interface{}, 0, len(urls))

    for i, url := range urls {
        valueStrings = append(valueStrings, fmt.Sprintf("($%d)", i+1))
        valueArgs = append(valueArgs, url)
    }

    query := fmt.Sprintf("INSERT INTO queue (url) VALUES %s ON CONFLICT DO NOTHING",
        strings.Join(valueStrings, ","))

    _, err := d.Sql.ExecContext(ctx, query, valueArgs...)
    return err
}
```

---

### 11. Fix gRPC Bidirectional Streaming Infinite Loop
**Issue**: Spider's `GetSeenList` has infinite loop with no request consumption.

**Current Code** (`cmd/spider/handler/rpc.go`):
```go
func (c *RpcServer) GetSeenList(conn grpc.BidiStreamingServer[spider.SeenListRequest, spider.SeenListResponse]) error {
    for {
        ctx := conn.Context()
        response, err := c._GetSeenList(ctx, nil)
        if err != nil {
            return err
        }
        if err := conn.Send(response); err != nil {
            return err
        }
    }
    return nil
}
```

**Fix**: Add proper request/response handling with back-pressure:
```go
func (c *RpcServer) GetSeenList(stream grpc.BidiStreamingServer[spider.SeenListRequest, spider.SeenListResponse]) error {
    for {
        // Receive request from client
        req, err := stream.Recv()
        if err == io.EOF {
            return nil
        }
        if err != nil {
            return err
        }

        // Process and send response
        response, err := c._GetSeenList(stream.Context(), req)
        if err != nil {
            return err
        }

        if err := stream.Send(response); err != nil {
            return err
        }
    }
}
```

---

### 12. Add Comprehensive Metrics Collection
**Issue**: Only 2 basic counters in Cartographer.

**Add Metrics For**:
- **Spider**: Pages crawled, errors, robots.txt violations, crawl duration
- **Conductor**: Pages processed, duplicates found, queue depth
- **Cartographer**: Sweep duration, convergence iterations, pages ranked
- **Searcher**: Query latency (p50, p95, p99), cache hit rate, result count distribution

**Example**:
```go
var (
    QueryLatency = promauto.NewHistogramVec(prometheus.HistogramOpts{
        Name:    "searcher_query_latency_seconds",
        Help:    "Query latency distribution",
        Buckets: prometheus.DefBuckets,
    }, []string{"status"})

    CacheHitRate = promauto.NewCounterVec(prometheus.CounterOpts{
        Name: "searcher_cache_hits_total",
        Help: "Cache hit count",
    }, []string{"hit"})
)
```

---

## Interview Preparation (Priority 4)

### 13. Write Design Doc: Scaling to Billions of Pages (Google-Focused)
**Document Should Cover**:

#### Distributed Crawling
- URL frontier management with consistent hashing
- Politeness enforcement with per-domain queues
- Distributed deduplication with Bloom filters
- Robots.txt caching and distributed coordination

#### Distributed PageRank
- Graph partitioning strategies (vertex-cut vs edge-cut)
- MapReduce/Spark implementation for iterative computation
- Convergence detection in distributed setting
- Checkpoint and recovery strategies

#### Index Serving
- Inverted index structure and compression
- Distributed index sharding by term/document
- Query serving with multi-tier caching (L1/L2/L3)
- Replication and load balancing strategies

#### Storage Architecture
- Column-oriented storage for analytics (Bigtable/HBase)
- Document store for page content (MongoDB/Couchbase)
- Graph database for link structure (Neo4j/JanusGraph)
- Time-series storage for metrics (InfluxDB/Prometheus)

#### Consistency & Availability
- CAP theorem tradeoffs for different components
- Eventual consistency for PageRank updates
- Strong consistency for critical path queries

**File**: `docs/SCALING_DESIGN.md`

---

### 14. Add Privacy-Preserving Features (DuckDuckGo-Focused)
**Required Features**:

#### No Query Logging
```go
// DO NOT implement
type QueryLog struct {
    UserID    string
    Query     string
    Timestamp time.Time
}
```

#### Anonymized Crawling
```go
// Rotate User-Agent strings
// Don't send Referer headers
// Use Tor/VPN for distributed crawling
```

#### Query Processing
```go
// Hash queries before any processing (if needed for analytics)
func anonymizeQuery(query string) string {
    hash := sha256.Sum256([]byte(query))
    return hex.EncodeToString(hash[:])
}
```

#### No Personalization
- Don't track user search history
- Don't use location data
- Don't use behavioral profiling

**Document**: `docs/PRIVACY_POLICY.md`

---

### 15. Build Basic Frontend
**Requirements**:
- Simple search box interface
- Results display with title, URL, snippet
- Pagination controls
- Basic styling (TailwindCSS?)
- Display search latency and result count

**Tech Stack Options**:
- React + Vite
- Vue.js + Vite
- Vanilla JS + Tailwind (simplest)

**Features**:
```
┌─────────────────────────────────────┐
│  [ Search Query ]         [Search]  │
└─────────────────────────────────────┘

Results (1-10 of 1,247) - 0.12s

1. Page Title
   https://example.com/page
   Snippet of the page content with query
   terms highlighted...

2. Another Page
   ...

[< Prev] [1] [2] [3] [4] [5] [Next >]
```

**File Structure**:
```
frontend/
├── index.html
├── src/
│   ├── main.js
│   ├── components/
│   │   ├── SearchBox.jsx
│   │   ├── ResultList.jsx
│   │   └── Pagination.jsx
│   └── styles/
│       └── main.css
└── package.json
```

---

## Long-Term Enhancements (Future)

### Machine Learning Components
- [ ] Query intent classification
- [ ] Learning-to-rank for result ordering
- [ ] Spam page detection
- [ ] Duplicate content detection

### Advanced Crawling
- [ ] JavaScript rendering with Chromium headless
- [ ] Sitemap.xml support
- [ ] Crawl scheduling with priority queues
- [ ] Politeness policy enforcement (crawl-delay)

### Search Quality
- [ ] Query spell correction
- [ ] Query suggestions/autocomplete
- [ ] Knowledge graph integration
- [ ] Featured snippets extraction

### Performance
- [ ] Redis caching layer for popular queries
- [ ] CDN integration for static assets
- [ ] Query result pre-computation for trending topics
- [ ] Horizontal scaling with load balancer

---

## Timeline Recommendation

### Week 1 (Critical Fixes)
- [ ] Day 1-2: Fix WaitGroup bug (#1)
- [ ] Day 3-4: Add graceful shutdown (#2)
- [ ] Day 5: Fix SQL injection (#3)
- [ ] Day 6-7: Connection pooling (#4) + Health checks (#5)

### Week 2 (Documentation & Deployment)
- [ ] Day 1-3: Architecture diagrams and README update (#6)
- [ ] Day 4-7: Deploy public demo (#7)

### Week 3+ (Before Interviews)
- [ ] Production hardening (#8-12) as needed
- [ ] Design doc (#13) if applying to Google
- [ ] Privacy features (#14) if applying to DuckDuckGo
- [ ] Frontend (#15) for full-stack demonstration

---

## Success Criteria

### Before Applying
- [x] CLAUDE.md created
- [ ] All Priority 1 items completed
- [ ] Public demo deployed
- [ ] Comprehensive README with architecture diagrams
- [ ] No critical bugs or security vulnerabilities

### Interview Ready
- [ ] Can explain design decisions for all components
- [ ] Can discuss scalability limitations and solutions
- [ ] Have prepared answers for "how would you scale this 1000x?"
- [ ] Can demo the working system live
- [ ] Have code samples ready for deep technical discussion

---

## Notes from Technical Assessment

**Current Technical Maturity Score**: 6.2/10

**Strengths**:
- Solid PageRank algorithm implementation (8/10)
- Clean microservices architecture
- Good test coverage with benchmarks
- Observability foundation in place

**Critical Gaps**:
- No graceful shutdown
- Poor concurrency control
- Missing connection pooling
- Inadequate health checks
- Limited scalability (in-memory graph)
- gRPC streaming issues
- No circuit breakers/retry logic
- SQL injection vulnerability

**Target Score After Fixes**: 8.5/10 (Interview-ready)