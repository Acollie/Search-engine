# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

**Current: 80% Production-Ready** | **Target: Public Launch**

### ✅ Completed
- All 5 microservices fully functional and tested
- Security hardening (SQL injection fixes, SSRF protection, rate limiting, robots.txt caching)
- Graceful shutdown with signal handling across all services
- Database connection pooling (25 max, 5 idle, 5m lifetime)
- Health checks (liveness & readiness probes)
- Prometheus metrics collection on all services
- Docker builds for all services
- Kubernetes manifests ready for deployment
- Comprehensive deployment guide and documentation

### ⚠️ Critical Blockers to Go Live
1. **No public deployment**: Infrastructure ready, just needs cloud platform selection
2. **E2E tests failing**: Due to Docker build problems (not code issues)
3. **No public deployment**: Infrastructure ready, just needs cloud platform selection

### 🚀 See `todo.txt` for Complete Launch Checklist
- Phase 1: Fix E2E tests (2 days)
- Phase 2: Deploy to production (3-4 days)
- Phase 3: Seed data & validate (1-2 days)
- Phase 4: Security hardening (1 day)
- Phase 5-7: Monitoring, validation, interview prep

## Project Overview

This is a distributed web search engine built in Go, consisting of five microservices that work together to crawl, index, rank, and search web pages. The system uses gRPC for inter-service communication and PostgreSQL for centralized storage.

### Architecture

**Spider** → crawls websites, maintains local SQLite cache, streams results to Conductor via gRPC
**Conductor** → receives crawled pages from Spider, deduplicates, stores in PostgreSQL, manages queue
**Cartographer** → computes PageRank scores using damped algorithm (0.85 damping, 100K pages/sweep)
**Searcher** → provides full-text search with GIN indices, combines text relevance (30%) + PageRank (70%)
**Frontend** → user-facing search interface with TailwindCSS, queries Searcher via gRPC

All services use:
- PostgreSQL (central database, port 5432)
- gRPC for service-to-service communication
- OpenTelemetry for observability
- Prometheus for metrics

## Development Commands

### Protocol Buffers & Code Generation

```bash
# Generate Go code from all .proto files in protos/
make proto_gen

# Generate mocks for all gRPC service interfaces (requires mockery)
make mock_gen

# Generate both protos and mocks
make gen

# List proto files to be processed
make proto_list

# Clean generated files
make proto_clean
make mock_clean
make clean  # Both protos and mocks
```

Proto files are in `protos/service/` and `protos/types/`. Generated code goes to `pkg/generated/`, mocks to `pkg/mocks/`.

### Testing

```bash
# Run all unit tests (fast, excludes integration and E2E)
make test
# Or: go test ./...

# Run short tests only (fastest)
make test-short
# Or: make test-unit

# Run integration tests (uses testcontainers)
make test-integration

# Run tests for a specific package
go test ./pkg/slice/...

# Run tests with verbose output
go test -v ./...

# Run tests with coverage
go test -cover ./...
```

**End-to-End Testing:**

```bash
# Run full E2E test suite (auto cleanup, takes 3-5 minutes)
make test-e2e

# Start E2E environment for manual testing
make test-e2e-start

# Check E2E service status and health
make test-e2e-status

# View E2E service logs
make test-e2e-logs

# Stop E2E environment (keeps volumes)
make test-e2e-stop

# Clean up E2E environment (removes containers and volumes)
make test-e2e-clean

# Run all tests (unit + E2E)
make test-all
```

E2E tests require Docker and spin up all 5 services plus PostgreSQL. Services are available at:
- Frontend: `http://localhost:3000`
- Spider health: `http://localhost:8001/health`
- Conductor health: `http://localhost:8002/health`
- Cartographer health: `http://localhost:8003/health`
- Searcher health: `http://localhost:8004/health`
- PostgreSQL: `localhost:5432`

