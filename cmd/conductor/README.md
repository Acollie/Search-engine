# Conductor Service

## Role

The Conductor service is the central orchestrator of the distributed web search engine. It acts as a bridge between the Spider service and the PostgreSQL database, managing the flow of crawled web pages and coordinating the crawl queue.

**Primary responsibilities:**
- Receives crawled pages from Spider via gRPC streaming
- Deduplicates pages against the central PostgreSQL database
- Stores new pages in the `SeenPages` table with full-text search vectors
- Extracts and stores link relationships in the `Links` table
- Manages the crawl queue by adding discovered URLs to both PostgreSQL `Queue` table and SQS
- Emits Prometheus metrics for monitoring and observability

## Architecture

```
┌─────────────┐  gRPC Stream  ┌──────────────┐
│   Spider    │──────────────>│  Conductor   │
└─────────────┘               └──────┬───────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ▼                ▼                ▼
            ┌─────────────┐  ┌──────────┐   ┌──────────┐
            │ PostgreSQL  │  │   SQS    │   │Prometheus│
            │  - SeenPages│  │  Queue   │   │ Metrics  │
            │  - Links    │  └──────────┘   └──────────┘
            │  - Queue    │
            └─────────────┘
```

## Configuration

The service uses environment variables for configuration:

### Database Configuration
- `DB_USER` - PostgreSQL username (default: "postgres")
- `DB_PASSWORD` - PostgreSQL password (default: "example")
- `DB_HOST` - PostgreSQL host (default: "localhost")
- `DB_PORT` - PostgreSQL port (default: 5432)
- `DB_NAME` - Database name (default: "main")

### Service Configuration
- `SPIDER_HOST` - Spider service hostname (default: "0.0.0.0")
- `QUEUE_URL` - AWS SQS queue URL (required)
- `AWS_REGION` - AWS region (default: "eu-west-1")

### Example Configuration

```bash
export DB_USER=postgres
export DB_PASSWORD=yourpassword
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=main
export SPIDER_HOST=spider-service
export QUEUE_URL=https://sqs.eu-west-1.amazonaws.com/123456789/crawl-queue
export AWS_REGION=eu-west-1
```

## Running Locally

### Prerequisites
- Go 1.23.0 or higher
- PostgreSQL instance with schema initialized (see `pkg/db/init/01-init-schema.sql`)
- AWS credentials configured for SQS access
- Spider service running and accessible

### Run the Service

```bash
# Set environment variables
export DB_USER=postgres
export DB_PASSWORD=yourpassword
export DB_HOST=localhost
export QUEUE_URL=your-sqs-queue-url

# Run the service
go run cmd/conductor/main.go
```

## Building

### Local Build

```bash
# Build for current platform
go build -o conductor cmd/conductor/main.go

# Build for Linux (for Docker/deployment)
GOOS=linux GOARCH=amd64 go build -o conductor cmd/conductor/main.go
```

### Docker Build

```bash
# Build Docker image
make buildConductor

# Or manually
docker build -f cmd/conductor/Dockerfile -t conductor:latest .
```

### Build and Push to ECR

```bash
make build-and-push-conductor
```

## Implementation Details

### Page Processing Flow

1. **Stream Connection**: Establishes bidirectional gRPC stream with Spider service
2. **Batch Request**: Requests batches of 100 pages at a time
3. **Deduplication**: Checks each page URL against PostgreSQL unique constraint
4. **Storage**: Inserts new pages into `SeenPages` with:
   - Full-text search vector (auto-generated from title, description, body)
   - Domain extraction
   - Metadata (headers, meta tags)
   - Timestamp information
5. **Link Extraction**: Stores outbound links in `Links` table for PageRank computation
6. **Queue Management**: Adds new URLs to both PostgreSQL `Queue` and SQS for future crawling

### Database Schema

The conductor interacts with three main tables:

