# Distributed Web Search Engine 🕷️

[![Go](https://github.com/Acollie/Go-Webcrawler/actions/workflows/go.yml/badge.svg)](https://github.com/Acollie/Go-Webcrawler/actions/workflows/go.yml)

A production-grade distributed web search engine, built using Go with five microservices, PostgreSQL persistence, and PageRank-based relevance ranking.

## ✨ Recent Updates

**🔒 Spider Security Hardening (Latest)**
- **SSRF Protection**: Comprehensive URL validation blocking private IPs and cloud metadata endpoints
- **Rate Limiting**: Per-domain throttling (2 req/sec) prevents DDoS
- **robots.txt Caching**: 24-hour TTL reduces redundant requests by 1000x
- **Cycle Detection**: Prevents infinite crawl loops and pagination traps
- **Production Ready**: All 26 tests passing, no goroutine leaks, proper graceful shutdown

![full_system.png](assets/full_system.png "Overview of the search engine")
![Example of a graph](assets/example.png "Example of a graph")

## System Architecture 🏗️

### High-Level Overview

### 1. Spider Service
Production-ready distributed web crawler with comprehensive security features.

**Responsibilities:**
- Crawls websites starting from seed URLs
- Respects robots.txt with 24-hour caching
- Maintains local SQLite cache for visited pages
- Streams discovered pages to Conductor via gRPC bidirectional streaming
- Handles HTTP errors gracefully with exponential backoff and retries

**Security & Protection:**
- **SSRF Protection**: Blocks private IPs, loopback, cloud metadata endpoints (AWS/Azure/GCP)
- **Rate Limiting**: 2 req/sec per domain with burst capacity of 5
- **Cycle Detection**: Prevents infinite crawl loops and pagination traps
- **User-Agent**: Proper bot identification with contact info
- **Content Validation**: Checks Content-Type, limits redirects (max 5), enforces 10MB response size limit

**Key Features:**
- Semaphore-based concurrency control (max 10 concurrent fetches)
- robots.txt caching with TTL (reduces redundant requests by 1000x)
- Proper link extraction with canonicalization
- gRPC streaming with backpressure support
- Graceful shutdown with 2-second grace period
- Full Prometheus metrics integration

**Endpoints:**
- gRPC: `:9001` - GetSeenList (bidirectional stream)
- Health: `:8080/health` (liveness probe)
- Metrics: `:8080/metrics` (Prometheus)

---

### 2. Conductor Service
Acts as a data hub, deduplicating pages and managing the crawl queue.

**Responsibilities:**
- Receives crawled pages from Spider via gRPC streaming
- Deduplicates against PostgreSQL `SeenPages` table
- Stores new pages in centralized database
- Manages the exploration queue for new URLs
- Implements backpressure to throttle Spider if overwhelmed

**Key Features:**
- Concurrent message processing with queued writes
- Duplicate detection using URL hashing
- Queue depth monitoring for backpressure
- Graceful shutdown with in-flight message completion

**Endpoints:**
- Health: `:8080/health` (liveness probe)

---

### 3. Cartographer Service
Computes PageRank scores using graph analysis.

**Algorithm:**
- **Damping Factor**: 0.85 (standard web search setting)
- **Convergence Threshold**: 0.0001
- **Max Iterations**: 20 per sweep
- **Sampling Strategy**: 100 random pages × 100 sweeps for large graphs

**Key Features:**
- Versioned PageRank results with timestamps
- `is_latest` flag for serving current rankings
- Scheduled execution via Kubernetes CronJob (every 6 hours)
- Graceful handling of empty or sparse graphs
- Low-memory random sampling for large graphs

**Endpoints:**
- Health: `:8080/health` (liveness probe)

---

### 4. Searcher Service
Provides full-text search with PageRank relevance boosting.

**Search Formula:**
```
Final Score = (TextRelevance × 0.3) + (PageRank × 0.7)
```

**Features:**
- PostgreSQL GIN indices for efficient full-text search
- TsVector-based query parsing
- Multi-dimensional relevance ranking
- Result pagination and filtering
- Query response latency tracking

**Endpoints:**
- gRPC: `:9002` - SearchPages
- Health: `:8080/health` (readiness probe with DB validation)

---

### 5. Frontend Service
User-facing search interface.

**Features:**
- Simple, fast search box interface
- Real-time search results with pagination
- Display of page title, URL, and snippet
- Search latency and result count metrics
- Responsive design with TailwindCSS

---

## Database Schema 📊

### Core Tables

**SeenPages**
- `id` (BIGSERIAL PRIMARY KEY)
- `url` (VARCHAR UNIQUE)
- `title` (VARCHAR)
- `body` (TEXT)
- `links` (TEXT[])
- `prominence` (FLOAT8) - PageRank score
- `created_at` (TIMESTAMP)

**Queue**
- `id` (BIGSERIAL PRIMARY KEY)
- `url` (VARCHAR UNIQUE)

**PageRankResults**
- `id` (BIGSERIAL PRIMARY KEY)
- `page_id` (BIGINT FK)
- `score` (FLOAT8)
- `sweep_id` (VARCHAR)
- `is_latest` (BOOLEAN)
- `created_at` (TIMESTAMP)

## Protocol Buffers (gRPC) 📡

### Proto File Structure

The project uses Protocol Buffers for service definitions and data types:

```
protos/
├── service/          # Service definitions
│   └── spider.proto  # Spider and Searcher service APIs
└── types/           # Shared message types
    └── site.proto   # Common data structures
```

### Services Defined

**Spider Service** (`protos/service/spider.proto`)
- `GetSeenList`: Stream of seen pages from the spider
- `GetHealth`: Health check endpoint

**Searcher Service** (`protos/service/spider.proto`)
- `SearchPages`: Query pages with full-text search

### Generating Proto Code

The Makefile provides commands to generate Go code from all `.proto` files:

```bash
# Generate Go code from all proto files
make proto_gen

# List all proto files that will be generated
make proto_list

# Clean generated proto files
make proto_clean
```

Generated files are placed in `pkg/generated/` with the following structure:
```
pkg/generated/
├── service/
│   └── spider/
│       ├── spider.pb.go       # Message types
│       └── spider_grpc.pb.go  # gRPC service code
└── types/
    └── site/
        └── site.pb.go         # Common types
```

### Adding New Proto Files

To add new service definitions:

1. Create your `.proto` file in the appropriate directory:
   - `protos/service/` for service definitions
   - `protos/types/` for shared message types

2. Ensure you specify the correct package and go_package:
```protobuf
syntax = "proto3";
package service;
option go_package = "service/your_service";
```

3. Run `make proto_gen` to generate Go code

4. Import the generated code in your service:
```go
import (
    pb "webcrawler/pkg/generated/service/your_service"
)
```

The Makefile will automatically find and generate all `.proto` files in the `protos/` directory tree

## Mock Generation (Testing) 🧪

### Overview

The project uses [Mockery](https://vektra.github.io/mockery/) to automatically generate mocks for all gRPC service interfaces. These mocks are essential for unit testing services without requiring actual gRPC connections.

### Generated Mocks

Mocks are generated for both client and server interfaces:

- **SpiderClient** - Mock for testing code that calls the Spider service
- **SpiderServer** - Mock for testing Spider service implementations
- **SearcherClient** - Mock for testing code that calls the Searcher service
- **SearcherServer** - Mock for testing Searcher service implementations

### Generating Mocks

```bash
# Generate mocks for all gRPC services
make mock_gen

# List which interfaces will be mocked
make mock_list

# Clean generated mocks
make mock_clean

# Generate both protos and mocks in one command
make gen

# Clean both protos and mocks
make clean
```

### Mock Location

Generated mocks are placed in:
```
pkg/mocks/
└── service/
    └── spider/
        ├── SpiderClient.go
        ├── SpiderServer.go
        ├── SearcherClient.go
        └── SearcherServer.go
```

### Using Mocks in Tests

Mocks are generated with the **expecter pattern** for type-safe test assertions:

```go
import (
    "testing"
    "github.com/stretchr/testify/mock"
    mockspider "webcrawler/pkg/mocks/service/spider"
    pb "webcrawler/pkg/generated/service/spider"
)

func TestSearchService(t *testing.T) {
    // Create mock client
    mockClient := mockspider.NewMockSearcherClient(t)

    // Setup expectations using the expecter pattern
    mockClient.EXPECT().
        SearchPages(mock.Anything, mock.Anything).
        Return(&pb.SearchResponse{
            Pages: []*pb.Page{{Url: "https://example.com"}},
        }, nil).
        Once()

    // Use the mock in your test
    resp, err := mockClient.SearchPages(context.Background(), &pb.SearchRequest{
        Query: "test",
        Limit: 10,
    })

    // Assertions
    assert.NoError(t, err)
    assert.Len(t, resp.Pages, 1)

    // Verify all expectations were met
    mockClient.AssertExpectations(t)
}
```

### Prerequisites

Install mockery if not already installed:

```bash
go install github.com/vektra/mockery/v2@latest
```

The Makefile will automatically check if mockery is installed and provide installation instructions if needed.

### Configuration

Mock generation is configured in `.mockery.yaml`. To add mocks for new services:

1. Generate your proto files first: `make proto_gen`
2. Add the new interface to `.mockery.yaml`
3. Run `make mock_gen`

Example configuration:
```yaml
packages:
  webcrawler/pkg/generated/service/your_service:
    interfaces:
      YourServiceClient:
        config:
          dir: "pkg/mocks/service/your_service"
      YourServiceServer:
        config:
          dir: "pkg/mocks/service/your_service"
```

## Development Guide 🛠️

### Local Setup

**Prerequisites:**
- Go 1.23.0+
- PostgreSQL 12+
- Docker (optional, for containerized PostgreSQL)

**Environment Variables:**
```bash
export DB_USER=postgres
export DB_PASSWORD=yourpassword
export DB_HOST=localhost
export DB_NAME=databaseName
export AWS_REGION=eu-west-1
export QUEUE_URL=your-sqs-queue-url  # For Conductor only
```

### Building Services

```bash
# Build all services
go build ./cmd/spider
go build ./cmd/conductor
go build ./cmd/cartographer
go build ./cmd/searcher

# Or use the Makefile
make buildSpider
make buildConductor
```

### Running Services Locally

**Spider:**
```bash
export DB_HOST=localhost
go run cmd/spider/main.go
```

**Conductor:**
```bash
export QUEUE_URL=your-sqs-queue-url
export AWS_REGION=eu-west-1
go run cmd/conductor/main.go
```

**Cartographer:**
```bash
go run cmd/cartographer/main.go
```

**Searcher:**
```bash
go run cmd/searcher/main.go
```

### Testing

The project has comprehensive test coverage with unit tests, integration tests, and mock-based testing.

```bash
# Run all tests
go test ./...

# Run specific package tests
go test ./cmd/spider/handler/...

# Run tests with coverage
go test -cover ./...

# Run tests with verbose output
go test -v ./...
```

**Spider Test Results:**
- 26/26 tests passing ✅
- Coverage includes security features, rate limiting, cycle detection, and error handling
- Mock-based testing for gRPC services
- Integration tests with testcontainers for database operations

### Linting

```bash
# Run linter (uses revive)
make lint

# Or directly
go run github.com/mgechev/revive@latest -config revive.toml ./...
```

---

## Production Deployment 🚀

### Docker Build

```bash
# Build Spider image
make buildSpider

# Build Conductor image
make buildConductor
```

These build for `linux/amd64` and push to ECR.

### Kubernetes Deployment

**Prerequisites:**
- PostgreSQL instance accessible from cluster
- Kubernetes 1.20+
- Proper RBAC configuration

**Key Features:**
- Health checks (liveness and readiness probes)
- Graceful shutdown handling (30s termination grace period)
- Resource limits and requests
- Service mesh ready (mTLS support)

**Example deployment configuration:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spider
spec:
  replicas: 3
  selector:
    matchLabels:
      app: spider
  template:
    metadata:
      labels:
        app: spider
    spec:
      containers:
      - name: spider
        image: <YOUR_ACCOUNT_ID>.dkr.ecr.eu-west-1.amazonaws.com/spider:latest
        ports:
        - containerPort: 9001
          name: grpc
        - containerPort: 8080
          name: health
        env:
        - name: DB_USER
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: username
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: password
        - name: DB_HOST
          value: postgres.default.svc.cluster.local
        livenessProbe:
          httpGet:
            path: /health
            port: health
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: health
          initialDelaySeconds: 5
          periodSeconds: 5
        terminationGracePeriodSeconds: 30
```

### Cartographer CronJob

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: cartographer
spec:
  schedule: "0 */6 * * *"  # Every 6 hours
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: cartographer
            image: <YOUR_ACCOUNT_ID>.dkr.ecr.eu-west-1.amazonaws.com/cartographer:latest
            env:
            - name: DB_USER
              valueFrom:
                secretKeyRef:
                  name: db-credentials
                  key: username
          restartPolicy: OnFailure
```

---

## Performance Characteristics ⚡

### Throughput

| Service | Throughput | Bottleneck |
|---------|-----------|-----------|
| Spider | 10 concurrent crawls | Network latency |
| Conductor | 1000s msgs/sec | PostgreSQL write throughput |
| Cartographer | 100K pages/sweep | Random sampling |
| Searcher | <100ms p95 | PostgreSQL query |

### Memory Usage

| Service | Memory | Notes |
|---------|--------|-------|
| Spider | 50-100 MB | SQLite cache + security components + goroutines |
| Conductor | 100-200 MB | Message buffering |
| Cartographer | 500 MB | Graph computation |
| Searcher | 100 MB | Query cache |

### Spider Metrics

The Spider service exposes comprehensive Prometheus metrics:

| Metric | Type | Description |
|--------|------|-------------|
| `spider_pages_fetched_total` | Counter | Successfully crawled pages by domain |
| `spider_pages_failed_total` | Counter | Failed pages by reason (invalid_url, cycle, timeout, etc.) |
| `spider_robots_blocked_total` | Counter | Pages blocked by robots.txt by domain |
| `spider_links_extracted_total` | Counter | Links discovered by domain |
| `spider_queue_depth` | Gauge | Current queue size |
| `spider_active_crawls` | Gauge | Currently active crawl goroutines |
| `spider_crawl_duration_seconds` | Histogram | Crawl latency by domain |

### Database Optimization

**Connection Pooling:**
- Max open connections: 25
- Max idle connections: 5
- Connection max lifetime: 5 minutes

**Indices:**
```sql
CREATE INDEX idx_pages_url ON SeenPages(url);
CREATE INDEX idx_pagerank_is_latest ON PageRankResults(is_latest);
CREATE INDEX idx_pagerank_scores ON PageRankResults(score DESC);
CREATE INDEX idx_queue_url ON Queue(url);

-- Full-text search index
CREATE INDEX idx_pages_search ON SeenPages USING GIN(search_vector);
```

---

## Security Considerations 🔒

### Spider Security (Production-Hardened)

**SSRF Protection:**
- Validates all URLs before crawling
- Blocks private IP ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)
- Blocks loopback (127.0.0.0/8, ::1) and link-local (169.254.0.0/16)
- Blocks cloud metadata endpoints:
  - AWS: 169.254.169.254, fd00:ec2::254
  - Azure: 169.254.169.253
  - GCP: metadata.google.internal
- Performs DNS resolution to detect rebinding attacks

**Rate Limiting & Respect:**
- Per-domain rate limiting (2 req/sec, burst 5) prevents DDoS
- robots.txt honored with 24-hour caching
- Proper User-Agent identification with contact info
- Graceful handling of 429/503 responses with exponential backoff

**Resource Protection:**
- 10MB response size limit prevents OOM
- Maximum 5 redirects prevents loops
- Content-Type validation (only parses HTML)
- Cycle detection prevents infinite crawl loops
- No goroutine leaks - proper cleanup on shutdown

### SQL Injection Prevention
- All database queries use parameterized statements
- No string formatting or concatenation of user input
- Example: `db.ExecContext(ctx, "INSERT INTO Queue (url) VALUES ($1)", url)`

### Network Security
- gRPC services use mTLS in production
- Health checks available for load balancer validation
- Graceful shutdown prevents in-flight request loss

### Resource Limits
- Connection pooling prevents database exhaustion
- Semaphore-based concurrency prevents goroutine explosion
- Memory limits enforced in Kubernetes

### Monitoring & Logging
- Structured logging with slog
- Prometheus metrics exported on `/metrics`
- OpenTelemetry integration for distributed tracing
- Domain-level metrics for rate limiting and robots.txt

---

## Scaling Considerations 📈

### Horizontal Scaling

**Spider:** Scale replicas up to crawl more pages in parallel
- Each instance maintains independent SQLite cache
- No inter-Spider communication required
- Backpressure prevents overwhelming downstream

**Conductor:** Single instance (state machine for deduplication)
- Could be refactored with distributed deduplication (Bloom filters)
- Currently scales up to 10K pages/sec

**Cartographer:** Runs as scheduled batch job
- Already samples pages (doesn't need full graph)
- Could parallelize sweep computation

**Searcher:** Scale replicas for query throughput
- Read-only access to PostgreSQL
- Results cache (Redis) recommended for popular queries

### Vertical Scaling

**Database:** Consider PostgreSQL upgrades for write throughput
- Increase `max_connections` and `shared_buffers`
- Add SSD for write amplification
- Replication for read distribution

**Memory:** Each service can be run with more resources for local caching
- Spider: Increase SQLite cache size
- Searcher: Larger query result cache

---

## Architecture Diagrams 📐

The project includes detailed D2 diagrams showing:

- **Overview**: High-level system architecture
- **Spider**: Web crawling pipeline
- **Streaming**: gRPC bidirectional communication
- **Back-off**: Backpressure mechanism

View diagrams in `assets/diagrams/`

---

## Troubleshooting 🔧

### Common Issues

**"database connection refused"**
- Ensure PostgreSQL is running: `psql -U postgres -h localhost`
- Check environment variables are set
- Verify network connectivity

**"gRPC: error reading from client"**
- Check Spider is running and accessible
- Verify firewall rules allow gRPC traffic
- Check logs for graceful shutdown handling

**"PageRank computation taking too long"**
- Check database performance: `EXPLAIN ANALYZE` on queries
- Consider increasing sweep parameters
- Monitor CPU and memory usage

**Tests failing with "testcontainers"**
- Ensure Docker is running
- Check Docker daemon permissions
- Pull required container images

---

## Contributing 🤝

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Write tests for new functionality
3. Run linter and tests: `make lint && go test ./...`
4. Commit with clear messages
5. Open a pull request with detailed description

---

## License 📄

MIT License - See [LICENSE](LICENSE) file for details.

---

## References 📚

- [Protocol Buffers Documentation](https://developers.google.com/protocol-buffers)
- [gRPC Go Documentation](https://grpc.io/docs/languages/go/)
- [PageRank Algorithm](https://en.wikipedia.org/wiki/PageRank)
- [PostgreSQL Full-Text Search](https://www.postgresql.org/docs/current/textsearch.html)

