PROTO_SRC_DIR := protos
PROTO_OUT_DIR := pkg/generated
MOCK_OUT_DIR := pkg/mocks

# Generate protobuf code from all .proto files
proto_gen:
	@echo "Generating protobuf code from all .proto files..."
	@find $(PROTO_SRC_DIR) -name "*.proto" -type f ! -empty | while read proto_file; do \
		echo "  Processing $$proto_file"; \
		protoc --go_out=. --go-grpc_out=. \
			--go_opt=module=webcrawler \
			--go-grpc_opt=module=webcrawler \
			--proto_path=$(PROTO_SRC_DIR) \
			$$proto_file || exit 1; \
	done
	@echo "✓ All protobuf files generated successfully"

# Clean generated protobuf files
proto_clean:
	@echo "Cleaning generated protobuf files..."
	rm -rf $(PROTO_OUT_DIR)/service $(PROTO_OUT_DIR)/types
	@echo "✓ Cleaned"

# List all proto files that will be generated
proto_list:
	@echo "Proto files in $(PROTO_SRC_DIR):"
	@echo ""
	@echo "Files to be processed:"
	@find $(PROTO_SRC_DIR) -name "*.proto" -type f ! -empty -exec echo "  ✓ {}" \;
	@echo ""
	@echo "Empty files (skipped):"
	@find $(PROTO_SRC_DIR) -name "*.proto" -type f -empty -exec echo "  ⊗ {}" \; || echo "  (none)"

# Lint proto files using buf
proto_lint:
	@echo "Linting proto files with buf..."
	@which buf > /dev/null || (echo "Error: buf not installed. Install it from https://docs.buf.build/installation" && exit 1)
	@buf lint $(PROTO_SRC_DIR)
	@echo "✓ Proto files linted successfully"

# Check for breaking changes in proto files
proto_breaking:
	@echo "Checking for breaking changes in proto files..."
	@which buf > /dev/null || (echo "Error: buf not installed. Install it from https://docs.buf.build/installation" && exit 1)
	@buf breaking --against '.git#branch=main'
	@echo "✓ No breaking changes detected"

# Install buf locally (macOS/Linux)
proto_install_buf:
	@echo "Installing buf..."
	@if [ "$$(uname)" = "Darwin" ]; then \
		if command -v brew > /dev/null; then \
			brew install bufbuild/buf/buf; \
		else \
			echo "Homebrew not found. Install manually from https://docs.buf.build/installation"; \
			exit 1; \
		fi \
	else \
		curl -sSL "https://github.com/bufbuild/buf/releases/latest/download/buf-$$(uname -s)-$$(uname -m)" -o /usr/local/bin/buf && \
		chmod +x /usr/local/bin/buf; \
	fi
	@echo "✓ buf installed successfully"

# Build targets for all services
# These targets build Docker images for local development and production

.PHONY: build-spider build-conductor build-cartographer build-searcher build-frontend build-all

# Build Spider service
buildSpider: build-spider

build-spider:
	@echo "Building Spider service image..."
	docker build -f cmd/spider/Dockerfile -t spider:latest .
	@echo "✓ Spider image built successfully"

# Build Conductor service
buildConductor: build-conductor

build-conductor:
	@echo "Building Conductor service image..."
	docker build -f cmd/conductor/Dockerfile -t conductor:latest .
	@echo "✓ Conductor image built successfully"

# Build Cartographer service
build-cartographer:
	@echo "Building Cartographer service image..."
	docker build -f cmd/cartographer/Dockerfile -t cartographer:latest .
	@echo "✓ Cartographer image built successfully"

# Build Searcher service
build-searcher:
	@echo "Building Searcher service image..."
	docker build -f cmd/searcher/Dockerfile -t searcher:latest .
	@echo "✓ Searcher image built successfully"

# Build Frontend service
buildFrontend: build-frontend

build-frontend:
	@echo "Building Frontend service image..."
	docker build -f cmd/frontend/Dockerfile -t frontend:latest .
	@echo "✓ Frontend image built successfully"

