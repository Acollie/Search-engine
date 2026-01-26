# Spider Service - Issues and Recommendations

## Critical Issues

### 1. ❌ Metrics Defined But Never Used

**Location**: `cmd/spider/metrics/spider.go` vs `cmd/spider/handler/flow.go`

**Problem**: All Prometheus metrics are defined but never incremented in the actual code.

**Impact**:
- No observability into spider performance
- Can't monitor crawl success/failure rates
- Can't track queue depth or active crawls

**Recommendation**:
```go
// In flow.go
metrics.ActiveCrawls.Inc()
defer metrics.ActiveCrawls.Dec()

metrics.PagesFetched.WithLabelValues(domain).Inc()
metrics.CrawlDuration.WithLabelValues(domain).Observe(duration.Seconds())
```

---

### 2. ❌ Context Cancellation Not Respected

**Location**: `cmd/spider/handler/flow.go:11-82`

**Problem**:
```go
func (h *Server) Scan(ctx context.Context) {
    for i := 0; i < 20; i++ {  // Hardcoded, no ctx check
        // Long-running operations without ctx checks
    }
}
```

**Impact**:
- Can't gracefully shutdown spider
- Continues crawling even when service is stopping
- Could lead to data corruption during shutdown

**Recommendation**:
```go
func (h *Server) Scan(ctx context.Context) {
    for {
        select {
        case <-ctx.Done():
            slog.Info("Scan cancelled")
            return
        default:
            // Process batch
        }
    }
}
```

---

### 3. ❌ gRPC GetSeenList Loads ALL Pages

**Location**: `cmd/spider/handler/rpc.go:31-46`

**Problem**:
```go
func (c *RpcServer) _GetSeenList(ctx context.Context, request *spider.SeenListRequest) (*spider.SeenListResponse, error) {
    pages, err := c.db.Page.GetAllPages(ctx)  // Loads EVERYTHING!
```

**Impact**:
- Out of Memory (OOM) with large datasets
- Slow response times
- Network congestion
- Client overwhelmed with data

**Current State**: Request has `limit` field but it's completely ignored!

**Recommendation**:
```go
func (c *RpcServer) _GetSeenList(ctx context.Context, request *spider.SeenListRequest) (*spider.SeenListResponse, error) {
    limit := request.Limit
    if limit == 0 || limit > 1000 {
        limit = 100  // Default/max
    }

    pages, err := c.db.Page.GetPagesBatch(ctx, limit, offset)
    // Implement pagination
}
```

---

### 4. ❌ Error Handling Removes Valid Links

**Location**: `cmd/spider/handler/flow.go:46-48`

**Problem**:
```go
page, resp, err := site.NewPage(url)
if err != nil {
    slog.Error("Error fetching page", ...)
    h.Db.Queue.RemoveLink(ctx, url)  // Removes on ANY error!
    return
}
```

**Impact**:
- Temporary network errors remove valid URLs permanently
- No retry logic for transient failures
- Reduces crawl coverage

**Recommendation**:
```go
const maxRetries = 3

if err != nil {
    if isRetriable(err) && retries < maxRetries {
        // Update retry count in queue
        h.Db.Queue.IncrementRetry(ctx, url)
    } else {
        // Only remove after max retries
        h.Db.Queue.RemoveLink(ctx, url)
    }
}
```

---

### 5. ⚠️ Using Deprecated ioutil.ReadAll

**Location**: `cmd/spider/pkg/site/format.go:35`

**Problem**:
```go
body, err := ioutil.ReadAll(resp.Body)  // Deprecated in Go 1.16
```

**Recommendation**:
```go
body, err := io.ReadAll(resp.Body)
```

---

### 6. ❌ No Response Body Size Limit

**Location**: `cmd/spider/pkg/site/format.go:35`

**Problem**:
```go
body, err := ioutil.ReadAll(resp.Body)  // Could read GBs!
```

**Impact**:
- Could download multi-GB files
- Out of Memory
- Slow downs

**Recommendation**:
```go
const maxBodySize = 10 * 1024 * 1024 // 10MB

limitedReader := io.LimitReader(resp.Body, maxBodySize)
body, err := io.ReadAll(limitedReader)
```

---

### 7. ⚠️ Race Condition in Concurrent Crawls

**Location**: `cmd/spider/handler/flow.go:22-77`

**Problem**:
```go
for _, link := range links {
    wg.Add(1)
    go func(url string) {
        // Multiple goroutines accessing database
        // No error aggregation
        // Potential concurrent writes
    }(link)
}
```

**Impact**:
- Difficult to track which links failed
- No aggregate error reporting
- Potential database contention

**Recommendation**:
```go
type Result struct {
    URL   string
    Error error
}

results := make(chan Result, len(links))

for _, link := range links {
    go func(url string) {
        err := processLink(url)
        results <- Result{URL: url, Error: err}
    }(link)
}

// Aggregate results
for range links {
    result := <-results
    if result.Error != nil {
        // Handle error
    }
}
```

---

### 8. ❌ Commented Out Main Crawl Function