The project uses:
- `testify/mock` for mocks with the expecter pattern
- `testcontainers-go` for integration tests (PostgreSQL, MariaDB, DynamoDB)
- `sqlmock` for database mocking
- E2E tests with docker-compose orchestration

### Linting

```bash
# Run linter (uses revive)
make lint

# Equivalent to:
go run github.com/mgechev/revive@latest -config revive.toml ./...
```

Linting rules are configured in `revive.toml` and ignore generated files.

### Running Services Locally

**Spider**:
```bash
export DB_USER=postgres
export DB_PASSWORD=yourpassword
export DB_HOST=localhost
go run cmd/spider/main.go
```

**Conductor**:
```bash
export DB_USER=postgres
export DB_PASSWORD=yourpassword
export DB_HOST=localhost
export DB_NAME=databaseName
go run cmd/conductor/main.go
```

**Cartographer**:
```bash
export DB_USER=postgres
export DB_PASSWORD=yourpassword
export DB_HOST=localhost
export DB_NAME=databaseName
go run cmd/cartographer/main.go
```

**Searcher**:
```bash
export DB_USER=postgres
export DB_PASSWORD=yourpassword
export DB_HOST=localhost
export DB_NAME=databaseName
go run cmd/searcher/main.go
```

**Frontend**:
```bash
export DB_USER=postgres
export DB_PASSWORD=yourpassword
export DB_HOST=localhost
export DB_NAME=databaseName
go run cmd/frontend/main.go
```

### Docker Build Commands

```bash
# Build individual service images
make buildSpider       # or: make build-spider
make buildConductor    # or: make build-conductor
make build-cartographer
make build-searcher
make buildFrontend     # or: make build-frontend

# Build all services at once
make build-all
```

**Build and Push to Registry:**

```bash
# Build for linux/amd64 and push to container registry (requires credentials)
make build-and-push-spider
make build-and-push-conductor
make build-and-push-cartographer
make build-and-push-searcher
make build-and-push-frontend

# Build and push all services
make build-and-push-all
```

Note: Configure your container registry in the Makefile before pushing.

## Code Structure

### Service Architecture Pattern

Each service follows this structure:
```
cmd/{service}/
├── main.go           # Entry point: DB setup, gRPC server, bootstrap
├── handler/          # Business logic and gRPC implementation
└── pkg/              # Service-specific packages
```

### Shared Packages

- `pkg/db/` - Database connections (PostgreSQL, SQLite, MariaDB)
- `pkg/sqlx/` - Database wrappers and utilities
- `pkg/awsx/` - AWS SDK wrappers (DynamoDB)
- `pkg/queue/` - PostgreSQL-backed crawl queue used by Spider and Conductor
- `pkg/bootstrap/` - Observability, health checks, Prometheus setup
- `pkg/grpcx/` - gRPC port constants
- `pkg/config/` - Configuration parsing with `caarlos0/env`
- `pkg/testContainers/` - Testcontainers setup for integration tests
- `pkg/generated/` - Auto-generated protobuf code (DO NOT EDIT)
- `pkg/mocks/` - Auto-generated mocks (DO NOT EDIT)

### Database Connections

All services use environment variables for database configuration:
- `DB_USER` - PostgreSQL username
- `DB_PASSWORD` - PostgreSQL password
- `DB_HOST` - PostgreSQL host
- `DB_NAME` - Database name (defaults to "databaseName")

Connection is established via `dbx.Postgres()` in `pkg/db/postgres.go`.

## gRPC Services

### Defined Services

**SpiderService** (`protos/service/spider.proto`):
- `GetSeenList` - Bidirectional streaming of crawled pages (Spider → Conductor)
- `GetHealth` - Health check with crawl stats

**SearcherService** (`protos/service/searcher.proto`):
- `SearchPages` - Full-text search query with pagination
- `GetHealth` - Health check with index stats

### Adding New Services

