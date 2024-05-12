# Go Webcrawler

[![Go](https://github.com/Acollie/Go-Webcrawler/actions/workflows/go.yml/badge.svg)](https://github.com/Acollie/Go-Webcrawler/actions/workflows/go.yml)

## Overview

![Overview of architecture](/assets/overview.png "Overview")

### SQS Queue

The SQS queue is used to store the URLs that need to be crawled.

### DynamoDB

DynamoDB is used to store the URLs that have been crawled and the URLs that have been found on the page.

### Neptune / Neo4k

Neptune is used to store the relationships between the URLs that have been found on the page.

### Tests

The tests are written in Go and can be run using the following command:
```bash go test ./...```

