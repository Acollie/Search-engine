# Cartographer - PageRank Computation Service

The Cartographer service computes PageRank scores for all pages in the search index using a damped PageRank algorithm.

## Overview

The service performs the following steps:

1. **Random Sampling**: Fetches random subsets of pages from the `SeenPages` table
2. **Graph Construction**: Builds a link graph from the sampled pages
3. **PageRank Computation**: Applies the damped PageRank algorithm with iterative convergence
4. **Results Storage**: Saves computed rankings to the `PageRankResults` table with versioning

## Algorithm Details

- **Algorithm**: Damped PageRank with iterative convergence
- **Damping Factor**: 0.85 (standard)
- **Max Iterations**: 20
- **Convergence Threshold**: 0.0001
- **Sweep Size**: 100 sweeps
- **Pages Per Sweep**: 100,000 random pages

### PageRank Formula

```
PR(A) = (1-d)/N + d * Σ(PR(Ti) / C(Ti))

Where:
- d = damping factor (0.85)
- N = total pages in graph
- Ti = pages linking to page A
- C(Ti) = outbound link count from page Ti
```

## Database Schema

Results are stored in the `PageRankResults` table:

| Column | Type | Description |
|--------|------|-------------|
| url | VARCHAR(768) | Page URL (PK) |
| rank_score | FLOAT | Normalized PageRank score |
| incoming_links | INT | Number of inbound links |
| outgoing_links | INT | Number of outbound links |
| sweep_id | VARCHAR(100) | Computation identifier (PK) |
| computed_at | TIMESTAMP | Computation timestamp |
| algorithm_name | VARCHAR(50) | Algorithm version |
| is_latest | BOOLEAN | Latest computation flag |

## Deployment

### Kubernetes CronJob

Deploy as a scheduled job that runs periodically:

```bash
# Apply the CronJob manifest
kubectl apply -f cmd/cartographer/cronjob.yaml

# Check job status
kubectl get cronjobs
kubectl get jobs

# View logs from latest run
kubectl logs -l app=cartographer --tail=100
```

### Configuration

Set via environment variables:

- `DB_USER`: PostgreSQL username
- `DB_PASSWORD`: PostgreSQL password
- `DB_HOST`: PostgreSQL host
- `DB_NAME`: Database name

### Schedule

Default: Every 6 hours (`0 */6 * * *`)

Adjust in `cronjob.yaml`:
- Daily: `0 0 * * *`
- Hourly: `0 */1 * * *`
- Weekly: `0 0 * * 0`

## Local Development

### Run Manually

```bash
# Set environment variables
export DB_USER=postgres
export DB_PASSWORD=yourpassword
export DB_HOST=localhost
export DB_NAME=databaseName

# Run the service
go run cmd/cartographer/main.go
```

### Build Docker Image

```bash
docker build -t cartographer:latest -f cmd/cartographer/Dockerfile .
```

### Run with Docker

```bash
docker run --rm \
  -e DB_USER=postgres \
  -e DB_PASSWORD=yourpassword \
  -e DB_HOST=host.docker.internal \
  -e DB_NAME=databaseName \
  cartographer:latest
```

## Monitoring

The service logs:
- Sweep progress
- Number of pages processed
- Convergence metrics
- Database insertion results

Example output:
```
Connecting to database at localhost as postgres
Starting PageRank computation: 100 sweeps, 100000 pages per sweep
Fetched 100000 random pages for PageRank computation
Successfully pushed 100000 PageRank results for sweep pagerank_20250115_143022
PageRank computation completed successfully
```

## Integration with Searcher

The Searcher service queries `PageRankResults` to boost search results:

```sql
SELECT sp.url, sp.title, pr.rank_score
FROM SeenPages sp
LEFT JOIN PageRankResults pr ON sp.url = pr.url AND pr.is_latest = TRUE
WHERE sp.search_vector @@ query
ORDER BY (text_relevance * 0.3 + COALESCE(pr.rank_score, 0) * 0.7) DESC;
```

## Performance

- **Computation Time**: ~5-10 minutes for 100K pages (depends on link density)
- **Memory Usage**: ~500MB-2GB
- **Database Impact**: Bulk insert with transaction, minimal lock contention