**Location**: `cmd/spider/main.go:115-117`

**Problem**:
```go
//go func() {
//    server.Scan(ctx)
//}()
```

**Impact**:
- Spider doesn't actually crawl!
- Only serves gRPC requests
- Queue never gets processed

**Recommendation**: Uncomment or explain why it's disabled.

---

### 9. ⚠️ Hardcoded Database Credentials

**Location**: `cmd/spider/main.go:39-45`

**Problem**:
```go
pg, connType, err := dbx.Postgres(
    os.Getenv("DB_USER"),      // Good
    os.Getenv("DB_PASSWORD"),  // Good
    os.Getenv("DB_HOST"),      // Good
    5432,                      // Hardcoded!
    databaseName,              // Constant!
)
```

**Recommendation**: Use environment variables for all config.

---

### 10. ❌ GetHealth RPC Not Implemented

**Location**: Defined in proto but missing implementation

**Problem**: Health check endpoint doesn't exist.

**Impact**: Can't monitor spider health in Kubernetes/production.

---

## Medium Priority Issues

### 11. No Timeout on GetSeenList Stream

gRPC stream has no timeout, could hang indefinitely.

### 12. Text Extraction Redundancy

`fetchText()` processes same elements multiple times (div, span contain p, h1, h2).

### 13. No User-Agent Set

HTTP requests don't set User-Agent, may be blocked by some sites.

### 14. robots.txt Fetched Every Time

No caching of robots.txt - fetches for every URL on same domain.

### 15. Queue Depth Not Monitored

`QueueDepth` metric defined but never updated.

---

## Low Priority Issues

### 16. Magic Numbers

`maxConcurrency = 10`, `timeout = 10s`, `MaxBodyLength = 10000` should be configurable.

### 17. No Structured Logging Context

Logs don't include correlation IDs or request context.

### 18. Panic in mustEmbedUnimplementedSpiderServer

Unnecessary panic, should just embed the struct properly.

---

## Security Issues

### 19. ⚠️ No URL Validation Before Fetch

Could be exploited to access internal services (SSRF).

**Recommendation**:
```go
func isAllowedURL(url string) bool {
    // Block private IPs
    // Block localhost
    // Block cloud metadata endpoints
}
```

### 20. No Rate Limiting Per Domain

Could accidentally DDoS a website.

**Recommendation**: Implement per-domain rate limiting.

---

## Performance Issues

### 21. ❌ N+1 Database Queries

Each link processed individually, no batch operations.

### 22. No Connection Pooling Config

Default connection pool might not be optimal.

### 23. Inefficient Text Extraction

Multiple iterations over same DOM tree.

---

## Testing Issues

### 24. ❌ No Tests for Main Functions

Critical paths have no test coverage:
- `Scan()` - not tested
- `GetSeenList()` - not tested
- `NewPage()` - not tested
- Error handling paths - not tested

---

## Recommendations Priority

### 🔴 Critical (Fix Immediately)
1. Implement metrics properly
2. Fix GetSeenList pagination
3. Add response body size limit
4. Fix context cancellation in Scan
5. Implement proper error handling with retries
6. Write comprehensive tests

### 🟡 High (Fix Soon)
7. Uncomment Scan() or document why disabled
8. Implement GetHealth RPC
9. Add URL validation (SSRF protection)
10. Use environment variables for all config

### 🟢 Medium (Fix Eventually)
11. Add robots.txt caching
12. Implement rate limiting
13. Fix deprecated ioutil usage
14. Optimize text extraction

---

## Suggested Refactoring

### Extract Crawler Logic
```go
type Crawler struct {
    config      *CrawlConfig
    rateLimiter *rate.Limiter
    robotsCache *RobotsCache
}

func (c *Crawler) CrawlURL(ctx context.Context, url string) (*Page, error)
```

### Add Circuit Breaker
```go
type CircuitBreaker struct {
    failureThreshold int
    timeout          time.Duration
}
```

### Implement Retry Logic
```go
func withRetry(fn func() error, maxRetries int) error {
    // Exponential backoff
}
```

---

## Test Coverage Gaps

Currently missing tests for:
- [ ] Concurrent crawl coordination
- [ ] gRPC stream handling
- [ ] Error scenarios (network, timeout, 404, 500)
- [ ] robots.txt parsing and caching
- [ ] Link extraction edge cases
- [ ] Context cancellation
- [ ] Metrics emission
- [ ] Database interaction failures

---

## Monitoring Gaps

Need to add:
- Crawl success/failure rates
- Average crawl duration
- Queue depth over time
- Active crawler count
- Robots.txt cache hit rate
- Domain-wise statistics

---

## Configuration Needed

Create `spider.Config`:
```go
type Config struct {
    MaxConcurrency    int
    CrawlTimeout      time.Duration
    MaxBodySize       int64
    MaxRetries        int
    QueueBatchSize    int
    UserAgent         string
    RespectRobots     bool
    RobotsCacheTTL    time.Duration
    RateLimitPerDomain float64
}
```