**SeenPages**: Stores crawled web pages
```sql
CREATE TABLE SeenPages (
  id SERIAL PRIMARY KEY,
  url TEXT UNIQUE NOT NULL,
  title TEXT,
  description TEXT,
  body TEXT,
  headers JSONB,
  crawl_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  domain TEXT,
  search_vector tsvector GENERATED ALWAYS AS (...)
);
```

**Links**: Graph structure for PageRank
```sql
CREATE TABLE Links (
  id SERIAL PRIMARY KEY,
  source_page_id INTEGER NOT NULL REFERENCES SeenPages(id),
  target_url TEXT,
  anchor_text TEXT
);
```

**Queue**: URLs pending crawl
```sql
CREATE TABLE Queue (
  id SERIAL PRIMARY KEY,
  url TEXT UNIQUE NOT NULL,
  domain TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  priority INTEGER DEFAULT 0
);
```

### Error Handling

- **Duplicate URLs**: Detected via PostgreSQL unique constraint, logged and skipped
- **Spider Unavailable**: Retries connection every 10 seconds
- **Database Errors**: Logged with metrics, processing continues for other pages
- **Queue Errors**: Logged but doesn't block page storage

### Graceful Shutdown

The service handles `SIGTERM` and `SIGINT` signals:
1. Cancels context to stop listener loop
2. Waits for in-flight processing to complete
3. Closes gRPC connection and database
4. Exits cleanly

## Metrics

The conductor exposes Prometheus metrics on port 8080:

### Counters
- `conductor_pages_received_total{source}` - Total pages received from Spider
- `conductor_duplicates_found_total` - Total duplicate pages detected
- `conductor_new_pages_stored_total` - Total new pages stored
- `conductor_database_errors_total{operation}` - Database operation failures
- `conductor_backpressure_triggered_total` - Backpressure events

### Histograms
- `conductor_processing_duration_seconds{operation}` - Processing time per operation
  - `operation=dedup` - Deduplication check time
  - `operation=queue` - Queue operation time
  - `operation=total` - Total processing time per page

### Gauges
- `conductor_queue_depth` - Approximate queue depth

### Example Queries

```promql
# Pages processed per second
rate(conductor_new_pages_stored_total[5m])

# Duplicate rate
rate(conductor_duplicates_found_total[5m]) / rate(conductor_pages_received_total[5m])

# Average processing time
rate(conductor_processing_duration_seconds_sum{operation="total"}[5m]) /
rate(conductor_processing_duration_seconds_count{operation="total"}[5m])
```

## Health Checks

Health check endpoint available at: `http://localhost:8080/health`

The service also exposes OpenTelemetry traces for distributed tracing.

## Development

### Project Structure

```
cmd/conductor/
├── main.go              # Entry point, config, bootstrap
├── handler/
│   ├── handler.go       # Handler struct and dependencies
│   └── flow.go          # Main processing logic
├── metrics/
│   └── conductor.go     # Prometheus metric definitions
├── Dockerfile           # Container image definition
└── README.md           # This file
```

### Adding New Metrics

Add metrics to `metrics/conductor.go`:

```go
var MyMetric = promauto.NewCounter(
    prometheus.CounterOpts{
        Name: "conductor_my_metric_total",
        Help: "Description of my metric",
    },
)
```

Use in handler:

```go
import "webcrawler/cmd/conductor/metrics"

metrics.MyMetric.Inc()
```

## Troubleshooting

### "Spider service unavailable"
- Verify Spider service is running
- Check `SPIDER_HOST` environment variable
- Verify network connectivity and firewall rules

### "Failed to connect to PostgreSQL"
- Verify PostgreSQL is running
- Check database credentials in environment variables
- Ensure schema is initialized (`01-init-schema.sql`)

### "Duplicate key value violates unique constraint"
- This is expected behavior for already-seen URLs
- Monitor `conductor_duplicates_found_total` metric

### High memory usage
- Reduce batch size in `processBatch()` (currently 100)
- Add memory limits in Kubernetes/Docker deployment

## Related Services

- **Spider**: Crawls web pages, sends results to Conductor
- **Cartographer**: Reads `Links` table to compute PageRank scores
- **Searcher**: Queries `SeenPages` table with full-text search