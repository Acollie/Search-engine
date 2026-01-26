# Database Initialization and Management Scripts

This directory contains SQL scripts for database schema creation, initialization, and maintenance.

## Overview

The scripts are organized to be applied in sequence:

1. **01-init-schema.sql** - Creates the core database schema
2. **02-seed-data.sql** - Populates tables with development data
3. **03-migrations.sql** - Applies additional schema changes and enhancements
4. **maintenance.sql** - Contains utilities for monitoring and maintenance

## Schema Overview

### Core Tables

#### SeenPages
Stores crawled web pages with full-text search capabilities.

```sql
- id (PRIMARY KEY)
- url (UNIQUE)
- title, description, body
- status_code, crawl_time
- search_vector (tsvector for full-text search)
- PageRank integration fields
```

**Indexes:**
- url, crawl_time, domain, search_vector, status_code

#### Queue
Tracks URLs to be crawled with priority and retry logic.

```sql
- id (PRIMARY KEY)
- url (UNIQUE)
- domain, status, priority
- retries, created_at
- error_message, last_attempt
```

**Indexes:**
- status, priority, domain, pending items

#### Links
Represents the link graph structure for PageRank computation.

```sql
- id (PRIMARY KEY)
- source_page_id, target_page_id
- anchor_text, link_type
```

**Indexes:**
- source_page_id, target_page_id, target_url

#### PageRankResults
Stores versioned PageRank scores.

```sql
- id (PRIMARY KEY)
- page_id, score
- result_version, is_latest
```

**Indexes:**
- page_id, version, latest, score DESC

#### SearchSessions
Tracks search queries for analytics (optional).

```sql
- id (PRIMARY KEY)
- query, result_count
- execution_time_ms, user_id, session_id
```

**Indexes:**
- created_at, query, user_id

### Extended Tables (from migrations)

- **ServiceHealth** - Health status tracking for services
- **SearchIndex** - Optimized keyword indexing
- **CrawlStatistics** - Daily crawl performance metrics
- **DomainReputation** - Domain-level reputation scoring
- **ErrorLog** - Service error logging
- **PageRankHistory** - PageRank score history

## Usage

### Docker Compose (Local Development)

The init scripts are automatically applied during database initialization:

```bash
# Start the database with initialization
docker-compose up postgres

# The scripts in deployments/postgres.yaml mount
# the init scripts directory automatically
```

### Kubernetes Deployment

Scripts are embedded in `deployments/postgres.yaml` ConfigMap:

```bash
# Apply the postgres manifest
kubectl apply -f deployments/postgres.yaml

# The StatefulSet mounts the init scripts in /docker-entrypoint-initdb.d
# PostgreSQL automatically runs them on first startup
```

### Manual Application

To apply scripts manually:

```bash
# Connect to PostgreSQL
psql -h localhost -U postgres -d databaseName

# Apply schema
\i scripts/01-init-schema.sql

# Seed data
\i scripts/02-seed-data.sql

# Apply migrations
\i scripts/03-migrations.sql
```

Or directly:

```bash
# Using psql directly
psql -h localhost -U postgres -d databaseName < scripts/01-init-schema.sql
psql -h localhost -U postgres -d databaseName < scripts/02-seed-data.sql
psql -h localhost -U postgres -d databaseName < scripts/03-migrations.sql
```

## Script Details

### 01-init-schema.sql

**Purpose:** Creates the core database schema

**Contains:**
- Extension installation (pg_trgm, btree_gin, uuid-ossp)
- Table creation with proper constraints
- Index creation for query optimization
- Permission grants
- Documentation comments

**Key Features:**
- Full-text search support via tsvector
- Comprehensive constraints and validations
- Performance-optimized indexes
- Automatic generated columns

**Applied Once:**
```bash
psql -U postgres -d databaseName < scripts/01-init-schema.sql
```

### 02-seed-data.sql

**Purpose:** Populates database with development data

**Inserts:**
- 13 sample web pages across multiple domains
- 8 queue items for crawling
- 14 links establishing graph structure
- Initial PageRank scores (version 1)
- 10 sample search sessions

**Use Cases:**
- Local development and testing
- Integration test setup
- Demo purposes

**Reset and Re-seed:**
```bash
# Drop and recreate schema with fresh seed data
psql -U postgres -d databaseName < scripts/01-init-schema.sql
psql -U postgres -d databaseName < scripts/02-seed-data.sql
```

### 03-migrations.sql

**Purpose:** Applies incremental schema enhancements

**Applied Migrations:**
1. Service health tracking
2. URL classification (spam, duplicates)
3. Crawl metadata (redirect, canonical URLs)
4. Queue improvements (backoff, scheduling)
5. Search optimization tables
6. Crawl statistics tracking
7. Domain reputation scoring
8. Error logging
9. PageRank history tracking

**Idempotent Operations:**
All migrations use `IF NOT EXISTS` and `IF NOT` conditions for safe repeated application.

