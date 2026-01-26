# End-to-End Testing

This directory contains comprehensive end-to-end tests for the distributed search engine. The tests validate the complete pipeline from URL crawling through search results using docker-compose.

## Overview

The E2E test suite validates all five microservices working together:

1. **Spider** - Crawls websites and stores pages
2. **Conductor** - Deduplicates and manages queue
3. **Cartographer** - Computes PageRank scores
4. **Searcher** - Provides full-text search with PageRank boosting
5. **Frontend** - User-facing web interface

## Architecture

```
┌──────────┐     ┌───────────┐     ┌──────────────┐
│  Spider  │────▶│ Conductor │────▶│  PostgreSQL  │
└──────────┘     └───────────┘     └──────────────┘
                                           │
                        ┌──────────────────┴──────────────────┐
                        │                                       │
                  ┌─────▼──────┐                        ┌──────▼───┐
                  │Cartographer│                        │ Searcher │
                  └────────────┘                        └──────────┘
                                                              │
                                                        ┌─────▼────┐
                                                        │ Frontend │
                                                        └──────────┘
```

## Prerequisites

- **Docker** - Version 20.10+ with docker-compose
- **Go** - Version 1.24+ (for running tests)
- **Free disk space** - 5+ GB for images and volumes
- **Available ports** - 3000, 5432, 8001-8005, 9001-9002

## Quick Start

```bash
# From project root
make test-e2e        # Run E2E tests with auto cleanup
make test-e2e-clean  # Clean up environment

# From test/e2e directory
cd test/e2e
make test            # Run tests
make up              # Start environment
make down            # Stop environment
make clean           # Remove containers and volumes
```

## Makefile Targets

### From Project Root

**Testing:**
```bash
make test              # Run unit tests
make test-short        # Run short tests only
make test-integration  # Run integration tests
make test-e2e          # Run E2E tests with auto cleanup
make test-all          # Run all tests
```

**E2E Management:**
```bash
make test-e2e-start    # Start E2E environment for manual testing
make test-e2e-stop     # Stop environment (keeps volumes)
make test-e2e-restart  # Restart all services
make test-e2e-status   # Show service status and health
make test-e2e-logs     # View all service logs
make test-e2e-clean    # Clean up (remove containers & volumes)
make test-e2e-clean-all # Deep clean (remove images too)
make test-help         # Show all available test targets
```

### From test/e2e Directory

**Environment:**
```bash
make up                # Start E2E environment
make down              # Stop environment
make restart           # Restart all services
make clean             # Remove containers and volumes
make clean-all         # Deep clean (removes images)
make ps                # Show running containers
make status            # Show detailed service status
```

**Logs:**
```bash
make logs              # Show recent logs from all services
make logs-follow       # Follow logs in real-time
make logs-spider       # Show Spider logs
make logs-conductor    # Show Conductor logs
make logs-cartographer # Show Cartographer logs
make logs-searcher     # Show Searcher logs
make logs-frontend     # Show Frontend logs
make logs-postgres     # Show PostgreSQL logs
```

**Testing:**
```bash
make test              # Run E2E tests with cleanup
make test-verbose      # Run with verbose output
make test-subtest TEST=infrastructure  # Run specific subtest
```

**Database:**
```bash
make shell-db          # Open psql shell
make inspect-db        # Show tables and row counts
make exec-db QUERY='SELECT COUNT(*) FROM SeenPages'  # Execute SQL
```

**Health Checks:**
```bash
make health            # Check all services
make health-spider     # Check Spider health
make health-searcher   # Check Searcher health
# ... (similar for other services)
```

**Utilities:**
```bash
make trigger-pagerank  # Manually trigger PageRank computation
make search QUERY='programming'  # Test search
make ports             # Show port mappings
```

## Test Phases

The E2E test runs through six phases:

### 1. Infrastructure Validation (0-30s)
- PostgreSQL starts and schema initializes
- Fixtures load (Queue URLs, SeenPages, Links)
- All services report healthy

### 2. Spider Crawling (30-90s)
- Spider crawls URLs from Queue
- Pages stored in SeenPages
- Search vectors auto-generate
- Links table populates

### 3. Conductor Deduplication (concurrent)
- Duplicate URLs rejected
- Unique constraint enforced
- Queue processing verified

### 4. Cartographer PageRank (60-120s)
- HTTP trigger endpoint called
- PageRank computation runs
- Results stored with versioning
- Score distribution validated

### 5. Searcher gRPC (90-120s)
- SearchPages RPC tested
- Results combine text + PageRank
- Pagination verified
- No-results queries handled

### 6. Frontend HTTP (120s+)
- Homepage loads
- Search endpoint returns HTML
- Results displayed correctly
- Pagination works

## Configuration

### docker-compose.e2e.yml

Optimized configuration for testing:
- **Fast health checks** - 5s intervals (vs 30s in production)
- **Short start periods** - 10s (vs 40s in production)
- **Debug logging** - LOG_LEVEL=debug for all services
- **HTTP trigger** - ENABLE_HTTP_TRIGGER=true for Cartographer
- **No monitoring** - Adminer/Prometheus/Grafana removed

