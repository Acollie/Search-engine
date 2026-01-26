# Search Engine Troubleshooting Guide

## Issue: "Search service unavailable. Please try again later."

### Root Cause

The Searcher service has an SQL query that references a non-existent column `pr.url` in the PageRankResults table. The correct column is `page_id`.

### Database Schema

```sql
-- PageRankResults uses page_id (FK to SeenPages.id), NOT url
PageRankResults:
  - page_id (references SeenPages.id)
  - score
  - result_version
  - is_latest

-- SeenPages has the url column
SeenPages:
  - id (primary key)
  - url
  - title
  - body
  - search_vector (tsvector for full-text search)
```

### The Fix

The query in `cmd/searcher/handler/server.go` needs to join on `page_id`:

**WRONG (current):**
```sql
FROM PageRankResults pr
INNER JOIN SeenPages sp ON pr.url = sp.url  -- pr.url doesn't exist!
```

**CORRECT:**
```sql
FROM seenpages sp
LEFT JOIN pagerankresults pr ON sp.id = pr.page_id
```

---

## Solution 1: Quick Fix (Simplified Query)

Replace the entire `cmd/searcher/handler/server.go` file with this working version:

```go
package handler

import (
	"context"
	"database/sql"
	"fmt"
	"strings"
	"webcrawler/cmd/searcher/tokeniser"
	"webcrawler/pkg/generated/service/searcher"
	"webcrawler/pkg/generated/types/site"
)

type Handler struct {
	searcher.UnimplementedSearcherServer
	db *sql.DB
}

func NewRPCServer(db *sql.DB) *Handler {
	return &Handler{db: db}
}

func (c *Handler) SearchPages(ctx context.Context, request *searcher.SearchRequest) (*searcher.SearchResponse, error) {
	tokens := tokeniser.Tokenise(request.GetQuery())
	if len(tokens) == 0 {
		return &searcher.SearchResponse{}, nil
	}

	limit := request.GetLimit()
	if limit <= 0 {
		limit = 10
	}
	offset := int32(0)
	if request.GetOffset() > 0 {
		offset = request.GetOffset()
	}

	queryVector := strings.Join(tokens, " & ")

	// Simplified query - full-text search only
	query := `
		SELECT sp.url, sp.title, sp.body, sp.description
		FROM seenpages sp
		WHERE sp.search_vector @@ to_tsquery('english', $1)
		  AND sp.is_indexable = true
		ORDER BY ts_rank(sp.search_vector, to_tsquery('english', $1)) DESC
		LIMIT $2 OFFSET $3
	`

	rows, err := c.db.QueryContext(ctx, query, queryVector, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("failed to query pages: %w", err)
	}
	defer rows.Close()

	var pages []*site.Page
	for rows.Next() {
		var url string
		var title, body, description sql.NullString

		if err := rows.Scan(&url, &title, &body, &description); err != nil {
			return nil, fmt.Errorf("failed to scan row: %w", err)
		}

		snippet := description.String
		if snippet == "" && body.Valid {
			snippet = body.String
			if len(snippet) > 200 {
				snippet = snippet[:200] + "..."
			}
		}

		pages = append(pages, &site.Page{
			Url:   url,
			Title: title.String,
			Body:  snippet,
		})
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating rows: %w", err)
	}

	return &searcher.SearchResponse{Pages: pages}, nil
}

func (c *Handler) GetHealth(ctx context.Context, req *searcher.HealthRequest) (*searcher.HealthResponse, error) {
	if err := c.db.PingContext(ctx); err != nil {
		return &searcher.HealthResponse{
			Healthy: false,
			Message: fmt.Sprintf("database unhealthy: %v", err),
		}, nil
	}

	var pagesCount int64
	err := c.db.QueryRowContext(ctx, "SELECT COUNT(*) FROM seenpages").Scan(&pagesCount)
	if err != nil {
		pagesCount = 0
	}

	return &searcher.HealthResponse{
		Healthy:      true,
		Message:      "searcher operational",
		PagesIndexed: pagesCount,
	}, nil
}
```

### Rebuild Steps

```bash
# 1. Replace the file (copy the code above into cmd/searcher/handler/server.go)

# 2. Clean everything
go clean -cache -modcache -testcache
docker-compose down
docker rmi -f searcher:latest

# 3. Rebuild
docker build --no-cache --pull -f cmd/searcher/Dockerfile -t searcher:latest .

# 4. Start fresh
docker-compose up -d

# 5. Wait for services
sleep 15

# 6. Add test data
docker-compose exec postgres psql -U postgres -d databaseName << 'EOF'
INSERT INTO seenpages (url, title, description, body, status_code, is_indexable, domain, content_type, language) VALUES
('https://golang.org', 'The Go Programming Language', 'Go is an open source programming language', 'Go is an open source programming language that makes it easy to build simple, reliable, and efficient software. Download Go Binary distributions available for Linux, macOS, Windows, and more.', 200, true, 'golang.org', 'text/html', 'en'),
('https://go.dev/doc/', 'Documentation - The Go Programming Language', 'Documentation for Go', 'Documentation for the Go programming language including tutorials, guides, and references. Learn Go with official documentation and examples.', 200, true, 'go.dev', 'text/html', 'en'),
('https://pkg.go.dev/', 'Go Packages', 'Discover and explore Go packages', 'Search for Go packages and documentation. Find the right package for your project. Browse popular Go modules and libraries.', 200, true, 'pkg.go.dev', 'text/html', 'en'),
('https://github.com/golang/go', 'The Go Programming Language - GitHub', 'GitHub repository for Go', 'The Go programming language source code repository. Contribute to golang/go development by creating an account on GitHub.', 200, true, 'github.com', 'text/html', 'en'),
('https://tour.golang.org', 'A Tour of Go', 'Learn Go with interactive tutorials', 'A Tour of Go teaches the basics of Go through interactive examples and exercises. Perfect for beginners learning the language.', 200, true, 'tour.golang.org', 'text/html', 'en');
EOF

# 7. Test
curl "http://localhost:3000/search?q=golang"
# Should show results!

# Or visit in browser:
open http://localhost:3000/search?q=golang
```

