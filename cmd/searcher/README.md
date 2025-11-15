# Searcher - Full-Text Search Service

The Searcher service provides full-text search capabilities over crawled pages with PageRank-based ranking.

## Role

To search for specific patterns and keywords in the indexed pages, combining text relevance with PageRank scores for optimal results.

## Architecture

### Search Flow

1. **Accept Query**: Receive search request via gRPC (query string + limit)
2. **Tokenization**: Break query into normalized tokens
3. **Full-Text Search**: Query PostgreSQL full-text index on `SeenPages.search_vector`
4. **PageRank Integration**: Join with `PageRankResults` for authority scores
5. **Ranking**: Combine text relevance (30%) + PageRank (70%)
6. **Return Results**: Sorted list of pages with scores

### Example

**Input**: `"Go programming language"`

**Tokens**: `["go", "programming", "language"]`

**Query**:
```sql
SELECT
    sp.url,
    sp.title,
    sp.body,
    pr.rank_score,
    ts_rank(sp.search_vector, to_tsquery('english', 'go & programming & language')) AS text_relevance,
    (ts_rank(sp.search_vector, query) * 0.3 + COALESCE(pr.rank_score, 0) * 0.7) AS combined_score
FROM SeenPages sp
LEFT JOIN PageRankResults pr ON sp.url = pr.url AND pr.is_latest = TRUE
WHERE sp.search_vector @@ to_tsquery('english', 'go & programming & language')
ORDER BY combined_score DESC
LIMIT 10;
```

**Output**: Top 10 ranked pages

## Implementation Plan

### 1. Database Setup

**Add Full-Text Search to SeenPages**:
```sql
ALTER TABLE SeenPages ADD COLUMN search_vector tsvector;

CREATE INDEX idx_fts ON SeenPages USING GIN(search_vector);

-- Populate search vectors
UPDATE SeenPages
SET search_vector = to_tsvector('english', coalesce(title, '') || ' ' || coalesce(body, ''));

-- Auto-update trigger
CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
ON SeenPages FOR EACH ROW EXECUTE FUNCTION
tsvector_update_trigger(search_vector, 'pg_catalog.english', title, body);
```

### 2. Proto Definition

Located in `protos/service/searcher.proto`:

```protobuf
service Searcher {
  rpc SearchPages(SearchRequest) returns (SearchResponse);
  rpc GetHealth(HealthRequest) returns (HealthResponse);
}

message SearchRequest {
  string query = 1;
  int32 limit = 2;
  int32 offset = 3;
}

message SearchResponse {
  repeated SearchResult results = 1;
  int32 total_count = 2;
  repeated Error errors = 3;
}

message SearchResult {
  Page page = 1;
  float text_relevance = 2;
  float rank_score = 3;
  float combined_score = 4;
}
```

### 3. Components

```
cmd/searcher/
├── main.go              # gRPC server setup
├── handler/
│   ├── handler.go       # Search business logic
│   └── rpc.go          # gRPC service implementation
└── pkg/
    ├── tokenizer/
    │   └── tokenizer.go # Query tokenization & normalization
    └── ranker/
        └── ranker.go    # Scoring algorithms
```

### 4. Ranking Formula

**Combined Score**:
```
score = (text_relevance × 0.3) + (pagerank_score × 0.7)
```

**Weights**:
- **Text Relevance (30%)**: How well page content matches query
- **PageRank (70%)**: Page authority/importance from Cartographer

### 5. Search Features

#### Planned Features
- ✅ Basic keyword search
- ✅ Full-text search with stemming
- ✅ PageRank integration
- ⏳ Phrase search ("exact match")
- ⏳ Boolean operators (AND, OR, NOT)
- ⏳ Fuzzy matching
- ⏳ Query autocomplete
- ⏳ Search suggestions

## Deployment

### Kubernetes Deployment

Unlike Cartographer (CronJob), Searcher runs as a long-lived service:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: searcher-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: searcher
  template:
    spec:
      containers:
        - name: searcher
          image: ${SEARCHER_IMAGE}
          ports:
            - containerPort: 50053
```

### Configuration

Environment variables:
- `DB_USER`: PostgreSQL username
- `DB_PASSWORD`: PostgreSQL password
- `DB_HOST`: PostgreSQL host
- `DB_NAME`: Database name
- `GRPC_PORT`: gRPC port (default: 50053)

## Integration with Cartographer

The Searcher depends on Cartographer's PageRank computations:

1. Cartographer runs periodically (every 6 hours)
2. Updates `PageRankResults` table with `is_latest = TRUE`
3. Searcher queries join with latest PageRank scores
4. Results are boosted by page authority

## Performance Considerations

- **Caching**: Add Redis for popular queries (10-minute TTL)
- **Connection Pooling**: Reuse database connections
- **Pagination**: Use `LIMIT`/`OFFSET` for large result sets
- **Index Maintenance**: Ensure GIN index is up-to-date
- **Query Limits**: Max 100 results per query

## Example Usage

### gRPC Client

```go
conn, _ := grpc.Dial("localhost:50053", grpc.WithInsecure())
client := searcher.NewSearcherClient(conn)

resp, _ := client.SearchPages(context.Background(), &searcher.SearchRequest{
    Query: "golang web framework",
    Limit: 10,
})

for _, result := range resp.Results {
    fmt.Printf("%s (score: %.3f)\n", result.Page.Title, result.CombinedScore)
}
```

## Monitoring

Metrics to track:
- Query latency (p50, p95, p99)
- Queries per second
- Cache hit rate
- Database query time
- Result count distribution