### Test Fixtures

Located in `fixtures/`:

**01-seed-queue.sql** - Initial URLs for crawling:
```sql
INSERT INTO Queue (url, domain, status, priority) VALUES
  ('https://example.com', 'example.com', 'pending', 10),
  ('https://example.com/about', 'example.com', 'pending', 5),
  ('https://test.com', 'test.com', 'pending', 10);
```

**02-seed-pages.sql** - Pre-crawled pages for search:
```sql
INSERT INTO SeenPages (url, title, body, status_code, is_indexable) VALUES
  ('https://golang.org', 'Go Programming Language', 'Go is a statically typed...', 200, true),
  ('https://python.org', 'Python Programming', 'Python is a high-level...', 200, true),
  ('https://rust-lang.org', 'Rust Programming Language', 'Rust is a systems...', 200, true);
```

## Running Tests

### Standard Run
```bash
# Run with verbose output
go test -v -timeout 10m ./test/e2e/

# Run specific subtest
go test -v -timeout 10m ./test/e2e/ -run TestE2E_SearchEngine/infrastructure

# Run with race detection
go test -v -race -timeout 15m ./test/e2e/
```

### Skipping E2E Tests
```bash
# Unit tests only (E2E skipped automatically)
go test -short ./...

# Or use make targets
make test-short
```

### Manual docker-compose
```bash
# Start environment manually
docker-compose -f test/e2e/docker-compose.e2e.yml up -d --build

# View logs
docker-compose -f test/e2e/docker-compose.e2e.yml logs -f spider

# Stop environment
docker-compose -f test/e2e/docker-compose.e2e.yml down -v
```

## Cleanup Scenarios

### After Test Failure

If tests fail, the environment remains running for debugging:

```bash
# Check what's running
make test-e2e-status

# View logs to debug
make test-e2e-logs

# When done debugging, clean up
make test-e2e-clean
```

### Port Conflicts

If you see port allocation errors:

```bash
# Find what's using the port
lsof -i :5432  # or other conflicting port

# Force cleanup of E2E environment
make test-e2e-clean-all

# Or manually kill processes
docker ps -a | grep e2e
docker rm -f $(docker ps -a -q --filter "name=e2e-")
```

### Disk Space Issues

If you're running low on disk space:

```bash
# Deep clean E2E environment
make test-e2e-clean-all

# Clean all Docker resources (use with caution)
docker system prune -a --volumes

# Check disk usage
docker system df
```

### Stale Volumes

If database state is corrupt or outdated:

```bash
# Remove volumes
make test-e2e-clean

# Or manually
docker volume ls | grep e2e
docker volume rm $(docker volume ls -q --filter "name=e2e")
```

### Complete Reset

For a complete clean slate:

```bash
# From project root
make test-e2e-clean-all

# From test/e2e
make clean-all

# Verify cleanup
docker ps -a | grep e2e        # Should be empty
docker volume ls | grep e2e    # Should be empty
docker network ls | grep e2e   # Should be empty
```

### Automated Cleanup on Test Failure

The test suite automatically cleans up on failure, but if the process is interrupted (Ctrl+C), you may need manual cleanup:

```bash
# Quick cleanup
make test-e2e-clean

# If containers won't stop
docker-compose -f test/e2e/docker-compose.e2e.yml kill
make test-e2e-clean
```

## Troubleshooting

### Test fails with "Docker not available"
```
SKIP: Skipping E2E test - Docker not available
```
**Solution**: Start Docker Desktop or Docker daemon

### Port conflicts
```
Error: Bind for 0.0.0.0:5432 failed: port is already allocated
```
**Solution**: Stop conflicting services or change ports in docker-compose.e2e.yml

### Timeout errors
```
Error: timeout after 60s
```
**Solution**:
- Increase timeout in helpers.go pollUntil calls
- Check service logs: `docker logs e2e-{service}`
- Ensure system has enough resources (4GB+ RAM, 2+ CPU cores)

### Database connection errors
```
Error: failed to connect to PostgreSQL
```
**Solution**:
- Check PostgreSQL health: `docker logs e2e-postgres`
- Verify port 5432 is not blocked by firewall
- Ensure PostgreSQL container started: `docker ps | grep e2e-postgres`

### Service health check failures
```
Error: Spider not healthy
```
**Solution**:
- Check service logs: `docker logs e2e-spider`
- Verify database connection: `docker exec e2e-postgres pg_isready`
- Check health endpoint manually: `curl http://localhost:8001/health`

### Fixtures not loading
```
Error: Queue table should have seeded URLs
```
**Solution**:
- Check PostgreSQL logs: `docker logs e2e-postgres`
- Verify fixtures directory mounted: `docker inspect e2e-postgres | grep Mounts`
- Manually verify: `docker exec e2e-postgres psql -U postgres -d databaseName -c "SELECT COUNT(*) FROM Queue"`

