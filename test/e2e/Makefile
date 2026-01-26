# E2E Test Makefile
# Run from test/e2e/ directory or use parent Makefile targets

COMPOSE_FILE := docker-compose.e2e.yml
PROJECT_NAME := e2e

.PHONY: help up down restart clean clean-all logs logs-follow status health test test-verbose ps exec-db shell-db

# Default target
help:
	@echo "E2E Test Makefile"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Environment Management:"
	@echo "  make up           - Start E2E environment"
	@echo "  make down         - Stop E2E environment (keeps volumes)"
	@echo "  make restart      - Restart all services"
	@echo "  make clean        - Remove containers and volumes"
	@echo "  make clean-all    - Deep clean (removes images too)"
	@echo "  make ps           - Show running containers"
	@echo "  make status       - Show detailed service status"
	@echo ""
	@echo "Logs:"
	@echo "  make logs         - Show recent logs from all services"
	@echo "  make logs-follow  - Follow logs in real-time"
	@echo "  make logs-spider  - Show Spider logs"
	@echo "  make logs-conductor - Show Conductor logs"
	@echo "  make logs-cartographer - Show Cartographer logs"
	@echo "  make logs-searcher - Show Searcher logs"
	@echo "  make logs-frontend - Show Frontend logs"
	@echo "  make logs-postgres - Show PostgreSQL logs"
	@echo ""
	@echo "Testing:"
	@echo "  make test         - Run E2E tests"
	@echo "  make test-verbose - Run E2E tests with verbose output"
	@echo "  make test-subtest - Run specific subtest (e.g., TEST=infrastructure)"
	@echo ""
	@echo "Database:"
	@echo "  make exec-db      - Execute SQL query (e.g., QUERY='SELECT COUNT(*) FROM SeenPages')"
	@echo "  make shell-db     - Open psql shell"
	@echo "  make inspect-db   - Show database tables and counts"
	@echo ""
	@echo "Health Checks:"
	@echo "  make health       - Check health of all services"
	@echo "  make health-spider - Check Spider health"
	@echo "  make health-conductor - Check Conductor health"
	@echo "  make health-cartographer - Check Cartographer health"
	@echo "  make health-searcher - Check Searcher health"
	@echo "  make health-frontend - Check Frontend health"
	@echo ""
	@echo "Utilities:"
	@echo "  make trigger-pagerank - Manually trigger PageRank computation"
	@echo "  make search QUERY=<term> - Test search via Searcher"
	@echo "  make ports        - Show port mappings"

# ==============================================================================
# Environment Management
# ==============================================================================

up:
	@echo "Starting E2E environment..."
	docker-compose -f $(COMPOSE_FILE) up -d --build
	@echo ""
	@echo "✓ E2E environment started"
	@echo ""
	@echo "Services:"
	@echo "  Frontend:     http://localhost:3000"
	@echo "  Spider:       http://localhost:8001/health"
	@echo "  Conductor:    http://localhost:8002/health"
	@echo "  Cartographer: http://localhost:8003/health"
	@echo "  Searcher:     http://localhost:8004/health"
	@echo "  PostgreSQL:   localhost:5432"
	@echo ""
	@echo "Run 'make health' to check service status"
	@echo "Run 'make logs-follow' to see live logs"

down:
	@echo "Stopping E2E environment..."
	docker-compose -f $(COMPOSE_FILE) down
	@echo "✓ Stopped (volumes preserved)"

restart:
	@echo "Restarting E2E environment..."
	docker-compose -f $(COMPOSE_FILE) restart
	@echo "✓ Restarted"

clean:
	@echo "Cleaning up E2E environment..."
	docker-compose -f $(COMPOSE_FILE) down -v
	@echo "✓ Cleaned (containers and volumes removed)"

clean-all: clean
	@echo "Performing deep clean..."
	@docker ps -a --filter "name=e2e-" --format "{{.ID}}" | xargs -r docker rm -f 2>/dev/null || true
	@docker volume ls --filter "name=e2e" --format "{{.Name}}" | xargs -r docker volume rm 2>/dev/null || true
	@docker network ls --filter "name=e2e" --format "{{.ID}}" | xargs -r docker network rm 2>/dev/null || true
	@docker images --filter "reference=*/*" --filter "dangling=true" -q | xargs -r docker rmi 2>/dev/null || true
	@echo "✓ Deep clean complete"

