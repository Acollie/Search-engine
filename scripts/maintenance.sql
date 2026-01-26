-- Database Maintenance Scripts
-- Regular maintenance operations for search engine database

-- ==============================================================================
-- VACUUMING AND AUTOVACUUM
-- ==============================================================================

-- Enable autovacuum for all tables
ALTER TABLE SeenPages SET (autovacuum_vacuum_scale_factor = 0.01);
ALTER TABLE Queue SET (autovacuum_vacuum_scale_factor = 0.01);
ALTER TABLE Links SET (autovacuum_vacuum_scale_factor = 0.01);
ALTER TABLE PageRankResults SET (autovacuum_vacuum_scale_factor = 0.01);

-- Manual VACUUM (removes dead rows and reclaims space)
-- Run periodically during off-peak hours
-- VACUUM ANALYZE;

-- ==============================================================================
-- CLEANUP SCRIPTS
-- ==============================================================================

-- Remove old crawl records (keep last 90 days)
-- DELETE FROM SeenPages WHERE crawl_time < CURRENT_TIMESTAMP - INTERVAL '90 days';

-- Remove failed queue items older than 30 days
-- DELETE FROM Queue WHERE status = 'failed' AND created_at < CURRENT_TIMESTAMP - INTERVAL '30 days';

-- Remove old error logs (keep last 60 days)
-- DELETE FROM ErrorLog WHERE created_at < CURRENT_TIMESTAMP - INTERVAL '60 days';

-- Remove old search sessions (keep last 30 days)
-- DELETE FROM SearchSessions WHERE created_at < CURRENT_TIMESTAMP - INTERVAL '30 days';

-- ==============================================================================
-- STATISTICS AND ANALYSIS
-- ==============================================================================

-- Update table statistics for query optimizer
ANALYZE SeenPages;
ANALYZE Queue;
ANALYZE Links;
ANALYZE PageRankResults;

-- Check table sizes
SELECT schemaname,
       tablename,
       pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS total_size,
       pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) AS table_size,
       pg_size_pretty(pg_indexes_size(schemaname||'.'||tablename)) AS indexes_size
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check index usage and missing indexes
SELECT schemaname,
       tablename,
       indexname,
       idx_scan,
       idx_tup_read,
       idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- ==============================================================================
-- PERFORMANCE TUNING
-- ==============================================================================

-- Check slow queries (requires log_min_duration_statement to be set)
-- SELECT query,
--        calls,
--        mean_exec_time,
--        max_exec_time,
--        min_exec_time
-- FROM pg_stat_statements
-- ORDER BY mean_exec_time DESC
-- LIMIT 10;

-- Check table bloat
SELECT schemaname,
       tablename,
       pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS total_size,
       ROUND(100 * (pg_total_relation_size(schemaname||'.'||tablename) -
       pg_relation_size(schemaname||'.'||tablename)) /
       pg_total_relation_size(schemaname||'.'||tablename)::numeric, 2) AS index_ratio
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- ==============================================================================
-- CONNECTION MONITORING
-- ==============================================================================

-- Check active connections
SELECT datname,
       usename,
       application_name,
       state,
       query_start,
       state_change,
       query
FROM pg_stat_activity
WHERE datname = 'databaseName'
ORDER BY query_start DESC;

-- Check for long-running transactions
SELECT pid,
       usename,
       application_name,
       state,
       xact_start,
       NOW() - xact_start AS duration,
       query
FROM pg_stat_activity
WHERE datname = 'databaseName'
  AND xact_start IS NOT NULL
ORDER BY xact_start;

-- Check connection count
SELECT COUNT(*) as total_connections,
       MAX(connections) as max_connections
FROM (
  SELECT COUNT(*) as connections FROM pg_stat_activity WHERE datname = 'databaseName'
) subquery;

-- ==============================================================================
-- REPLICATION AND BACKUP MONITORING (if using replication)
-- ==============================================================================

-- Check replication status (on primary)
-- SELECT client_addr,
--        state,
--        sync_state,
--        sync_priority,
--        flush_lsn
-- FROM pg_stat_replication;

-- Check WAL archival status
-- SELECT *, NOW() - last_failed_wal AS time_since_last_failure
-- FROM pg_stat_archiver;

-- ==============================================================================
-- CACHE AND BUFFER STATISTICS
-- ==============================================================================

-- Check buffer cache hit ratio
SELECT
  sum(heap_blks_read) as heap_read,
  sum(heap_blks_hit) as heap_hit,
  sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)) as ratio
FROM pg_statio_user_tables;

-- Check index cache hit ratio
SELECT
  sum(idx_blks_read) as idx_read,
  sum(idx_blks_hit) as idx_hit,
  sum(idx_blks_hit) / (sum(idx_blks_hit) + sum(idx_blks_read)) as ratio
FROM pg_statio_user_indexes;

-- ==============================================================================
-- DATABASE INTEGRITY CHECKS
-- ==============================================================================