### PageRank computation fails
```
Error: PageRank computation did not complete
```
**Solution**:
- Check Cartographer logs: `docker logs e2e-cartographer`
- Verify HTTP trigger enabled: `docker inspect e2e-cartographer | grep ENABLE_HTTP_TRIGGER`
- Manually trigger: `curl -X POST http://localhost:8003/compute`
- Ensure Links table has data: `docker exec e2e-postgres psql -U postgres -d databaseName -c "SELECT COUNT(*) FROM Links"`

### Search returns no results
```
Error: Should return results for 'programming language' query
```
**Solution**:
- Verify SeenPages has data: `docker exec e2e-postgres psql -U postgres -d databaseName -c "SELECT COUNT(*) FROM SeenPages"`
- Check search vectors: `docker exec e2e-postgres psql -U postgres -d databaseName -c "SELECT COUNT(*) FROM SeenPages WHERE search_vector IS NOT NULL"`
- Check Searcher logs: `docker logs e2e-searcher`
- Test gRPC manually: Use grpcurl or similar tool

### Frontend connection refused
```
Error: connection refused on localhost:3000
```
**Solution**:
- Check Frontend health: `curl http://localhost:8005/health`
- Verify Frontend started: `docker logs e2e-frontend`
- Check Searcher connection: `docker exec e2e-frontend ping searcher`

## Debugging

### Collect all logs
```bash
# Automated (runs on test failure)
# Logs saved to test output

# Manual collection
docker-compose -f test/e2e/docker-compose.e2e.yml logs > e2e-logs.txt
```

### Inspect database
```bash
# Connect to PostgreSQL
docker exec -it e2e-postgres psql -U postgres -d databaseName

# Check tables
\dt

# Query SeenPages
SELECT url, title FROM SeenPages LIMIT 5;

# Check PageRank results
SELECT * FROM PageRankResults WHERE is_latest=true LIMIT 5;

# Exit
\q
```

### Health checks
```bash
# Spider
curl http://localhost:8001/health

# Conductor
curl http://localhost:8002/health

# Cartographer
curl http://localhost:8003/health

# Searcher
curl http://localhost:8004/health

# Frontend
curl http://localhost:8005/health
```

### gRPC testing
```bash
# Install grpcurl
go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest

# Test Searcher
grpcurl -plaintext -d '{"query":"Go","limit":5}' localhost:9002 service.Searcher/SearchPages

# Test Spider health
grpcurl -plaintext localhost:9001 service.Spider/GetHealth
```

## Performance

Typical test duration by phase:
- Infrastructure: 20-30s
- Spider crawling: 30-60s
- Conductor: 10-20s (concurrent)
- Cartographer: 60-120s
- Searcher: 10-20s
- Frontend: 10-20s

**Total: 3-5 minutes**

## CI Integration

### GitHub Actions
```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-go@v4
        with:
          go-version: '1.24'
      - name: Run E2E tests
        run: make test-e2e
      - name: Cleanup
        if: always()
        run: make test-e2e-clean
```

### GitLab CI
```yaml
e2e:
  stage: test
  image: docker:latest
  services:
    - docker:dind
  script:
    - apk add --no-cache go make
    - make test-e2e
  after_script:
    - make test-e2e-clean
  timeout: 15m
```

## Development

### Adding new test scenarios

1. Add subtest to `e2e_test.go`:
```go
t.Run("new_scenario", testNewScenario)
```

2. Implement test function:
```go
func testNewScenario(t *testing.T) {
    ctx := context.Background()
    db, err := connectToPostgres(ctx)
    require.NoError(t, err)
    defer db.Close()

    // Test logic here
}
```

3. Update README with new scenario

### Modifying fixtures

Edit `fixtures/01-seed-queue.sql` or `fixtures/02-seed-pages.sql`:
```sql
INSERT INTO Queue (url, domain, status, priority) VALUES
  ('https://newsite.com', 'newsite.com', 'pending', 10);
```

Fixtures are loaded automatically on PostgreSQL startup.

### Adjusting timeouts

Edit `helpers.go` or individual test functions:
```go
err := pollUntil(ctx, 120*time.Second, func() (bool, error) {
    // Check condition
})
```

## Verification Checklist

The E2E test validates:
- ✅ PostgreSQL starts and schema initializes
- ✅ Fixtures load successfully
- ✅ All services report healthy
- ✅ Spider crawls URLs and stores pages
- ✅ Search vectors auto-generate
- ✅ Links table populates
- ✅ Conductor deduplicates URLs
- ✅ Cartographer computes PageRank
- ✅ PageRank scores vary (non-uniform)
- ✅ Searcher returns results via gRPC
- ✅ Searcher combines text + PageRank
- ✅ Searcher handles no-results queries
- ✅ Frontend homepage loads
- ✅ Frontend search returns HTML results
- ✅ Services shut down cleanly

## Contributing

When contributing to E2E tests:

1. **Keep tests deterministic** - Use fixtures, avoid flaky timing
2. **Add detailed logging** - Use `t.Log()` for debugging
3. **Verify cleanup** - Ensure `defer` statements run
4. **Test failure modes** - Verify error handling
5. **Update documentation** - Keep README current

## License

Same as main project.