ps:
	@docker-compose -f $(COMPOSE_FILE) ps

# ==============================================================================
# Logs
# ==============================================================================

logs:
	@docker-compose -f $(COMPOSE_FILE) logs --tail=100

logs-follow:
	@docker-compose -f $(COMPOSE_FILE) logs -f

logs-spider:
	@docker logs e2e-spider --tail 100 -f

logs-conductor:
	@docker logs e2e-conductor --tail 100 -f

logs-cartographer:
	@docker logs e2e-cartographer --tail 100 -f

logs-searcher:
	@docker logs e2e-searcher --tail 100 -f

logs-frontend:
	@docker logs e2e-frontend --tail 100 -f

logs-postgres:
	@docker logs e2e-postgres --tail 100 -f

# ==============================================================================
# Testing
# ==============================================================================

test: clean
	@echo "Running E2E tests..."
	@cd ../.. && go test -v -timeout 10m ./test/e2e/ || (make -C test/e2e logs && make -C test/e2e clean && exit 1)
	@make clean
	@echo "✓ E2E tests passed"

test-verbose: clean
	@echo "Running E2E tests with verbose output..."
	@cd ../.. && go test -v -timeout 10m -count=1 ./test/e2e/ || (make -C test/e2e logs && make -C test/e2e clean && exit 1)
	@make clean
	@echo "✓ E2E tests passed"

test-subtest:
	@if [ -z "$(TEST)" ]; then \
		echo "Error: TEST variable not set"; \
		echo "Usage: make test-subtest TEST=infrastructure"; \
		exit 1; \
	fi
	@echo "Running E2E subtest: $(TEST)..."
	@cd ../.. && go test -v -timeout 10m ./test/e2e/ -run TestE2E_SearchEngine/$(TEST)
	@echo "✓ Subtest $(TEST) passed"

# ==============================================================================
# Health Checks
# ==============================================================================