-- Check for orphaned links (links to non-existent pages)
-- This should return 0 rows if data is consistent
SELECT COUNT(*) as orphaned_links
FROM Links l
LEFT JOIN SeenPages sp ON l.target_page_id = sp.id
WHERE l.target_page_id IS NOT NULL
  AND sp.id IS NULL;

-- Check for duplicate URLs
-- This should return 0 rows if data is consistent
SELECT url, COUNT(*) as duplicate_count
FROM SeenPages
GROUP BY url
HAVING COUNT(*) > 1;

-- Check for invalid PageRank scores
-- This should return 0 rows if data is consistent
SELECT COUNT(*) as invalid_scores
FROM PageRankResults
WHERE score < 0 OR score > 100;

-- ==============================================================================
-- QUEUE STATISTICS
-- ==============================================================================

-- Queue status breakdown
SELECT status, COUNT(*) as count
FROM Queue
GROUP BY status;

-- Average retry count
SELECT AVG(retries) as avg_retries,
       MAX(retries) as max_retries,
       MIN(retries) as min_retries
FROM Queue;

-- Old pending items
SELECT COUNT(*) as old_pending_items
FROM Queue
WHERE status = 'pending'
  AND created_at < CURRENT_TIMESTAMP - INTERVAL '7 days';

-- ==============================================================================
-- CRAWL STATISTICS
-- ==============================================================================

-- Pages by status code
SELECT status_code, COUNT(*) as count, AVG(crawl_duration_ms) as avg_duration_ms
FROM SeenPages
WHERE status_code IS NOT NULL
GROUP BY status_code
ORDER BY count DESC;

-- Top domains by page count
SELECT domain, COUNT(*) as page_count, AVG(crawl_duration_ms) as avg_crawl_time_ms
FROM SeenPages
WHERE domain IS NOT NULL
GROUP BY domain
ORDER BY page_count DESC
LIMIT 20;

-- Crawl efficiency
SELECT
  COUNT(*) as total_pages,
  SUM(CASE WHEN status_code >= 200 AND status_code < 300 THEN 1 ELSE 0 END) as successful,
  SUM(CASE WHEN status_code >= 400 THEN 1 ELSE 0 END) as failed,
  ROUND(100.0 * SUM(CASE WHEN status_code >= 200 AND status_code < 300 THEN 1 ELSE 0 END) / COUNT(*), 2) as success_rate_pct,
  ROUND(AVG(crawl_duration_ms), 2) as avg_crawl_time_ms
FROM SeenPages;

-- ==============================================================================
-- PAGERANK STATISTICS
-- ==============================================================================

-- PageRank distribution
SELECT
  PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY score) as p25,
  PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY score) as p50,
  PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY score) as p75,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY score) as p95,
  AVG(score) as avg_score,
  MIN(score) as min_score,
  MAX(score) as max_score
FROM PageRankResults
WHERE is_latest = true;

-- Top ranked pages
SELECT sp.url, sp.title, pr.score
FROM PageRankResults pr
JOIN SeenPages sp ON pr.page_id = sp.id
WHERE pr.is_latest = true
ORDER BY pr.score DESC
LIMIT 20;

-- ==============================================================================
-- SEARCH STATISTICS
-- ==============================================================================

-- Popular search queries
SELECT query, COUNT(*) as search_count, AVG(execution_time_ms) as avg_time_ms
FROM SearchSessions
WHERE created_at > CURRENT_TIMESTAMP - INTERVAL '7 days'
GROUP BY query
ORDER BY search_count DESC
LIMIT 20;

-- Search performance metrics
SELECT
  COUNT(*) as total_searches,
  ROUND(AVG(execution_time_ms), 2) as avg_time_ms,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY execution_time_ms) as p95_time_ms,
  MAX(execution_time_ms) as max_time_ms
FROM SearchSessions
WHERE created_at > CURRENT_TIMESTAMP - INTERVAL '7 days';

-- ==============================================================================
-- MAINTENANCE SUMMARY
-- ==============================================================================

-- Generate maintenance summary
SELECT 'Maintenance Report' as title;
SELECT 'Database Size' as section;
SELECT pg_size_pretty(pg_database_size('databaseName')) as database_size;
SELECT '' as blank;
SELECT 'Table Counts' as section;
SELECT (SELECT COUNT(*) FROM SeenPages) as seen_pages_count;
SELECT (SELECT COUNT(*) FROM Queue) as queue_items_count;
SELECT (SELECT COUNT(*) FROM Links) as links_count;
SELECT '' as blank;
SELECT 'Queue Status' as section;
SELECT COUNT(*) as pending_items FROM Queue WHERE status = 'pending';
SELECT COUNT(*) as processing_items FROM Queue WHERE status = 'processing';
SELECT COUNT(*) as failed_items FROM Queue WHERE status = 'failed';
