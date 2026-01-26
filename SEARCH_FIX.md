# Search Service Fix

## Issue

The search is returning "Service unavailable" because the Searcher service has an incorrect SQL query that references `pr.url` which doesn't exist in the PageRankResults table.

## Root Cause

The PageRankResults table uses `page_id` (foreign key to SeenPages.id), not `url`. The old query was trying to join on `pr.url = sp.url` which is invalid.

## Correct Query

The query in `cmd/searcher/handler/server.go` should be:

```go
query := `
    SELECT
        sp.url,
        sp.title,
        sp.body,
        sp.description,
        COALESCE(pr.score, 0.0) as pagerank_score,
        ts_rank(sp.search_vector, to_tsquery('english', $1)) as text_relevance,
        (ts_rank(sp.search_vector, to_tsquery('english', $1)) * 0.3 +
         COALESCE(pr.score, 0.0) * 0.7) as combined_score,
        sp.crawl_time
    FROM seenpages sp
    LEFT JOIN pagerankresults pr ON sp.id = pr.page_id AND pr.is_latest = true
    WHERE sp.search_vector @@ to_tsquery('english', $1)
      AND sp.is_indexable = true
    ORDER BY combined_score DESC
    LIMIT $2 OFFSET $3
`
```

## Quick Fix

Run this command to rebuild everything cleanly:

```bash
# Clean all Go build caches
go clean -cache -modcache -testcache -fuzzcache

# Remove all built binaries
find . -type f \( -name "searcher" -o -name "spider" -o -name "conductor" -o -name "cartographer" -o -name "frontend" \) ! -path "./.git/*" -exec rm {} \;

# Rebuild Docker image
docker build --no-cache --pull -f cmd/searcher/Dockerfile -t searcher:latest .

# Restart searcher
docker-compose stop searcher
docker-compose rm -f searcher
docker-compose up -d searcher

# Wait 10 seconds
sleep 10

# Test search
curl "http://localhost:3000/search?q=golang"
```

## Verification

After the fix, you should see search results when you visit:
http://localhost:3000/search?q=golang

The test data includes:
- The Go Programming Language (golang.org)
- Documentation - The Go Programming Language (go.dev/doc/)
- Go Packages (pkg.go.dev/)
- The Go Programming Language - GitHub
- A Tour of Go

## If Still Not Working

If the issue persists after the above steps, there may be Docker layer caching issues. Try:

```bash
# Stop all containers
docker-compose down

# Remove searcher image completely
docker rmi searcher:latest

# Rebuild from scratch
docker build --no-cache --pull -f cmd/searcher/Dockerfile -t searcher:latest .

# Start fresh
docker-compose up -d

# Wait for services to be healthy
docker-compose ps

# Test again
curl "http://localhost:3000/search?q=golang"
```

## Alternative: Direct Database Query Test

You can test if the data exists:

```bash
docker-compose exec postgres psql -U postgres -d databaseName -c "
SELECT sp.url, sp.title, pr.score
FROM seenpages sp
LEFT JOIN pagerankresults pr ON sp.id = pr.page_id AND pr.is_latest = true
LIMIT 5;
"
```

This should return the test data we inserted.