# Build all service images
build-all: build-spider build-conductor build-cartographer build-searcher build-frontend
	@echo "✓ All service images built successfully"

# Build and push to ECR (requires AWS credentials and ECR repository)
build-and-push-spider:
	@echo "Building and pushing Spider to ECR..."
	docker buildx build --platform linux/amd64 -f cmd/spider/Dockerfile -t spider:latest .
	docker tag spider:latest 967991486854.dkr.ecr.eu-west-1.amazonaws.com/spider:latest
	#docker push 967991486854.dkr.ecr.eu-west-1.amazonaws.com/spider:latest
	@echo "✓ Spider pushed to ECR"

build-and-push-conductor:
	@echo "Building and pushing Conductor to ECR..."
	docker buildx build --platform linux/amd64 -f cmd/conductor/Dockerfile -t conductor:latest .
	docker tag conductor:latest 967991486854.dkr.ecr.eu-west-1.amazonaws.com/conductor:latest
	#docker push 967991486854.dkr.ecr.eu-west-1.amazonaws.com/conductor:latest
	@echo "✓ Conductor pushed to ECR"

build-and-push-cartographer:
	@echo "Building and pushing Cartographer to ECR..."
	docker buildx build --platform linux/amd64 -f cmd/cartographer/Dockerfile -t cartographer:latest .
	docker tag cartographer:latest 967991486854.dkr.ecr.eu-west-1.amazonaws.com/cartographer:latest
	#docker push 967991486854.dkr.ecr.eu-west-1.amazonaws.com/cartographer:latest
	@echo "✓ Cartographer pushed to ECR"

build-and-push-searcher:
	@echo "Building and pushing Searcher to ECR..."
	docker buildx build --platform linux/amd64 -f cmd/searcher/Dockerfile -t searcher:latest .
	docker tag searcher:latest 967991486854.dkr.ecr.eu-west-1.amazonaws.com/searcher:latest
	#docker push 967991486854.dkr.ecr.eu-west-1.amazonaws.com/searcher:latest
	@echo "✓ Searcher pushed to ECR"

build-and-push-frontend:
	@echo "Building and pushing Frontend to ECR..."
	docker buildx build --platform linux/amd64 -f cmd/frontend/Dockerfile -t frontend:latest .
	docker tag frontend:latest 967991486854.dkr.ecr.eu-west-1.amazonaws.com/frontend:latest
	#docker push 967991486854.dkr.ecr.eu-west-1.amazonaws.com/frontend:latest
	@echo "✓ Frontend pushed to ECR"

# Build and push all services to ECR
build-and-push-all: build-and-push-spider build-and-push-conductor build-and-push-cartographer build-and-push-searcher build-and-push-frontend
	@echo "✓ All services pushed to ECR"

# Generate mocks for all gRPC services using mockery
mock_gen:
	@echo "Generating mocks for gRPC services..."
	@which mockery > /dev/null || (echo "Error: mockery not installed. Run: go install github.com/vektra/mockery/v2@latest" && exit 1)
	@mockery
	@echo "✓ All mocks generated successfully in $(MOCK_OUT_DIR)/"

# Clean generated mock files
mock_clean:
	@echo "Cleaning generated mock files..."
	@rm -rf $(MOCK_OUT_DIR)
	@echo "✓ Cleaned"

# List mock configuration
mock_list:
	@echo "Mock configuration (.mockery.yaml):"
	@echo ""
	@echo "Output directory: $(MOCK_OUT_DIR)/"
	@echo ""
	@echo "Run 'make mock_gen' to generate mocks"

# Generate both protos and mocks
gen: proto_gen mock_gen
	@echo "✓ Generated all protos and mocks"

# Clean both protos and mocks
clean: proto_clean mock_clean
	@echo "✓ Cleaned all generated files"

lint:
	go run github.com/mgechev/revive@latest -config revive.toml ./...

# ==============================================================================
# Testing Targets
# ==============================================================================

.PHONY: test test-short test-unit test-integration test-e2e test-e2e-start test-e2e-stop test-e2e-restart test-e2e-clean test-e2e-clean-all test-e2e-logs test-e2e-status test-all test-help