health:
	@echo "Checking service health..."
	@echo ""
	@echo -n "PostgreSQL:   " && (docker exec e2e-postgres pg_isready -U postgres > /dev/null 2>&1 && echo "✓ Ready" || echo "✗ Not Ready")
	@echo -n "Spider:       " && (curl -sf http://localhost:8001/health > /dev/null 2>&1 && echo "✓ Healthy" || echo "✗ Unhealthy")
	@echo -n "Conductor:    " && (curl -sf http://localhost:8002/health > /dev/null 2>&1 && echo "✓ Healthy" || echo "✗ Unhealthy")
	@echo -n "Cartographer: " && (curl -sf http://localhost:8003/health > /dev/null 2>&1 && echo "✓ Healthy" || echo "✗ Unhealthy")
	@echo -n "Searcher:     " && (curl -sf http://localhost:8004/health > /dev/null 2>&1 && echo "✓ Healthy" || echo "✗ Unhealthy")
	@echo -n "Frontend:     " && (curl -sf http://localhost:8005/health > /dev/null 2>&1 && echo "✓ Healthy" || echo "✗ Unhealthy")

health-spider:
	@curl -sf http://localhost:8001/health | jq . || echo "Error: Spider not responding"

health-conductor:
	@curl -sf http://localhost:8002/health | jq . || echo "Error: Conductor not responding"

health-cartographer:
	@curl -sf http://localhost:8003/health | jq . || echo "Error: Cartographer not responding"

health-searcher:
	@curl -sf http://localhost:8004/health | jq . || echo "Error: Searcher not responding"

health-frontend:
	@curl -sf http://localhost:8005/health | jq . || echo "Error: Frontend not responding"

status:
	@echo "E2E Environment Status"
	@echo "======================"
	@echo ""
	@docker-compose -f $(COMPOSE_FILE) ps
	@echo ""
	@make health

# ==============================================================================
# Database
# ==============================================================================

exec-db:
	@if [ -z "$(QUERY)" ]; then \
		echo "Error: QUERY variable not set"; \
		echo "Usage: make exec-db QUERY='SELECT COUNT(*) FROM SeenPages'"; \
		exit 1; \
	fi
	@docker exec -it e2e-postgres psql -U postgres -d databaseName -c "$(QUERY)"

shell-db:
	@echo "Opening PostgreSQL shell..."
	@echo "Database: databaseName"
	@echo "User: postgres"
	@echo ""
	@docker exec -it e2e-postgres psql -U postgres -d databaseName

inspect-db:
	@echo "Database Inspection"
	@echo "==================="
	@echo ""
	@echo "Tables:"
	@docker exec e2e-postgres psql -U postgres -d databaseName -c "\dt"
	@echo ""
	@echo "Row Counts:"
	@echo -n "SeenPages:        " && docker exec e2e-postgres psql -U postgres -d databaseName -tAc "SELECT COUNT(*) FROM SeenPages"
	@echo -n "Queue:            " && docker exec e2e-postgres psql -U postgres -d databaseName -tAc "SELECT COUNT(*) FROM Queue"
	@echo -n "Links:            " && docker exec e2e-postgres psql -U postgres -d databaseName -tAc "SELECT COUNT(*) FROM Links"
	@echo -n "PageRankResults:  " && docker exec e2e-postgres psql -U postgres -d databaseName -tAc "SELECT COUNT(*) FROM PageRankResults"
	@echo ""
	@echo "Recent Pages:"
	@docker exec e2e-postgres psql -U postgres -d databaseName -c "SELECT url, title FROM SeenPages ORDER BY crawl_time DESC LIMIT 5"

# ==============================================================================
# Utilities
# ==============================================================================

trigger-pagerank:
	@echo "Triggering PageRank computation..."
	@curl -X POST http://localhost:8003/compute || echo "Error: Failed to trigger PageRank"
	@echo ""
	@echo "Check logs: make logs-cartographer"

search:
	@if [ -z "$(QUERY)" ]; then \
		echo "Error: QUERY variable not set"; \
		echo "Usage: make search QUERY='programming language'"; \
		exit 1; \
	fi
	@echo "Searching for: $(QUERY)"
	@echo ""
	@curl -s "http://localhost:3000/search?q=$(QUERY)&page=1" | grep -o '<title>[^<]*</title>' || echo "No results"

ports:
	@echo "Port Mappings"
	@echo "============="
	@echo ""
	@echo "Frontend:     3000  -> http://localhost:3000"
	@echo "PostgreSQL:   5432  -> localhost:5432"
	@echo "Spider:       8001  -> http://localhost:8001/health (health)"
	@echo "              9001  -> localhost:9001 (gRPC)"
	@echo "Conductor:    8002  -> http://localhost:8002/health"
	@echo "Cartographer: 8003  -> http://localhost:8003/health"
	@echo "              8003  -> http://localhost:8003/compute (trigger)"
	@echo "Searcher:     8004  -> http://localhost:8004/health (health)"
	@echo "              9002  -> localhost:9002 (gRPC)"
	@echo "Frontend:     8005  -> http://localhost:8005/health (health)"

# ==============================================================================
# Service-Specific Actions
# ==============================================================================

restart-spider:
	@docker-compose -f $(COMPOSE_FILE) restart spider
	@echo "✓ Spider restarted"

restart-conductor:
	@docker-compose -f $(COMPOSE_FILE) restart conductor
	@echo "✓ Conductor restarted"

restart-cartographer:
	@docker-compose -f $(COMPOSE_FILE) restart cartographer
	@echo "✓ Cartographer restarted"

restart-searcher:
	@docker-compose -f $(COMPOSE_FILE) restart searcher
	@echo "✓ Searcher restarted"

restart-frontend:
	@docker-compose -f $(COMPOSE_FILE) restart frontend
	@echo "✓ Frontend restarted"

restart-postgres:
	@docker-compose -f $(COMPOSE_FILE) restart postgres
	@echo "✓ PostgreSQL restarted"
	@echo "Warning: This will interrupt active connections"
