# Full Pipeline & Graph Traversal Tests

## Overview

These tests validate the complete end-to-end functionality of the search engine, focusing on:

1. **Full Pipeline Integration** (`pipeline_test.go`)
2. **Graph Traversal & Connectivity** (`traversal_test.go`)

## Test Files

### pipeline_test.go - Full Pipeline Integration Test

**Purpose**: Validates that a URL flows through the entire system from crawling to searchability.

**Test Flow**:
```
Queue → Spider → SeenPages → Links → PageRank → Searcher → Frontend
```

**Phases**:
1. **Infrastructure Ready** - All services healthy and database initialized
2. **Add URL to Queue** - Insert `https://example.com` with high priority
3. **Spider Crawls URL** - Wait for Spider to fetch and store the page
4. **Verify Page Data** - Check title, body, status_code, search_vector
5. **Verify Links Extracted** - Confirm links table populated
6. **Trigger PageRank** - Compute PageRank scores via HTTP endpoint
7. **Verify PageRank Score** - Ensure page receives a score
8. **Search via gRPC** - Query Searcher and find the page in results
9. **Verify Frontend** - Confirm page appears in web interface

**Why This Test Matters**:
- Proves the entire pipeline works end-to-end
- Validates data flows correctly between services
- Tests the most critical user journey: crawl → search
- Ensures new pages become searchable

**Run**:
```bash
# Run only the pipeline test
go test -v -timeout 10m ./test/e2e/ -run TestE2E_FullPipeline

# Or use the Makefile
cd test/e2e
make test-subtest TEST=FullPipeline
```

**Expected Output**:
```
✓ Added https://example.com to Queue with high priority
✓ Spider crawled https://example.com (page_id: 123)
✓ Page data stored: title='Example Domain', status=200, indexable=true
✓ Search vector generated: 'domain':1 'exampl':2...
✓ Found 5 links extracted from the page
✓ PageRank computation triggered
✓ PageRank score computed: 0.150000
✓ Found https://example.com in search results at position 2
✓ Verified https://example.com appears in Frontend HTML
✓ All pipeline phases completed successfully!
```

---

### traversal_test.go - Graph Traversal & Connectivity Test

**Purpose**: Validates the web graph structure and link-based ranking.

**Test Components**:

#### 1. Graph Connectivity
- Verifies pages link to each other (fixtures create a graph)
- Checks specific link relationships
- Validates cycles exist (realistic web structure)
- Uses recursive CTE to detect reachability

**Graph Structure** (from `03-seed-traversal.sql`):
```
golang.org ──┬──> python.org ──┬──> rust-lang.org ──> cplusplus.com
             │                  │                              │
             │                  └──> javascript.info           │
             │                             │                   │
             └──> javascript.info          └──> docs.oracle.com/javase
                         │                              ↓
                         └──────────────────────────────┘
                                                         │
                                                         └──> golang.org (cycle)
```

#### 2. PageRank Link Structure
- Computes PageRank on the graph
- Analyzes score distribution
- Verifies pages with more incoming links tend to have higher scores
- Shows correlation between link popularity and ranking

**Key Insight**: PageRank = "importance via backlinks"

#### 3. Search Traversal
- Searches for "programming" and finds multiple results
- Searches for specific languages (Go, Python, Rust)
- Retrieves linked pages from database
- Verifies linked pages are searchable
- Tests "following the graph" from one page to related pages

**Why This Test Matters**:
- Validates the graph nature of the web
- Ensures PageRank respects link structure
- Tests traversability (can you go from A → B → C?)
- Proves the search engine understands relationships

**Run**:
```bash
# Run only the traversal test
go test -v -timeout 10m ./test/e2e/ -run TestE2E_GraphTraversal

# Or use the Makefile
cd test/e2e
make test-subtest TEST=GraphTraversal
```

**Expected Output**:
```
✓ Found 6 pages in database
✓ Found 12 internal links
✓ Verified link: https://golang.org -> https://python.org
✓ Verified link: https://golang.org -> https://rust-lang.org
✓ Verified link: https://python.org -> https://rust-lang.org
✓ Graph contains cycles: true (realistic web structure)

PageRank Distribution:
  https://rust-lang.org: 0.185423
  https://docs.oracle.com/javase: 0.168234
  https://javascript.info: 0.152341
  https://python.org: 0.143256
  https://golang.org: 0.135782
  https://cplusplus.com: 0.098123

✓ Most linked (rust-lang.org): 3 links, score=0.185423
✓ Least linked (golang.org): 0 links, score=0.135782
✓ Found 4 results for 'programming'
✓ Found golang.org in 'Go' search results
✓ golang.org links to 3 pages:
  -> https://python.org
  -> https://rust-lang.org
  -> https://javascript.info
✓ Successfully traversed to linked page: https://python.org
```

---

## Fixtures

### 01-seed-queue.sql
- Initial URLs for Spider to crawl
- Minimal set for basic testing

### 02-seed-pages.sql
- Pre-crawled pages (golang.org, python.org, rust-lang.org)
- Basic links for PageRank graph
- Used by original e2e_test.go