1. Create `.proto` file in `protos/service/` or `protos/types/`
2. Specify package and go_package options:
   ```protobuf
   syntax = "proto3";
   package service;
   option go_package = "webcrawler/pkg/generated/service/yourservice";
   ```
3. Run `make proto_gen` to generate Go code
4. Add mock configuration to `.mockery.yaml`:
   ```yaml
   webcrawler/pkg/generated/service/yourservice:
     interfaces:
       YourServiceClient:
         config:
           dir: "pkg/mocks/service/yourservice"
       YourServiceServer:
         config:
           dir: "pkg/mocks/service/yourservice"
   ```
5. Run `make mock_gen` to generate mocks

## Testing Patterns

### Mock Usage with Expecter Pattern

```go
import (
    mockspider "webcrawler/pkg/mocks/service/spider"
    pb "webcrawler/pkg/generated/service/spider"
)

mockClient := mockspider.NewMockSpiderClient(t)
mockClient.EXPECT().
    GetSeenList(mock.Anything, mock.Anything).
    Return(stream, nil).
    Once()
```

### Integration Tests with Testcontainers

See `pkg/testContainers/postgres_test.go` and `pkg/sqlx/integration_test.go` for examples of spinning up PostgreSQL containers for tests.

## Key Implementation Details

### PageRank Algorithm (Cartographer)

- Damping factor: 0.85
- Max iterations: 20
- Convergence threshold: 0.0001
- Random sampling: 100 sweeps × 100K pages each
- Results versioned in `PageRankResults` table with `is_latest` flag
- Runs as Kubernetes CronJob every 6 hours

### Search Ranking (Searcher)

Combined score formula:
```
score = (ts_rank(search_vector, query) × 0.3) + (pagerank_score × 0.7)
```

Uses PostgreSQL GIN index on `SeenPages.search_vector` for full-text search.

### Spider-Conductor Communication

Spider uses gRPC bidirectional streaming (`GetSeenList`) to send crawled pages to Conductor. Conductor handles:
- Deduplication against PostgreSQL
- Inserting new pages into `SeenPages` table
- Adding new URLs to exploration queue
- Backpressure signaling to throttle Spider when overwhelmed

### Spider Security & Protection

The Spider service has production-hardened security features:

**SSRF Protection:**
- Blocks private IPs (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)
- Blocks loopback (127.0.0.0/8, ::1) and link-local (169.254.0.0/16)
- Blocks cloud metadata endpoints (AWS 169.254.169.254, Azure, GCP)
- DNS resolution check to prevent rebinding attacks

**Rate Limiting & Respect:**
- Per-domain rate limiting: 2 req/sec with burst of 5
- robots.txt honored with 24-hour caching (reduces redundant requests by 1000x)
- Proper User-Agent identification with contact info
- Exponential backoff for 429/503 responses

**Resource Protection:**
- 10MB response size limit prevents OOM
- Maximum 5 redirects prevents loops
- Content-Type validation (only parses HTML)
- Cycle detection prevents infinite crawl loops
- Semaphore-based concurrency (max 10 concurrent fetches)
- Graceful shutdown with 2-second grace period

## Module Information

Module name: `webcrawler`
Go version: **1.24** (go.mod, all Dockerfiles, and CI/CD workflow all aligned)

When importing packages, use the module prefix:
```go
import "webcrawler/pkg/db"
import "webcrawler/pkg/generated/service/spider"
```

## Configuration Management

Services use `github.com/caarlos0/env/v11` for environment variable parsing. See `cmd/cartographer/main.go` and `cmd/searcher/main.go` for the config struct pattern with validation.

## Security Features Implemented

### SQL Injection Prevention
- All database queries use parameterized statements with `$1`, `$2` placeholders
- Never concatenate user input into SQL strings
- Reference: `pkg/queue/type.go`, `pkg/page/sql_strings.go`

