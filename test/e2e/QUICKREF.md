# E2E Tests - Quick Reference

## 🚀 Getting Started

```bash
# Run tests (auto cleanup)
make test-e2e

# Start environment for manual testing
make test-e2e-start

# Clean up when done
make test-e2e-clean
```

## 📋 Common Commands

### Testing
```bash
make test-e2e              # Run E2E tests
make test-e2e-start        # Start environment
make test-e2e-stop         # Stop (keep data)
make test-e2e-restart      # Restart all services
make test-e2e-clean        # Clean up everything
```

### Debugging
```bash
make test-e2e-logs         # View all logs
make test-e2e-status       # Check service health
cd test/e2e && make shell-db  # Database shell
cd test/e2e && make inspect-db # Database stats
```

### From test/e2e Directory
```bash
make up                    # Start
make down                  # Stop
make clean                 # Clean
make logs-follow           # Live logs
make health                # Health check
make test                  # Run tests
```

## 🔍 Service URLs

| Service | Health | Main |
|---------|--------|------|
| Frontend | http://localhost:8005/health | http://localhost:3000 |
| Spider | http://localhost:8001/health | grpc://localhost:9001 |
| Conductor | http://localhost:8002/health | - |
| Cartographer | http://localhost:8003/health | http://localhost:8003/compute |
| Searcher | http://localhost:8004/health | grpc://localhost:9002 |
| PostgreSQL | - | localhost:5432 |

## 🗄️ Database Access

```bash
# From test/e2e directory
make shell-db              # Interactive psql shell
make inspect-db            # Quick stats
make exec-db QUERY='SELECT COUNT(*) FROM SeenPages'

# Direct access
docker exec -it e2e-postgres psql -U postgres -d databaseName
```

## 🩺 Health Checks

```bash
# All services
make test-e2e-status

# Individual (from test/e2e)
make health-spider
make health-searcher
make health-frontend

# Manual curl
curl http://localhost:8001/health  # Spider
curl http://localhost:8004/health  # Searcher
```

## 📊 Logs

```bash
# From root
make test-e2e-logs         # All services

# From test/e2e
make logs-follow           # Live logs (all)
make logs-spider           # Spider only
make logs-searcher         # Searcher only
make logs-postgres         # Database only
```

## 🧹 Cleanup

```bash
# Standard cleanup
make test-e2e-clean

# Deep clean (removes images)
make test-e2e-clean-all

# From test/e2e
make clean                 # Standard
make clean-all             # Deep
./cleanup.sh               # Script
./cleanup.sh --deep        # Script (deep)
```

## 🔧 Troubleshooting

### Port conflicts
```bash
lsof -i :5432              # Check port
make test-e2e-clean-all    # Force cleanup
```

### Stuck containers
```bash
docker-compose -f test/e2e/docker-compose.e2e.yml kill
make test-e2e-clean
```

### Disk space
```bash
make test-e2e-clean-all
docker system prune -a --volumes
```

### Database issues
```bash
make test-e2e-clean        # Remove volumes
cd test/e2e && make inspect-db  # Check state
```

## 🧪 Testing Specific Components

### Run single subtest
```bash
cd test/e2e
make test-subtest TEST=infrastructure
make test-subtest TEST=spider_crawling
make test-subtest TEST=searcher_grpc
```

### Manual PageRank trigger
```bash
cd test/e2e
make trigger-pagerank
make logs-cartographer     # Check progress
```

### Test search
```bash
cd test/e2e
make search QUERY='programming'
make search QUERY='Go language'
```

## 📦 Service Management

```bash
cd test/e2e

# Restart individual service
make restart-spider
make restart-searcher
make restart-frontend

# View specific service
docker logs e2e-spider -f
docker logs e2e-searcher -f
```

## ⚡ Quick Workflows

### Run tests
```bash
make test-e2e              # From root
```

### Debug failing test
```bash
make test-e2e-start        # Start environment
make test-e2e-logs         # Check logs
make test-e2e-status       # Check health
cd test/e2e && make shell-db  # Check database
make test-e2e-clean        # Clean up
```

### Manual testing
```bash
make test-e2e-start        # Start
# Browse to http://localhost:3000
# Test search functionality
make test-e2e-clean        # Clean up
```

### Development cycle
```bash
cd test/e2e
make up                    # Start
make logs-follow           # Monitor logs
# Make code changes
make restart-searcher      # Restart service
make test                  # Run tests
make clean                 # Clean up
```

## 🐛 Debug Checklist

1. ✅ Docker running? `docker info`
2. ✅ Ports free? `lsof -i :5432`
3. ✅ Services healthy? `make test-e2e-status`
4. ✅ Logs clean? `make test-e2e-logs`
5. ✅ Database ready? `cd test/e2e && make inspect-db`
6. ✅ Previous cleanup? `make test-e2e-clean`

## 📚 Documentation

- Full guide: `test/e2e/README.md`
- Test code: `test/e2e/e2e_test.go`
- Helpers: `test/e2e/helpers.go`
- Compose: `test/e2e/docker-compose.e2e.yml`

## 💡 Tips

- Tests auto-cleanup on success
- Tests preserve environment on failure (for debugging)
- Use `-short` flag to skip E2E in normal test runs
- Check `make test-help` for all test targets
- Environment takes ~30s to start
- Full test suite takes 3-5 minutes
