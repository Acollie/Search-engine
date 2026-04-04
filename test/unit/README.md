# Unit Tests with Mocks

## Overview

These unit tests validate the search engine pipeline logic using mocks instead of real services. They run fast, don't require Docker, and can be executed in any environment.

## Test Files

### pipeline_mock_test.go - Pipeline Logic with Mocks

Tests the complete pipeline flow using database mocks (sqlmock) and gRPC service mocks (mockery).

**Test Functions**:

1. **TestPipeline_URLToDatabaseFlow**
   - Tests URL insertion into Queue table
   - Validates upsert behavior for duplicate URLs
   - Tests error handling during insertion

2. **TestPipeline_SpiderCrawlToDatabase**
   - Tests Spider storing crawled pages in SeenPages
   - Validates indexability based on HTTP status code
   - Tests handling of different status codes (200, 404, etc.)

3. **TestPipeline_PageRankComputation**
   - Tests PageRank score insertion and versioning
   - Validates `is_latest` flag management
   - Tests score update workflow

4. **TestPipeline_SearchWithPageRank**
   - Tests search query execution with PageRank integration
   - Validates combined scoring (text relevance 30% + PageRank 70%)
   - Tests result ordering and pagination
   - Validates empty result handling

5. **TestPipeline_EndToEndMocked**
   - **Complete pipeline test** using all mocks
   - Validates: Queue → Spider → Links → PageRank → Search
   - Uses both sqlmock and mockery-generated gRPC mocks
   - Demonstrates full integration without infrastructure

**Key Technologies**:
- `sqlmock` - Mock SQL database interactions
- `mockery` - Generated mocks for gRPC clients/servers
- `testify/require` - Assertions and test utilities

### graph_traversal_mock_test.go - Graph Structure with Mocks

Tests link extraction, graph connectivity, and PageRank's respect for link structure.

**Test Functions**:

1. **TestGraphTraversal_LinkExtraction**
   - Tests extracting internal and external links
   - Validates link type classification
   - Tests duplicate link handling (ON CONFLICT DO NOTHING)

2. **TestGraphTraversal_LinkConnectivity**
   - Tests querying outgoing links from a page
   - Validates pages with many, few, or no links
   - Tests link relationship queries

3. **TestGraphTraversal_IncomingLinks**
   - Tests finding pages that link TO a target (backlinks)
   - Validates popular pages (many incoming links)
   - Tests orphan pages (no incoming links)

4. **TestGraphTraversal_PageRankInfluencedByLinks**
   - **Key test**: Validates PageRank respects link topology
   - Verifies correlation: more incoming links → higher PageRank
   - Tests PageRank score distribution across graph

5. **TestGraphTraversal_CycleDetection**
   - Tests detecting cycles in the link graph using recursive CTE
   - Validates realistic web structure (cycles exist)
   - Tests graph reachability analysis

6. **TestGraphTraversal_SearchTraversability**
   - Tests finding a page, discovering its links, and searching for linked pages
   - Validates the "web" nature of the search engine
   - Tests: find page → get links → verify links are searchable

## Running Tests

### Run All Unit Tests

```bash
# From project root
go test ./test/unit/...

# With verbose output
go test -v ./test/unit/...

# With coverage
go test -cover ./test/unit/...

# From test/unit directory
cd test/unit
go test ./...
go test -v ./...
```

### Run Specific Tests

```bash
# Run only pipeline tests
go test -v ./test/unit/ -run TestPipeline

# Run only graph traversal tests
go test -v ./test/unit/ -run TestGraphTraversal

# Run specific test function
go test -v ./test/unit/ -run TestPipeline_EndToEndMocked

# Run tests matching pattern
go test -v ./test/unit/ -run ".*PageRank.*"
```

### Run with Short Mode

Unit tests are fast and don't skip in short mode (unlike E2E tests):

```bash
go test -short ./test/unit/...  # All unit tests still run
```

## Advantages of Mocked Tests

### Speed
- **No Docker required** - Tests run in milliseconds
- **No network calls** - All dependencies mocked
- **Instant feedback** - Great for TDD and rapid development

### Reliability
- **Deterministic** - No flaky network or timing issues
- **Isolated** - Each test is independent
- **Reproducible** - Same results every time

### Portability
- **CI/CD friendly** - Run anywhere Go is installed
- **No infrastructure** - No database, no services
- **Local development** - Run on airplane, no internet needed

### Coverage
- **Edge cases** - Easy to test error conditions
- **Failure scenarios** - Simulate database errors, connection failures
- **Boundary conditions** - Test limits, nulls, empty results

## Comparison: E2E vs Unit Tests

| Aspect | E2E Tests (test/e2e/) | Unit Tests (test/unit/) |
|--------|----------------------|------------------------|
| **Speed** | 3-5 minutes | <1 second |
| **Infrastructure** | Docker, PostgreSQL, all services | None |
| **Scope** | Full system integration | Individual components |
| **Isolation** | Tests interact | Fully isolated |
| **Debugging** | Check logs, inspect containers | Simple stack traces |
| **CI/CD** | Slow, resource-heavy | Fast, lightweight |
| **Confidence** | High (real integration) | Medium (mocked) |
| **When to Use** | Before deployment, integration validation | During development, quick feedback |

**Best Practice**: Use both!
- Run unit tests frequently during development
- Run E2E tests before merging PRs or deploying

## Mock Setup Examples

### Database Mock (sqlmock)

