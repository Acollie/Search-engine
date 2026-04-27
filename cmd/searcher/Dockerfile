FROM golang:1.24.0-alpine AS builder

# Set working directory
WORKDIR /app

# Copy go.mod and go.sum
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the entire project
COPY . .

# Build the application with all optimizations disabled to ensure fresh build
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -o searcher ./cmd/searcher

# Runtime stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates curl
WORKDIR /app
COPY --from=builder /app/searcher .


# Expose ports
EXPOSE 9091 9091
# Used for health check
EXPOSE 8080 8080
# Used for metrics
EXPOSE 80 80

# Run the application
CMD ["/app/searcher"]