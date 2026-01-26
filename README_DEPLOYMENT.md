# Search Engine - Quick Deployment & Fix Guide

## 🚀 Quick Start (Fresh Installation)

```bash
# 1. Build all services
make build-all

# 2. Start the stack
docker-compose up -d

# 3. Wait for services to be ready (30 seconds)
sleep 30

# 4. Add test data
docker-compose exec postgres psql -U postgres -d databaseName << 'EOF'
INSERT INTO seenpages (url, title, description, body, status_code, is_indexable, domain, content_type, language) VALUES
('https://golang.org', 'The Go Programming Language', 'Go programming language', 'Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.', 200, true, 'golang.org', 'text/html', 'en'),
('https://go.dev/doc/', 'Go Documentation', 'Documentation for Go', 'Official Go documentation including tutorials, guides, and API references.', 200, true, 'go.dev', 'text/html', 'en'),
('https://pkg.go.dev/', 'Go Packages', 'Discover Go packages', 'Search and browse Go packages and their documentation.', 200, true, 'pkg.go.dev', 'text/html', 'en');
EOF

# 5. Open frontend
open http://localhost:3000

# 6. Test search
curl "http://localhost:3000/search?q=golang"
```

## ⚠️ Known Issue: "Search service unavailable"

If you see this error, the Searcher service has a SQL query bug. Follow the fix in `TROUBLESHOOTING.md`.

**Quick Fix:**

1. Replace `cmd/searcher/handler/server.go` with the corrected version from `TROUBLESHOOTING.md`
2. Rebuild:
   ```bash
   docker-compose down
   docker rmi -f searcher:latest
   docker build --no-cache -f cmd/searcher/Dockerfile -t searcher:latest .
   docker-compose up -d
   ```
3. Re-add test data (step 4 above)
4. Test again

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `TROUBLESHOOTING.md` | **START HERE** - Complete fix for search issues |
| `IMPLEMENTATION_COMPLETE.md` | Full implementation summary |
| `QUICK_DEPLOY.md` | Deployment guide (Docker Compose & Kubernetes) |
| `GRAFANA_SETUP.md` | Monitoring dashboard setup |
| `FINAL_SUMMARY.md` | Project overview and status |
| `SEARCH_FIX.md` | Alternative search fix approaches |

## 🔍 Testing

### Check Services Are Running

```bash
docker-compose ps
```

All services should show "Up" and "healthy".

### Check Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f searcher
docker-compose logs -f frontend
```

### Manual Search Test

```bash
# Via curl
curl "http://localhost:3000/search?q=golang"

# Via browser
open http://localhost:3000/search?q=golang
```

### Expected Result

You should see HTML with search results showing:
- "The Go Programming Language"
- "Go Documentation"
- "Go Packages"

## 📊 Access Services

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | - |
| Grafana | http://localhost:3001 | admin/admin |
| Prometheus | http://localhost:9090 | - |
| Adminer (DB UI) | http://localhost:8888 | postgres/postgres |

## 🏗️ Architecture

```
Frontend (3000) → Searcher (9002) → PostgreSQL (5432)
                                   ↑
Spider (9001) → Conductor (8002) ──┘
                                   ↑
Cartographer (8003) ───────────────┘
```

## 🛠️ Build Commands

```bash
# Build individual services
make build-frontend
make build-searcher
make build-spider
make build-conductor
make build-cartographer

# Build all
make build-all

# Build and push to ECR
make build-and-push-all
```

## 🐛 Debug Commands

```bash
# Check database has data
docker-compose exec postgres psql -U postgres -d databaseName -c "SELECT COUNT(*) FROM seenpages;"

# Test database query directly
docker-compose exec postgres psql -U postgres -d databaseName -c "
SELECT sp.url, sp.title
FROM seenpages sp
WHERE sp.search_vector @@ to_tsquery('english', 'golang')
LIMIT 5;
"

# Check Searcher health
curl http://localhost:8004/health

# Check Frontend health
curl http://localhost:8005/health

# Restart a specific service
docker-compose restart searcher

# View resource usage
docker stats
```

## 🧹 Clean Up

```bash
# Stop services
docker-compose down

# Remove all data (WARNING: deletes database)
docker-compose down -v

# Remove images
docker-compose down --rmi all

# Complete cleanup
docker-compose down -v --rmi all
docker system prune -af
```

## 🚨 Emergency Recovery

If everything is broken:

```bash
# 1. Complete cleanup
docker-compose down -v
docker system prune -af
go clean -cache -modcache -testcache

# 2. Rebuild from scratch
make build-all

# 3. Start fresh
docker-compose up -d

# 4. Wait and check
sleep 30
docker-compose ps

# 5. Re-add test data
# (See step 4 in Quick Start)
```

## 📝 Next Steps

1. ✅ Fix search if showing "unavailable" (see TROUBLESHOOTING.md)
2. ✅ Add more test data to database
3. ✅ Set up Grafana dashboards (see GRAFANA_SETUP.md)
4. ⏳ Deploy to Kubernetes (see QUICK_DEPLOY.md)
5. ⏳ Configure production secrets
6. ⏳ Set up TLS/SSL
7. ⏳ Enable Spider to crawl real websites

## ✅ Success Checklist

- [ ] All services show "healthy" in `docker-compose ps`
- [ ] Frontend loads at http://localhost:3000
- [ ] Search for "golang" returns results
- [ ] No errors in logs
- [ ] Grafana shows metrics
- [ ] Database has test data

## 🆘 Getting Help

1. Check `TROUBLESHOOTING.md` for the search fix
2. Review logs: `docker-compose logs`
3. Verify database: `docker-compose exec postgres psql -U postgres -d databaseName -c "SELECT COUNT(*) FROM seenpages;"`
4. Check service health: `curl http://localhost:8005/health`
5. Try emergency recovery steps above

## 📌 Key Files

```
Search-engine/
├── cmd/
│   ├── frontend/          # Web interface (NEW)
│   ├── searcher/          # Search service
│   ├── spider/            # Web crawler
│   ├── conductor/         # Queue manager
│   └── cartographer/      # PageRank calculator
├── deployments/           # Kubernetes manifests
├── docker-compose.yml     # Local deployment
├── Makefile              # Build commands
├── TROUBLESHOOTING.md    # **READ THIS FOR SEARCH FIX**
└── README_DEPLOYMENT.md  # This file
```

## 🎯 Production Deployment

For Kubernetes deployment, see `QUICK_DEPLOY.md` sections:
- Kubernetes Deployment
- Build and Push to ECR
- Secrets Management
- Monitoring Setup

---

**Status:** MVP Complete with known search issue
**Fix:** Available in `TROUBLESHOOTING.md`
**Support:** All documentation files in root directory
