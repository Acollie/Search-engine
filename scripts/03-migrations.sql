-- Database Migrations
-- This file contains migration scripts for schema changes
-- Each migration should be idempotent and reversible

-- Migration 1: Add performance monitoring tables
-- Applied: Initial schema creation (see 01-init-schema.sql)

-- Migration 2: Add service health tracking (v1.1)
CREATE TABLE IF NOT EXISTS ServiceHealth (
  id SERIAL PRIMARY KEY,
  service_name VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL,
  last_check TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  error_message TEXT,
  response_time_ms INTEGER,
  CONSTRAINT valid_status CHECK (status IN ('healthy', 'degraded', 'unhealthy')),
  CONSTRAINT service_name_not_empty CHECK (service_name != '')
);

CREATE INDEX IF NOT EXISTS idx_service_health_name ON ServiceHealth(service_name);
CREATE INDEX IF NOT EXISTS idx_service_health_last_check ON ServiceHealth(last_check DESC);

-- Migration 3: Add URL classification (v1.2)
ALTER TABLE SeenPages
ADD COLUMN IF NOT EXISTS classification VARCHAR(50),
ADD COLUMN IF NOT EXISTS is_spam BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_duplicate BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS original_url TEXT;

CREATE INDEX IF NOT EXISTS idx_seen_pages_classification ON SeenPages(classification) WHERE classification IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_seen_pages_spam ON SeenPages(is_spam) WHERE is_spam = true;

-- Migration 4: Add crawl metadata (v1.3)
ALTER TABLE SeenPages
ADD COLUMN IF NOT EXISTS crawl_duration_ms INTEGER,
ADD COLUMN IF NOT EXISTS redirect_url TEXT,
ADD COLUMN IF NOT EXISTS canonical_url TEXT,
ADD COLUMN IF NOT EXISTS robots_txt_allowed BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS last_crawl_attempt TIMESTAMP;

-- Migration 5: Add queue improvements (v1.4)
ALTER TABLE Queue
ADD COLUMN IF NOT EXISTS backoff_until TIMESTAMP,
ADD COLUMN IF NOT EXISTS max_retries INTEGER DEFAULT 3,
ADD COLUMN IF NOT EXISTS scheduled_time TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_queue_backoff ON Queue(backoff_until) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_queue_scheduled ON Queue(scheduled_time) WHERE status = 'pending';

-- Migration 6: Add search optimization tables (v1.5)
CREATE TABLE IF NOT EXISTS SearchIndex (
  id SERIAL PRIMARY KEY,
  page_id INTEGER NOT NULL REFERENCES SeenPages(id) ON DELETE CASCADE,
  keyword VARCHAR(255) NOT NULL,
  frequency INTEGER DEFAULT 1,
  position INTEGER,
  weight FLOAT DEFAULT 1.0,
  indexed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT keyword_not_empty CHECK (keyword != '')
);

CREATE INDEX IF NOT EXISTS idx_search_index_page ON SearchIndex(page_id);
CREATE INDEX IF NOT EXISTS idx_search_index_keyword ON SearchIndex(keyword);
CREATE INDEX IF NOT EXISTS idx_search_index_weight ON SearchIndex(weight DESC);

-- Migration 7: Add crawl statistics (v1.6)
CREATE TABLE IF NOT EXISTS CrawlStatistics (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  total_pages_crawled INTEGER DEFAULT 0,
  total_pages_failed INTEGER DEFAULT 0,
  total_duplicates_found INTEGER DEFAULT 0,
  average_crawl_time_ms FLOAT DEFAULT 0,
  queue_size INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT positive_counts CHECK (
    total_pages_crawled >= 0 AND
    total_pages_failed >= 0 AND
    total_duplicates_found >= 0
  )
);

CREATE INDEX IF NOT EXISTS idx_crawl_stats_date ON CrawlStatistics(date DESC);

-- Migration 8: Add domain reputation tracking (v1.7)
CREATE TABLE IF NOT EXISTS DomainReputation (
  id SERIAL PRIMARY KEY,
  domain VARCHAR(255) NOT NULL UNIQUE,
  reputation_score FLOAT DEFAULT 0.5,
  is_blacklisted BOOLEAN DEFAULT false,
  crawl_frequency VARCHAR(20) DEFAULT 'normal',
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT domain_not_empty CHECK (domain != ''),
  CONSTRAINT valid_score CHECK (reputation_score >= 0 AND reputation_score <= 1),
  CONSTRAINT valid_frequency CHECK (crawl_frequency IN ('low', 'normal', 'high'))
);

CREATE INDEX IF NOT EXISTS idx_domain_reputation_score ON DomainReputation(reputation_score DESC);
CREATE INDEX IF NOT EXISTS idx_domain_reputation_blacklist ON DomainReputation(is_blacklisted) WHERE is_blacklisted = true;

-- Migration 9: Add error logging (v1.8)
CREATE TABLE IF NOT EXISTS ErrorLog (
  id SERIAL PRIMARY KEY,
  service_name VARCHAR(100) NOT NULL,
  error_type VARCHAR(100) NOT NULL,
  error_message TEXT,
  stack_trace TEXT,
  context_data JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT service_name_not_empty CHECK (service_name != '')
);

CREATE INDEX IF NOT EXISTS idx_error_log_service ON ErrorLog(service_name);
CREATE INDEX IF NOT EXISTS idx_error_log_type ON ErrorLog(error_type);
CREATE INDEX IF NOT EXISTS idx_error_log_created ON ErrorLog(created_at DESC);

-- Migration 10: Add page ranking history (v1.9)
CREATE TABLE IF NOT EXISTS PageRankHistory (
  id SERIAL PRIMARY KEY,
  page_id INTEGER NOT NULL REFERENCES SeenPages(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  score FLOAT NOT NULL,
  rank_position INTEGER,
  rank_change INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT score_non_negative CHECK (score >= 0),
  CONSTRAINT version_positive CHECK (version > 0)
);

CREATE INDEX IF NOT EXISTS idx_pagerank_history_page ON PageRankHistory(page_id);
CREATE INDEX IF NOT EXISTS idx_pagerank_history_version ON PageRankHistory(version DESC);

-- Apply grants to new tables
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO postgres;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO postgres;

-- Migration status logging
CREATE TABLE IF NOT EXISTS migration_status (
  id SERIAL PRIMARY KEY,
  migration_name VARCHAR(255) NOT NULL UNIQUE,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'applied'
);

-- Record applied migrations
INSERT INTO migration_status (migration_name, status) VALUES
('001-init-schema', 'applied'),
('002-seed-data', 'applied'),
('003-add-service-health', 'applied'),
('004-add-url-classification', 'applied'),
('005-add-crawl-metadata', 'applied'),
('006-add-queue-improvements', 'applied'),
('007-add-search-optimization', 'applied'),
('008-add-crawl-statistics', 'applied'),
('009-add-domain-reputation', 'applied'),
('010-add-error-logging', 'applied'),
('011-add-pagerank-history', 'applied')
ON CONFLICT (migration_name) DO NOTHING;

-- Log migration completion
SELECT 'Migrations applied successfully at ' || NOW();
SELECT COUNT(*) as total_migrations FROM migration_status;
