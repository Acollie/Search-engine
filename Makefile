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

.PHONY: build-spider build-conductor build-cartographer build-searcher build-all

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

# Build all service images
build-all: build-spider build-conductor build-cartographer build-searcher
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

# Build and push all services to ECR
build-and-push-all: build-and-push-spider build-and-push-conductor build-and-push-cartographer build-and-push-searcher
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