# Run all unit tests (fast, no E2E)
test:
	@echo "Running unit tests..."
	go test ./...
	@echo "✓ Unit tests passed"

# Run only short tests (excludes integration and E2E tests)
test-short:
	@echo "Running short tests only..."
	go test -short ./...
	@echo "✓ Short tests passed"

# Alias for test-short
test-unit: test-short

# Run integration tests (uses testcontainers)
test-integration:
	@echo "Running integration tests..."
	go test -v -run Integration ./...
	@echo "✓ Integration tests passed"

# ==============================================================================
# E2E Testing Targets
# ==============================================================================

# Run end-to-end tests (requires Docker)
test-e2e: test-e2e-clean
	@echo "=========================================="
	@echo "Running End-to-End Tests"
	@echo "=========================================="
	@echo "Requirements:"
	@echo "  - Docker running"
	@echo "  - 5+ GB free disk space"
	@echo "  - Ports available: 3000, 5432, 8001-8005, 9001-9002"
	@echo ""
	@echo "This will take 3-5 minutes..."
	@echo ""
	@go test -v -timeout 10m ./test/e2e/ || (echo "" && echo "❌ E2E tests failed! Run 'make test-e2e-logs' to see service logs" && make test-e2e-clean && exit 1)
	@echo ""
	@echo "✓ E2E tests passed!"
	@make test-e2e-clean

# Start E2E environment (for manual testing)
test-e2e-start:
	@echo "Starting E2E environment..."
	docker-compose -f test/e2e/docker-compose.e2e.yml up -d --build
	@echo ""
	@echo "✓ E2E environment started"
	@echo ""
	@echo "Services:"
	@echo "  - Frontend:     http://localhost:3000"
	@echo "  - Spider:       http://localhost:8001/health"
	@echo "  - Conductor:    http://localhost:8002/health"
	@echo "  - Cartographer: http://localhost:8003/health"
	@echo "  - Searcher:     http://localhost:8004/health"
	@echo "  - PostgreSQL:   localhost:5432"
	@echo ""
	@echo "View logs:  make test-e2e-logs"
	@echo "Stop:       make test-e2e-stop"
	@echo "Cleanup:    make test-e2e-clean"

# Stop E2E environment (keeps volumes)
test-e2e-stop:
	@echo "Stopping E2E environment..."
	docker-compose -f test/e2e/docker-compose.e2e.yml stop
	@echo "✓ E2E environment stopped (volumes preserved)"
	@echo ""
	@echo "Restart: make test-e2e-restart"
	@echo "Clean:   make test-e2e-clean"

# Restart E2E environment
test-e2e-restart:
	@echo "Restarting E2E environment..."
	docker-compose -f test/e2e/docker-compose.e2e.yml restart
	@echo "✓ E2E environment restarted"