---

## Solution 2: Full Fix with PageRank (Advanced)

If you want PageRank scoring included, use this version:

```go
// In SearchPages function, replace the query with:
query := `
    SELECT
        sp.url,
        sp.title,
        sp.body,
        sp.description,
        COALESCE(pr.score, 0.0) as pagerank_score,
        ts_rank(sp.search_vector, to_tsquery('english', $1)) as text_relevance,
        (ts_rank(sp.search_vector, to_tsquery('english', $1)) * 0.3 +
         COALESCE(pr.score, 0.0) * 0.7) as combined_score
    FROM seenpages sp
    LEFT JOIN pagerankresults pr ON sp.id = pr.page_id AND pr.is_latest = true
    WHERE sp.search_vector @@ to_tsquery('english', $1)
      AND sp.is_indexable = true
    ORDER BY combined_score DESC
    LIMIT $2 OFFSET $3
`

// Update the Scan() call to include the extra columns:
var pagerankScore, textRelevance, combinedScore float64

err := rows.Scan(&url, &title, &body, &description, &pagerankScore, &textRelevance, &combinedScore)
```

### Add PageRank Test Data

```bash
docker-compose exec postgres psql -U postgres -d databaseName << 'EOF'
INSERT INTO pagerankresults (page_id, score, result_version, is_latest) VALUES
(1, 0.85, 1, true),
(2, 0.72, 1, true),
(3, 0.68, 1, true),
(4, 0.91, 1, true),
(5, 0.55, 1, true);
EOF
```

---

## Verification Commands

### Check Database Has Data

```bash
docker-compose exec postgres psql -U postgres -d databaseName -c "
SELECT COUNT(*) as total_pages FROM seenpages;
"
```

### Test Query Directly

```bash
docker-compose exec postgres psql -U postgres -d databaseName -c "
SELECT sp.url, sp.title
FROM seenpages sp
WHERE sp.search_vector @@ to_tsquery('english', 'golang')
LIMIT 5;
"
```

### Check Searcher Logs

```bash
docker-compose logs searcher | tail -20
```

### Check Frontend Logs

```bash
docker-compose logs frontend | grep ERROR | tail -10
```

### Test gRPC Directly

```bash
# Install grpcurl if needed
brew install grpcurl

# Test Searcher health
grpcurl -plaintext localhost:9002 service.Searcher/GetHealth

# Test search
grpcurl -plaintext -d '{"query": "golang", "limit": 5}' \
  localhost:9002 service.Searcher/SearchPages
```

---

## Common Issues

### Issue 1: "column pr.url does not exist"

**Cause:** Old cached code in Docker image
**Solution:** Use Solution 1 above, ensure complete rebuild

### Issue 2: Empty Results

**Cause:** No test data in database
**Solution:** Run the INSERT commands above

### Issue 3: "Search service unavailable"

**Cause:** Searcher not running or Frontend can't connect
**Check:**
```bash
docker-compose ps
docker-compose logs searcher
docker-compose logs frontend
```

### Issue 4: Docker Build Uses Old Code

**Solution:**
1. Create `.dockerignore` file:
```
*_test.go
*.md
.git
.env
searcher
spider
conductor
cartographer
frontend
```

2. Clean Docker build cache:
```bash
docker builder prune -af
```

---

## Alternative: Run Searcher Locally

If Docker continues to cache old code, run the Searcher locally:

```bash
# Stop Docker searcher
docker-compose stop searcher

# Run locally
cd cmd/searcher
export DB_USER=postgres
export DB_PASSWORD=postgres
export DB_HOST=localhost
export DB_NAME=databaseName
go run main.go
```

Then test: http://localhost:3000/search?q=golang

---

## Success Criteria

✅ `curl "http://localhost:3000/search?q=golang"` returns HTML with search results
✅ Browser shows search results with titles and URLs
✅ No "Search service unavailable" error
✅ Frontend logs show no SQL errors

---

## Need More Help?

1. **Check service status:** `docker-compose ps`
2. **View all logs:** `docker-compose logs`
3. **Restart everything:** `docker-compose restart`
4. **Nuclear option:**
   ```bash
   docker-compose down -v
   docker system prune -af
   # Then rebuild from scratch
   ```

## Files to Check

1. `cmd/searcher/handler/server.go` - Main search logic
2. `cmd/searcher/Dockerfile` - Build configuration
3. `.dockerignore` - Exclude old binaries
4. `docker-compose.yml` - Service configuration

The simplified version (Solution 1) should work immediately. The full PageRank version (Solution 2) is optional for better ranking.
