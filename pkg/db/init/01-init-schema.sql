-- Search Engine Database Schema
-- Initial schema creation for distributed search engine

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS btree_gin;
CREATE EXTENSION IF NOT EXISTS uuid-ossp;

-- Drop tables if they exist (for clean initialization)
DROP TABLE IF EXISTS SearchSessions CASCADE;
DROP TABLE IF EXISTS PageRankResults CASCADE;
DROP TABLE IF EXISTS Links CASCADE;
DROP TABLE IF EXISTS Queue CASCADE;
DROP TABLE IF EXISTS SeenPages CASCADE;

-- SeenPages table: stores crawled web pages
CREATE TABLE SeenPages (
  id SERIAL PRIMARY KEY,
  url TEXT UNIQUE NOT NULL,
  title TEXT,
  description TEXT,
  body TEXT,
  headers JSONB,
  status_code INTEGER,
  crawl_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_modified TIMESTAMP,
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(description, '') || ' ' || COALESCE(body, ''))
  ) STORED,
  is_indexable BOOLEAN DEFAULT true,
  domain TEXT,
  content_length INTEGER,
  content_type VARCHAR(100),
  language VARCHAR(10),
  CONSTRAINT url_not_empty CHECK (url != '')
);

-- Indexes for SeenPages
CREATE INDEX idx_seen_pages_url ON SeenPages(url);
CREATE INDEX idx_seen_pages_crawl_time ON SeenPages(crawl_time DESC);
CREATE INDEX idx_seen_pages_domain ON SeenPages(domain);
CREATE INDEX idx_seen_pages_search_vector ON SeenPages USING GIN(search_vector);
CREATE INDEX idx_seen_pages_status ON SeenPages(status_code);
CREATE INDEX idx_seen_pages_indexable ON SeenPages(is_indexable);

-- Queue table: tracks URLs to be crawled
CREATE TABLE Queue (
  id SERIAL PRIMARY KEY,
  url TEXT UNIQUE NOT NULL,
  domain TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  retries INTEGER DEFAULT 0,
  priority INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending',
  error_message TEXT,
  last_attempt TIMESTAMP,
  CONSTRAINT status_in_values CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'skipped')),
  CONSTRAINT url_queue_not_empty CHECK (url != '')
);

-- Indexes for Queue
CREATE INDEX idx_queue_status ON Queue(status);
CREATE INDEX idx_queue_domain ON Queue(domain);
CREATE INDEX idx_queue_priority ON Queue(priority DESC, created_at ASC);
CREATE INDEX idx_queue_retries ON Queue(retries);
CREATE INDEX idx_queue_pending ON Queue(status) WHERE status = 'pending';

-- Links table: represents the graph structure for PageRank
CREATE TABLE Links (
  id SERIAL PRIMARY KEY,
  source_page_id INTEGER NOT NULL REFERENCES SeenPages(id) ON DELETE CASCADE,
  target_page_id INTEGER REFERENCES SeenPages(id) ON DELETE SET NULL,
  target_url TEXT,
  anchor_text TEXT,
  link_type VARCHAR(50) DEFAULT 'internal',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT source_not_null CHECK (source_page_id IS NOT NULL)
);

-- Indexes for Links
CREATE INDEX idx_links_source ON Links(source_page_id);
CREATE INDEX idx_links_target ON Links(target_page_id);
CREATE INDEX idx_links_target_url ON Links(target_url);
CREATE INDEX idx_links_type ON Links(link_type);

-- PageRank results table: stores computed PageRank scores
CREATE TABLE PageRankResults (
  id SERIAL PRIMARY KEY,
  page_id INTEGER NOT NULL REFERENCES SeenPages(id) ON DELETE CASCADE,
  score FLOAT NOT NULL,
  result_version INTEGER NOT NULL,
  is_latest BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT score_non_negative CHECK (score >= 0),
  CONSTRAINT version_positive CHECK (result_version > 0)
);

-- Indexes for PageRankResults
CREATE INDEX idx_pagerank_page_id ON PageRankResults(page_id);
CREATE INDEX idx_pagerank_version ON PageRankResults(result_version);
CREATE INDEX idx_pagerank_latest ON PageRankResults(is_latest) WHERE is_latest = true;
CREATE INDEX idx_pagerank_score ON PageRankResults(score DESC);

-- Search sessions table: optional analytics tracking
CREATE TABLE SearchSessions (
  id SERIAL PRIMARY KEY,
  query TEXT NOT NULL,
  result_count INTEGER,
  execution_time_ms INTEGER,
  user_id VARCHAR(255),
  session_id VARCHAR(255),
  ip_address INET,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT query_not_empty CHECK (query != ''),
  CONSTRAINT execution_time_positive CHECK (execution_time_ms > 0)
);

-- Indexes for SearchSessions
CREATE INDEX idx_search_sessions_created ON SearchSessions(created_at DESC);
CREATE INDEX idx_search_sessions_query ON SearchSessions(query);
CREATE INDEX idx_search_sessions_user ON SearchSessions(user_id);

-- Grant permissions to application user
GRANT CONNECT ON DATABASE "databaseName" TO postgres;
GRANT USAGE ON SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;

-- Create comments for documentation
COMMENT ON TABLE SeenPages IS 'Stores crawled web pages with full-text search capabilities';
COMMENT ON TABLE Queue IS 'Tracks URLs to be crawled with priority and retry logic';
COMMENT ON TABLE Links IS 'Represents the link graph for PageRank computation';
COMMENT ON TABLE PageRankResults IS 'Stores versioned PageRank scores with latest flag';
COMMENT ON TABLE SearchSessions IS 'Optional analytics tracking for search queries';

-- Log schema creation
SELECT 'Schema created successfully at ' || NOW();