# Show E2E environment status
test-e2e-status:
	@echo "E2E Environment Status:"
	@echo ""
	@docker-compose -f test/e2e/docker-compose.e2e.yml ps
	@echo ""
	@echo "Health Checks:"
	@echo -n "  Spider:       " && (curl -sf http://localhost:8001/health > /dev/null 2>&1 && echo "✓ Healthy" || echo "✗ Unhealthy")
	@echo -n "  Conductor:    " && (curl -sf http://localhost:8002/health > /dev/null 2>&1 && echo "✓ Healthy" || echo "✗ Unhealthy")
	@echo -n "  Cartographer: " && (curl -sf http://localhost:8003/health > /dev/null 2>&1 && echo "✓ Healthy" || echo "✗ Unhealthy")
	@echo -n "  Searcher:     " && (curl -sf http://localhost:8004/health > /dev/null 2>&1 && echo "✓ Healthy" || echo "✗ Unhealthy")
	@echo -n "  Frontend:     " && (curl -sf http://localhost:8005/health > /dev/null 2>&1 && echo "✓ Healthy" || echo "✗ Unhealthy")
	@echo -n "  PostgreSQL:   " && (docker exec e2e-postgres pg_isready -U postgres > /dev/null 2>&1 && echo "✓ Ready" || echo "✗ Not Ready")

# View E2E service logs
test-e2e-logs:
	@echo "Fetching E2E service logs..."
	@echo ""
	@echo "=========================================="
	@echo "PostgreSQL Logs"
	@echo "=========================================="
	@docker logs e2e-postgres --tail 50 2>&1 || echo "(container not running)"
	@echo ""
	@echo "=========================================="
	@echo "Spider Logs"
	@echo "=========================================="
	@docker logs e2e-spider --tail 50 2>&1 || echo "(container not running)"
	@echo ""
	@echo "=========================================="
	@echo "Conductor Logs"
	@echo "=========================================="
	@docker logs e2e-conductor --tail 50 2>&1 || echo "(container not running)"
	@echo ""
	@echo "=========================================="
	@echo "Cartographer Logs"
	@echo "=========================================="
	@docker logs e2e-cartographer --tail 50 2>&1 || echo "(container not running)"
	@echo ""
	@echo "=========================================="
	@echo "Searcher Logs"
	@echo "=========================================="
	@docker logs e2e-searcher --tail 50 2>&1 || echo "(container not running)"
	@echo ""
	@echo "=========================================="
	@echo "Frontend Logs"
	@echo "=========================================="
	@docker logs e2e-frontend --tail 50 2>&1 || echo "(container not running)"

# Clean up E2E test environment (removes containers and volumes)
test-e2e-clean:
	@echo "Cleaning up E2E test environment..."
	@docker-compose -f test/e2e/docker-compose.e2e.yml down -v 2>/dev/null || true
	@echo "✓ E2E environment cleaned (containers and volumes removed)"

# Deep clean E2E environment (removes everything including images)
test-e2e-clean-all: test-e2e-clean
	@echo "Performing deep clean of E2E environment..."
	@echo "Removing E2E containers..."
	@docker ps -a --filter "name=e2e-" --format "{{.ID}}" | xargs -r docker rm -f 2>/dev/null || true
	@echo "Removing E2E volumes..."
	@docker volume ls --filter "name=e2e" --format "{{.Name}}" | xargs -r docker volume rm 2>/dev/null || true
	@echo "Removing E2E networks..."
	@docker network ls --filter "name=e2e" --format "{{.ID}}" | xargs -r docker network rm 2>/dev/null || true
	@echo "Removing dangling images..."
	@docker images -f "dangling=true" -q | xargs -r docker rmi 2>/dev/null || true
	@echo "✓ Deep clean complete"
	@echo ""
	@echo "Run 'docker system prune -a' to remove all unused Docker resources"

# Run all tests (unit + integration + E2E)
test-all: test-short test-e2e
	@echo ""
	@echo "=========================================="
	@echo "All Tests Passed! 🎉"
	@echo "=========================================="

# Help target for testing
test-help:
	@echo "Available Test Targets:"
	@echo ""
	@echo "Basic Tests:"
	@echo "  make test            - Run all unit tests"
	@echo "  make test-short      - Run short tests only (fast)"
	@echo "  make test-unit       - Alias for test-short"
	@echo "  make test-integration - Run integration tests"
	@echo ""
	@echo "End-to-End Tests:"
	@echo "  make test-e2e        - Run E2E tests (auto cleanup)"
	@echo "  make test-e2e-start  - Start E2E environment for manual testing"
	@echo "  make test-e2e-stop   - Stop E2E environment (keep data)"
	@echo "  make test-e2e-restart - Restart E2E environment"
	@echo "  make test-e2e-status - Show E2E environment status"
	@echo "  make test-e2e-logs   - View E2E service logs"
	@echo "  make test-e2e-clean  - Clean up E2E environment"
	@echo "  make test-e2e-clean-all - Deep clean (removes images too)"
	@echo ""
	@echo "All Tests:"
	@echo "  make test-all        - Run all tests (unit + E2E)"
	@echo ""
	@echo "Requirements for E2E tests:"
	@echo "  - Docker running"
	@echo "  - 5+ GB free disk space"
	@echo "  - Available ports: 3000, 5432, 8001-8005, 9001-9002"