### 03-seed-traversal.sql (NEW)
- Extended graph with 6+ pages
- More complex link relationships
- Includes cycles (realistic web structure)
- External links for completeness
- Used by traversal_test.go

---

## Running All Tests

```bash
# From project root
make test-e2e                    # All E2E tests (including pipeline & traversal)

# From test/e2e directory
make test                        # All tests with cleanup
make test-verbose                # Verbose output

# Run specific tests
go test -v -timeout 15m ./test/e2e/ -run TestE2E_FullPipeline
go test -v -timeout 15m ./test/e2e/ -run TestE2E_GraphTraversal
go test -v -timeout 15m ./test/e2e/ -run TestE2E_SearchEngine
```

---

## Test Comparison

| Test | Focus | Duration | Key Validation |
|------|-------|----------|----------------|
| `e2e_test.go` | Service integration | 3-5 min | Each service works correctly |
| `pipeline_test.go` | End-to-end flow | 2-4 min | Single URL through full pipeline |
| `traversal_test.go` | Graph structure | 3-5 min | Link relationships & traversability |

**Recommended Order**:
1. Run `e2e_test.go` first to validate basic infrastructure
2. Run `pipeline_test.go` to validate the complete flow
3. Run `traversal_test.go` to validate graph properties

---

## Debugging Failed Tests

### Pipeline Test Failures

**"Spider did not crawl the URL in time"**
- Check Spider logs: `docker logs e2e-spider`
- Verify Spider can reach the URL
- Check Queue table: `SELECT * FROM Queue WHERE url='https://example.com'`

**"Search vector should be generated"**
- Check database trigger: `\d+ SeenPages`
- Verify PostgreSQL full-text search: `SELECT search_vector FROM SeenPages WHERE url='https://example.com'`

**"PageRank score not computed in time"**
- Check Cartographer logs: `docker logs e2e-cartographer`
- Verify HTTP trigger endpoint: `curl -X POST http://localhost:8003/compute`
- Check if Links table has data: `SELECT COUNT(*) FROM Links`

**"The crawled URL should appear in search results"**
- Check Searcher logs: `docker logs e2e-searcher`
- Test gRPC directly: `grpcurl -plaintext -d '{"query":"example","limit":10}' localhost:9002 service.Searcher/SearchPages`
- Verify data in database: `SELECT * FROM SeenPages WHERE url='https://example.com'`

### Traversal Test Failures

**"Should have internal links"**
- Check if fixtures loaded: `SELECT COUNT(*) FROM Links`
- View fixture execution logs: `docker logs e2e-postgres | grep seed`
- Manually verify: `SELECT s.url as source, t.url as target FROM Links l JOIN SeenPages s ON l.source_page_id=s.id JOIN SeenPages t ON l.target_page_id=t.id LIMIT 10`

**"PageRank computation did not complete"**
- Check for Pages with scores: `SELECT COUNT(*) FROM PageRankResults WHERE is_latest=true`
- Verify computation was triggered: `curl http://localhost:8003/health`
- Check logs: `docker logs e2e-cartographer --tail 100`

**"golang.org should appear in 'Go' search results"**
- Verify page exists: `SELECT * FROM SeenPages WHERE url='https://golang.org'`
- Check search vector: `SELECT search_vector FROM SeenPages WHERE url='https://golang.org'`
- Test search: `SELECT url, title FROM SeenPages WHERE search_vector @@ to_tsquery('Go') LIMIT 5`

---

## Performance Notes

**Typical Execution Times**:
- Infrastructure startup: 20-30s
- Spider crawl (1 URL): 5-15s
- PageRank computation: 30-60s
- Search query: <100ms
- Total pipeline test: 2-4 minutes
- Total traversal test: 3-5 minutes

**Optimization Tips**:
- Use `testing.Short()` to skip in unit test runs
- Increase timeouts for slower systems (CI/CD)
- Run tests in parallel when possible
- Cache Docker images to speed up builds

---

## Contributing

When adding new pipeline or traversal tests:

1. **Keep fixtures realistic** - Use real-world-like URLs and content
2. **Document the flow** - Clearly explain what the test validates
3. **Add meaningful assertions** - Test behavior, not implementation
4. **Handle timeouts gracefully** - Use pollUntil with reasonable limits
5. **Clean up properly** - Use defer for docker-compose cleanup
6. **Log progress** - Use t.Log() to show what's happening
7. **Collect logs on failure** - Call collectServiceLogs() in defer

---

## Future Enhancements

Potential additions to these tests:

- [ ] Test crawling depth (follow links 2-3 levels deep)
- [ ] Validate robots.txt compliance during crawl
- [ ] Test rate limiting (multiple requests to same domain)
- [ ] Validate cycle detection in Spider
- [ ] Test PageRank score stability over multiple computations
- [ ] Add performance benchmarks (throughput, latency)
- [ ] Test concurrent crawling (multiple Spiders)
- [ ] Validate search result ranking quality
- [ ] Test pagination in Frontend
- [ ] Add chaos testing (kill services mid-flow)

---

## License

Same as main project.
