# UI build stage
FROM node:22-alpine AS ui-builder
WORKDIR /app/ui
COPY cmd/frontend/ui/package.json cmd/frontend/ui/package-lock.json ./
RUN npm ci --ignore-scripts
COPY cmd/frontend/ui/ ./
RUN npm run build

# Go build stage
FROM golang:1.24.0-alpine AS builder
RUN apk add --no-cache git
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o frontend ./cmd/frontend

# Runtime stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates curl
WORKDIR /root/
COPY --from=builder /app/frontend .
COPY --from=ui-builder /app/ui/dist ./cmd/frontend/ui/dist
EXPOSE 3000 8080
CMD ["./frontend"]