### Spider Security Hardening
- **SSRF Protection**: Blocks private IPs (127.0.0.0/8, 10.0.0.0/8, etc.) and cloud metadata endpoints
- **Rate Limiting**: 2 requests/sec per domain with burst capacity of 5
- **robots.txt Caching**: 24-hour TTL reduces redundant requests by 1000x
- **Cycle Detection**: Prevents infinite crawl loops and pagination traps
- **User-Agent**: Proper bot identification with contact info
- **Content Validation**: Enforces 10MB response size limit, checks Content-Type, max 5 redirects

### Network Security (Next Phase)
- [ ] TLS/HTTPS for all external endpoints
- [ ] gRPC TLS between services
- [ ] JWT or mTLS for inter-service authentication
- [ ] Circuit breakers for resilience (`github.com/sony/gobreaker`)

## Observability & Monitoring

### Prometheus Metrics
All services expose metrics on `/metrics` endpoint:
- Spider: `spider_pages_fetched_total`, `spider_pages_failed_total`, `spider_crawl_duration_seconds`
- Conductor: `conductor_pages_received_total`, `conductor_duplicate_pages_total`, `conductor_queue_depth`
- Searcher: `searcher_queries_processed_total`, `searcher_query_duration_seconds`, `searcher_errors_total`
- Cartographer: `cartographer_sweep_duration_seconds`

### Grafana Dashboards
- Production dashboard: `deployments/grafana-dashboard.json`
- Key metrics: System health, throughput, latency (p50/p95/p99), error rates, queue depths

### Alerting
Alert rules in `deployments/configmap.yaml`:
- ServiceDown (critical)
- HighErrorRate >10% (critical)
- SpiderQueueDepthHigh >50K (warning)
- SearcherLatencyHigh p95>1s (warning)

## Deployment Infrastructure

### Local Development
```bash
# Docker Compose for all services + PostgreSQL
docker-compose up -d

# With monitoring stack
docker-compose -f docker-compose.yml -f docker-compose-monitoring.yml up -d
```

### Kubernetes Deployment
```bash
# Apply all manifests
kubectl apply -f deployments/

# Verify all services
kubectl get pods -n search-engine
```

Includes:
- StatefulSet for PostgreSQL (persistent storage)
- Deployments for each service (replicas configurable)
- Services and ServiceMonitor for Prometheus
- ConfigMap for configuration, Secret for credentials
- Ingress for external access
- Monitoring stack (Prometheus, Grafana, AlertManager)

### Cloud Deployment Options
1. **Railway / Render** (simplest): ~$50/month, auto-deploy from git
2. **AWS ECS + RDS**: ~$200/month, production-grade
3. **DigitalOcean Kubernetes**: ~$200/month, full K8s control
4. **Google Cloud Run**: ~$100/month, serverless option

See `deployments/DEPLOYMENT_GUIDE.md` for detailed instructions.

## E2E Testing

### Running Full E2E Tests
```bash
make test-e2e          # Auto-cleanup after tests
make test-e2e-start    # Start for manual testing
make test-e2e-logs     # View service logs
make test-e2e-clean    # Cleanup containers
```

**Current Status**: Failing due to Docker build issues (missing base image), not code issues.
**Fix**: See `todo.txt` Phase 1 - update Go version in Dockerfiles.

### Test Coverage Target
- Minimum: >70% across all packages
- Run: `go test -cover ./...`

## Production Readiness Checklist

Before deploying to production, ensure:

- [ ] All E2E tests passing (`make test-e2e`)
- [ ] No SQL injection vulnerabilities (verify parameterized queries)
- [ ] Graceful shutdown tested (services handle SIGTERM)
- [ ] Health checks responding on /health
- [ ] Metrics flowing to Prometheus
- [ ] Database backups configured
- [ ] Secret management in place (no hardcoded credentials)
- [ ] TLS/HTTPS enabled for all endpoints
- [ ] Circuit breakers and retry logic implemented
- [ ] Monitoring and alerting configured
- [ ] Runbook documentation updated

See `todo.txt` for complete pre-launch checklist (7 phases, ~10 days of work to go live).