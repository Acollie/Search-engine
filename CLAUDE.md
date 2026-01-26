# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a distributed web search engine built in Go, consisting of five microservices that work together to crawl, index, rank, and search web pages. The system uses gRPC for inter-service communication and PostgreSQL for centralized storage.

### Architecture

**Spider** → crawls websites, maintains local SQLite cache, streams results to Conductor via gRPC
**Conductor** → receives crawled pages from Spider, deduplicates, stores in PostgreSQL, manages queue
**Cartographer** → computes PageRank scores using damped algorithm (0.85 damping, 100K pages/sweep)
**Searcher** → provides full-text search with GIN indices, combines text relevance (30%) + PageRank (70%)
**Frontend** → user-facing search interface

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
# Run all tests
go test ./...

# Run tests for a specific package
go test ./pkg/slice/...

# Run a single test file
go test ./pkg/slice/deduplication_test.go

# Run tests with verbose output
go test -v ./...

# Run tests with coverage
go test -cover ./...
```

The project uses:
- `testify/mock` for mocks with the expecter pattern
- `testcontainers-go` for integration tests (PostgreSQL, MariaDB, DynamoDB)
- `sqlmock` for database mocking

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
export QUEUE_URL=your-sqs-queue-url
export AWS_REGION=eu-west-1
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

### Docker Build Commands

```bash
# Build Spider image
make buildSpider

# Build Conductor image
make buildConductor
```

Note: These commands build for `linux/amd64`, tag, and push to ECR `967991486854.dkr.ecr.eu-west-1.amazonaws.com`.

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
- `pkg/awsx/` - AWS SDK wrappers (DynamoDB, SQS)
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
- `GetSeenList` - Stream of crawled pages
- `GetHealth` - Health check

**SearcherService** (`protos/service/searcher.proto`):
- `SearchPages` - Full-text search query
- `GetHealth` - Health check

### Adding New Services

1. Create `.proto` file in `protos/service/` or `protos/types/`
2. Specify package and go_package options
3. Run `make proto_gen`
4. Add mock configuration to `.mockery.yaml`
5. Run `make mock_gen`

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

Spider uses gRPC streaming (`GetSeenList`) to send crawled pages to Conductor. Conductor handles:
- Deduplication against PostgreSQL
- Inserting new pages into `SeenPages` table
- Adding new URLs to exploration queue

## Module Information

Module name: `webcrawler`
Go version: 1.24.0

When importing packages, use the module prefix:
```go
import "webcrawler/pkg/db"
import "webcrawler/pkg/generated/service/spider"
```

## Configuration Management

Services use `github.com/caarlos0/env/v11` for environment variable parsing. See `cmd/cartographer/main.go` and `cmd/searcher/main.go` for the config struct pattern with validation.