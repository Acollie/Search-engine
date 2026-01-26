# Build stage
FROM golang:1.24.0-alpine AS builder

# Install build dependencies
RUN apk add --no-cache git

WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the frontend binary
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o frontend ./cmd/frontend

# Runtime stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy the binary from builder
COPY --from=builder /app/frontend .

# Copy templates and static files
COPY --from=builder /app/cmd/frontend/templates ./cmd/frontend/templates
COPY --from=builder /app/cmd/frontend/static ./cmd/frontend/static

# Expose ports
EXPOSE 3000 8080

# Run the frontend service
CMD ["./frontend"]
