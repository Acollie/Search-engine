# Conductor Service Testing

This document describes the testing strategy and implementation for the Conductor service.

## Overview

The Conductor service has comprehensive unit tests covering all major components with mocking for external dependencies (gRPC, AWS, PostgreSQL).

## Test Files

### Handler Tests
**Location**: `cmd/conductor/handler/flow_test.go`

Tests the main conductor handler logic including:
- Page processing and conversion
- gRPC stream handling
- Deduplication logic
- Link extraction and queue management
- Error handling
- Graceful shutdown

**Coverage**: 18 test cases + 1 benchmark

### Site.Adder Tests
**Location**: `cmd/spider/pkg/site/adder_test.go`

Tests database interaction layer including:
- PostgreSQL insertions
- Duplicate detection
- Link and queue management
- URL validation
- Metadata extraction

**Coverage**: 17 test cases + 1 benchmark

## Testing Strategy

### Mocking Approach

The tests use three types of mocks:

1. **gRPC Client Mocks** (`mockspider.MockSpiderClient`)
   - Auto-generated using mockery
   - Tests Spider service communication
   - Uses testify expecter pattern

2. **SQL Mocks** (`sqlmock`)
   - Tests database interactions without real database
   - Validates query structure and parameters
   - Tests error handling and edge cases

3. **Custom Mocks**
   - `MockSiteAdder`: Implements `SiteI` interface
   - `MockQueueHandler`: Implements `queue.HandlerI` interface
   - `MockSpiderStream`: Implements bidirectional gRPC stream

### Test Coverage

#### Handler Tests (`flow_test.go`)

```
TestNew                          - Handler instantiation
TestProcessPage_Success          - Successful page processing with links
TestProcessPage_DuplicateURL     - Duplicate page handling
TestProcessPage_DatabaseError    - Database failure scenarios
TestProcessPage_QueueError       - Queue operation failures
TestProcessPage_NoLinks          - Pages without outbound links
TestAddLinksToQueue              - Queue message generation
TestAddLinksToQueue_Empty        - Empty link array handling
TestIsDuplicateError             - Error classification logic
TestProcessBatch_Success         - gRPC stream processing
TestProcessBatch_StreamError     - Stream connection failures
TestProcessBatch_SendError       - Request send failures
TestProcessBatch_RecvError       - Response receive failures
TestProcessBatch_ContextCanceled - Context cancellation handling
TestProcessBatch_WithErrors      - Spider-reported errors
TestListen_GracefulShutdown      - Service shutdown behavior
TestProcessPage_MetadataExtraction - Meta tag processing
BenchmarkProcessPage             - Performance baseline
```

#### Site.Adder Tests (`adder_test.go`)

```
TestNewAdder                     - Adder instantiation
TestAdder_Add_Success            - Successful page insertion
TestAdder_Add_Duplicate          - Duplicate URL handling (sql.ErrNoRows)
TestAdder_Add_PostgresUniqueViolation - PostgreSQL constraint violation
TestAdder_Add_InvalidURL         - URL validation
TestAdder_Add_DatabaseError      - Database failure handling
TestAdder_Add_NoLinks            - Pages without links
TestAdder_InsertLinks_Success    - Link relationship insertion
TestAdder_InsertLinks_Empty      - Empty link handling
TestAdder_InsertLinks_Error      - Link insertion failures
TestAdder_InsertIntoQueue_Success - Queue insertion
TestAdder_InsertIntoQueue_SkipInvalidURLs - URL filtering
TestAdder_InsertIntoQueue_Empty  - Empty queue handling
TestAdder_InsertIntoQueue_AllInvalid - All invalid URLs
TestExtractDomain                - Domain extraction logic
TestExtractDescription           - Meta description extraction
TestAdder_Add_MetadataHandling   - Metadata processing
BenchmarkAdder_Add               - Performance baseline
```

## Running Tests

### Run All Conductor Tests

```bash
go test ./cmd/conductor/handler/... -v
```

### Run Specific Test

```bash
go test ./cmd/conductor/handler/... -v -run TestProcessPage_Success
```

### Run With Coverage

```bash
go test ./cmd/conductor/handler/... -cover
go test ./cmd/conductor/handler/... -coverprofile=coverage.out
go tool cover -html=coverage.out
```

### Run Benchmarks

```bash
go test ./cmd/conductor/handler/... -bench=. -benchmem
go test ./cmd/spider/pkg/site/... -bench=. -benchmem
```

### Run All Related Tests

```bash
go test ./cmd/conductor/... ./cmd/spider/pkg/site/... -v
```

## Test Patterns

### gRPC Stream Testing Pattern

```go
mockStream := NewMockSpiderStream()
mockSpider.EXPECT().
    GetSeenList(mock.Anything).
    Return(mockStream, nil)

mockStream.On("Send", mock.Anything).Return(nil)
mockStream.On("Recv").Return(response, nil).Once()
mockStream.On("Recv").Return(nil, io.EOF).Once()
```

### SQL Mock Pattern