**Add New Migration:**
```sql
-- Add new migration with idempotent operations
ALTER TABLE SeenPages
ADD COLUMN IF NOT EXISTS new_field VARCHAR(255);

CREATE INDEX IF NOT EXISTS idx_new_field ON SeenPages(new_field);

-- Record the migration
INSERT INTO migration_status (migration_name, status) VALUES
('012-new-migration', 'applied')
ON CONFLICT (migration_name) DO NOTHING;
```

### maintenance.sql

**Purpose:** Provides monitoring and maintenance utilities

**Sections:**

1. **Vacuuming and Autovacuum**
   - Enable/configure autovacuum
   - Manual VACUUM commands

2. **Cleanup Scripts**
   - Remove old records
   - Archive historical data
   - Commented out by default (uncomment as needed)

3. **Statistics and Analysis**
   - Table size analysis
   - Index usage statistics
   - Query performance

4. **Performance Tuning**
   - Identify slow queries
   - Detect table bloat
   - Cache hit ratios

5. **Connection Monitoring**
   - Active connections
   - Long-running transactions
   - Connection limits

6. **Data Integrity Checks**
   - Orphaned records
   - Duplicate detection
   - Invalid data validation

7. **Queue Statistics**
   - Status breakdown
   - Retry analysis
   - Stale items identification

8. **Crawl Statistics**
   - Success rates by domain
   - Crawl efficiency metrics
   - Performance analysis

9. **PageRank Statistics**
   - Score distribution
   - Top ranked pages
   - Ranking changes

10. **Search Statistics**
    - Popular queries
    - Search performance metrics
    - User behavior analytics

**Running Maintenance Reports:**

```bash
# Connect to database
psql -h localhost -U postgres -d databaseName

# Run specific query sections
-- For example, view table sizes:
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(...))
...
```

## Performance Considerations

### Indexes

The schema includes optimized indexes for:
- Full-text search queries
- Domain-based filtering
- Time-range queries
- Priority-based queue selection
- Latest PageRank lookups

### Statistics

Run `ANALYZE` regularly for query optimizer:

```bash
# In Docker container
docker-compose exec postgres psql -U postgres -d databaseName -c "ANALYZE;"

# In Kubernetes
kubectl exec postgres-0 -n search-engine -- psql -U postgres -d databaseName -c "ANALYZE;"
```

### Vacuum

Enable autovacuum for automatic dead row cleanup:

```sql
ALTER TABLE SeenPages SET (autovacuum_vacuum_scale_factor = 0.01);
ALTER TABLE Queue SET (autovacuum_vacuum_scale_factor = 0.01);
```

## Backup and Restore

### Backup Database

```bash
# Docker
docker-compose exec postgres pg_dump -U postgres databaseName | gzip > backup.sql.gz

# Kubernetes
kubectl exec postgres-0 -n search-engine -- pg_dump -U postgres databaseName | gzip > backup.sql.gz
```

### Restore Database

```bash
# Docker
gunzip < backup.sql.gz | docker-compose exec -T postgres psql -U postgres databaseName

# Kubernetes
gunzip < backup.sql.gz | kubectl exec -i postgres-0 -n search-engine -- psql -U postgres databaseName
```

## Troubleshooting

### Schema Not Created

```bash
# Check if schema exists
psql -U postgres -d databaseName -c "\dt"

# If empty, reapply schema
psql -U postgres -d databaseName < scripts/01-init-schema.sql
```

### Sequence Issues

```bash
# Reset sequences after bulk delete
SELECT setval('seenpages_id_seq', (SELECT MAX(id) FROM SeenPages));
SELECT setval('queue_id_seq', (SELECT MAX(id) FROM Queue));
```

### Index Bloat

```bash
-- Check index sizes
SELECT schemaname, indexname, pg_size_pretty(pg_relation_size(indexrelid))
FROM pg_stat_user_indexes
ORDER BY pg_relation_size(indexrelid) DESC;

-- Rebuild index (locks table during rebuild)
REINDEX INDEX CONCURRENTLY idx_name;
```

## Production Recommendations

1. **Regular Backups**
   - Daily automated backups
   - Archive to off-site storage
   - Test restore procedures

2. **Monitoring**
   - Track table sizes
   - Monitor index usage
   - Watch for slow queries

3. **Maintenance Windows**
   - Schedule VACUUM during low traffic
   - Run ANALYZE after bulk operations
   - Monitor replication lag

4. **Security**
   - Use strong PostgreSQL passwords
   - Enable SSL/TLS for connections
   - Restrict database access
   - Encrypt backups

5. **Scaling**
   - Implement table partitioning if needed
   - Consider read replicas
   - Archive old data
   - Use connection pooling

## References

- [PostgreSQL Full-text Search](https://www.postgresql.org/docs/current/textsearch.html)
- [PostgreSQL Maintenance](https://www.postgresql.org/docs/current/maintenance.html)
- [PostgreSQL Performance Tips](https://wiki.postgresql.org/wiki/Performance_Optimization)
