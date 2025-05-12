FROM golang:latest

# Set working directory
WORKDIR /app

# Copy go.mod and go.sum
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the entire project
COPY . .

# Build the application
#RUN go build -o spider cmd/cartographer/main.go
RUN GOOS=linux GOARCH=amd64 go build -o cartographer cmd/cartographer/main.go


# Used for health check
EXPOSE 8080 8080
# Used for metrics
EXPOSE 80 80

# Run the application
CMD ["./cartographer"]