```go
db, mock, err := sqlmock.New()
require.NoError(t, err)
defer db.Close()

rows := sqlmock.NewRows([]string{"id"}).AddRow(1)
mock.ExpectQuery(`INSERT INTO SeenPages`).
    WithArgs(...).
    WillReturnRows(rows)

// Execute code
adder.Add(ctx, page)

// Verify
assert.NoError(t, mock.ExpectationsWereMet())
```

### Custom Mock Pattern

```go
mockSite := &MockSiteAdder{}
mockSite.On("Add", ctx, mock.MatchedBy(func(p site.Page) bool {
    return p.URL == "https://example.com"
})).Return(nil)

// Execute code
h.processPage(ctx, protoPage)

// Verify
mockSite.AssertExpectations(t)
```

## Key Test Scenarios

### Deduplication

Tests verify that duplicate URLs:
1. Are detected via PostgreSQL unique constraint
2. Return appropriate error without failing the service
3. Skip queue insertion for duplicate pages
4. Increment the `conductor_duplicates_found_total` metric

### Error Handling

Tests cover:
- Database connection failures
- SQS unavailability
- gRPC stream interruptions
- Context cancellation
- Invalid URLs
- Spider-reported errors

### Link Processing

Tests verify:
- Extraction of links from pages
- Conversion to queue messages
- Batch insertion into SQS
- Skipping of invalid URLs
- Empty link array handling

### Metadata Handling

Tests verify:
- JSON marshaling of meta tags
- Description extraction priority (description > og:description)
- Domain extraction from URLs
- Header storage in JSONB format

## Continuous Integration

### Pre-commit Checks

```bash
# Run tests
go test ./cmd/conductor/... ./cmd/spider/pkg/site/...

# Run with race detector
go test ./cmd/conductor/... -race

# Run linter
make lint
```

### Test Requirements

All PRs must:
1. Pass all existing tests
2. Add tests for new functionality
3. Maintain or improve coverage
4. Pass benchmark performance baselines

## Debugging Tests

### Enable Verbose Logging

```bash
go test ./cmd/conductor/handler/... -v -count=1
```

### Run Single Test with Debug Output

```bash
go test ./cmd/conductor/handler/... -v -run TestProcessPage_Success -count=1
```

### Inspect Mock Calls

```go
// In test:
mockSite.On("Add", mock.Anything, mock.Anything).
    Run(func(args mock.Arguments) {
        page := args.Get(1).(site.Page)
        fmt.Printf("Add called with: %+v\n", page)
    }).
    Return(nil)
```

## Integration Testing

For integration testing with real PostgreSQL:

```go
import "webcrawler/pkg/testContainers"

func TestIntegration(t *testing.T) {
    if testing.Short() {
        t.Skip("Skipping integration test")
    }

    container := testContainers.SetupPostgres(t)
    defer container.Terminate(ctx)

    db := container.GetDB()
    // Test with real database
}
```

Run integration tests:

```bash
go test ./cmd/conductor/... -v -tags=integration
```

Skip integration tests (faster):

```bash
go test ./cmd/conductor/... -v -short
```

## Best Practices

1. **Use Table-Driven Tests**: For testing multiple scenarios
2. **Mock External Dependencies**: Never call real services in unit tests
3. **Test Error Paths**: Cover both success and failure scenarios
4. **Use `testify/assert`**: For clear, readable assertions
5. **Clean Up Resources**: Always defer cleanup (db.Close(), mock.ExpectationsWereMet())
6. **Test Context Cancellation**: Verify graceful shutdown behavior
7. **Benchmark Critical Paths**: Ensure performance doesn't regress

## Troubleshooting

### "No rows in result set" Error

This is expected when testing duplicate detection:

```go
mock.ExpectQuery(`INSERT INTO SeenPages`).
    WillReturnError(sql.ErrNoRows)  // Correct for ON CONFLICT DO NOTHING
```

### Mock Expectations Not Met

Always verify mocks at end of test:

```go
assert.NoError(t, mock.ExpectationsWereMet())
mockSite.AssertExpectations(t)
```

### gRPC Stream Interface Errors

Ensure mock implements correct metadata types:

```go
func (m *MockSpiderStream) Header() (metadata.MD, error)  // Not map[string][]string
func (m *MockSpiderStream) Trailer() metadata.MD          // Not map[string][]string
```

## Future Improvements

- [ ] Add fuzzing tests for URL parsing
- [ ] Add property-based testing for link extraction
- [ ] Measure and enforce minimum code coverage (target: 80%)
- [ ] Add mutation testing to verify test effectiveness
- [ ] Create performance regression tests
- [ ] Add load testing scenarios

## References

- [testify Documentation](https://pkg.go.dev/github.com/stretchr/testify)
- [sqlmock Documentation](https://pkg.go.dev/github.com/DATA-DOG/go-sqlmock)
- [mockery Documentation](https://vektra.github.io/mockery/)
- [Go Testing Best Practices](https://go.dev/doc/tutorial/add-a-test)