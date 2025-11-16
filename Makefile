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

buildSpider:
	docker buildx build --platform linux/amd64 -f cmd/spider/Dockerfile -t spider .
	docker tag spider:latest 967991486854.dkr.ecr.eu-west-1.amazonaws.com/spider:latest
	docker push 967991486854.dkr.ecr.eu-west-1.amazonaws.com/spider:latest

buildConductor:
	docker buildx build --platform linux/amd64 -f cmd/spider/Dockerfile -t conductor .
	docker tag spider:latest 967991486854.dkr.ecr.eu-west-1.amazonaws.com/conductor:latest
	docker push 967991486854.dkr.ecr.eu-west-1.amazonaws.com/conductor:latest

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
