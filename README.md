# Go Webcrawler

[![Go](https://github.com/Acollie/Go-Webcrawler/actions/workflows/go.yml/badge.svg)](https://github.com/Acollie/Go-Webcrawler/actions/workflows/go.yml)
## Description

## Testing

### Unit Tests

```bash go test ./...```

### Integration Tests

1. ```docker-compose up -d```
2. ``` aws --endpoint-url=http://localhost:4570 sqs create-queue --queue-name test-queue``` use the results from this to
   add to the `.env`
3. ```bash go test ./... -tags=integration```