```go
import "github.com/DATA-DOG/go-sqlmock"

func TestExample(t *testing.T) {
    // Create mock database
    db, mock, err := sqlmock.New()
    require.NoError(t, err)
    defer db.Close()

    // Setup expectations
    mock.ExpectExec(`INSERT INTO Queue`).
        WithArgs("https://example.com", "example.com", "pending", 100).
        WillReturnResult(sqlmock.NewResult(1, 1))

    // Execute code under test
    _, err = db.Exec(
        `INSERT INTO Queue (url, domain, status, priority) VALUES ($1, $2, $3, $4)`,
        "https://example.com", "example.com", "pending", 100,
    )
    require.NoError(t, err)

    // Verify expectations met
    require.NoError(t, mock.ExpectationsWereMet())
}
```

### gRPC Mock (mockery)

```go
import searchermock "webcrawler/pkg/mocks/service/searcher"
import searcherpb "webcrawler/pkg/generated/service/searcher"

func TestSearch(t *testing.T) {
    // Create mock client
    mockSearcher := searchermock.NewMockSearcherClient(t)

    // Setup expectations using expecter pattern
    mockSearcher.EXPECT().
        SearchPages(ctx, &searcherpb.SearchRequest{
            Query: "golang",
            Limit: 10,
        }).
        Return(&searcherpb.SearchResponse{
            Pages: []*sitepb.Page{{Url: "https://golang.org"}},
        }, nil).
        Once()

    // Execute search
    resp, err := mockSearcher.SearchPages(ctx, &searcherpb.SearchRequest{
        Query: "golang",
        Limit: 10,
    })

    require.NoError(t, err)
    require.Len(t, resp.Pages, 1)

    // Verify expectations
    mockSearcher.AssertExpectations(t)
}
```

## Test Coverage

Run tests with coverage report:

```bash
# Generate coverage profile
go test ./test/unit/... -coverprofile=coverage.out

# View coverage in terminal
go tool cover -func=coverage.out

# View coverage in browser (HTML report)
go tool cover -html=coverage.out
```

## Adding New Mocked Tests

When adding new unit tests with mocks:

1. **Import mocks**:
   ```go
   import (
       "github.com/DATA-DOG/go-sqlmock"
       searchermock "webcrawler/pkg/mocks/service/searcher"
   )
   ```

2. **Create test structure**:
   ```go
   tests := []struct {
       name          string
       setupMock     func(sqlmock.Sqlmock)
       expectedError bool
   }{
       // Test cases...
   }
   ```

3. **Setup and verify mocks**:
   - Setup expectations in `setupMock()`
   - Execute code under test
   - Verify with `require.NoError(t, mock.ExpectationsWereMet())`

4. **Use table-driven tests** for multiple scenarios

5. **Test both success and failure paths**

## Troubleshooting

### "all expectations were not met"

This means you set up mock expectations that weren't called:

```go
// Check what expectations weren't met
err := mock.ExpectationsWereMet()
if err != nil {
    t.Logf("Unmet expectations: %v", err)
}
```

**Solution**: Ensure all `ExpectQuery`, `ExpectExec` calls match actual queries.

### "call to database method was not expected"

Your code made a database call you didn't mock:

**Solution**: Add the missing `mock.Expect*()` call before executing the test.

### Mock argument mismatch

```
expected sql: INSERT INTO Queue (url, domain, status, priority) VALUES ($1, $2, $3, $4)
actual sql:   INSERT INTO Queue (url, domain, status) VALUES ($1, $2, $3)
```

**Solution**: Ensure `WithArgs()` matches actual query parameters exactly.

### Mock method not found

```
undefined: searchermock.NewMockSearcherClient
```

**Solution**: Regenerate mocks:
```bash
make mock_gen
```

## Best Practices

1. **Keep tests focused** - Test one thing per test function
2. **Use descriptive names** - `TestPipeline_URLToDatabaseFlow` not `TestInsert`
3. **Setup expectations clearly** - Use helper functions for complex mocks
4. **Verify all expectations** - Always call `mock.ExpectationsWereMet()`
5. **Test error paths** - Don't just test happy path
6. **Use table-driven tests** - Multiple scenarios per test function
7. **Mock at boundaries** - Mock external dependencies (DB, gRPC)
8. **Don't over-mock** - Test real logic, mock only I/O
9. **Keep mocks simple** - Complex mock setup indicates complex code
10. **Run frequently** - Unit tests should be fast enough to run on every save

## Integration with CI/CD

### GitHub Actions Example

```yaml
name: Unit Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-go@v4
        with:
          go-version: '1.24'
      - name: Run unit tests
        run: go test -v -cover ./test/unit/...
      - name: Upload coverage
        run: go test -coverprofile=coverage.out ./test/unit/...
```

### Pre-commit Hook

Add to `.git/hooks/pre-commit`:

```bash
#!/bin/bash
echo "Running unit tests..."
go test ./test/unit/...
if [ $? -ne 0 ]; then
    echo "Unit tests failed. Commit aborted."
    exit 1
fi
```

## Future Enhancements

Potential additions to unit tests:

- [ ] Test concurrent crawling scenarios
- [ ] Test rate limiting logic
- [ ] Test robots.txt parsing
- [ ] Test search query tokenization
- [ ] Test PageRank algorithm directly (pure function)
- [ ] Test link canonicalization
- [ ] Test cycle detection in Spider
- [ ] Test backpressure mechanisms
- [ ] Benchmark tests for performance regression
- [ ] Property-based testing with fuzzing

## Related Documentation

- [E2E Tests](../e2e/README.md) - End-to-end integration tests
- [Pipeline Tests](../e2e/PIPELINE_TESTS.md) - Full pipeline E2E tests
- [CLAUDE.md](../../CLAUDE.md) - Project development guide
- [Mockery Docs](https://vektra.github.io/mockery/) - Mock generation tool

## License

Same as main project.
