-- Migration: Create PageRankResults table
-- Description: Stores computed PageRank scores with versioning support
-- Author: Cartographer Service
-- Date: 2025-01-15

CREATE TABLE IF NOT EXISTS PageRankResults (
    url VARCHAR(768) NOT NULL,
    rank_score FLOAT NOT NULL,
    incoming_links INT DEFAULT 0,
    outgoing_links INT DEFAULT 0,
    sweep_id VARCHAR(100) NOT NULL,
    computed_at TIMESTAMP DEFAULT NOW(),
    algorithm_name VARCHAR(50) DEFAULT 'damped_pagerank',
    is_latest BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (url, sweep_id),
    FOREIGN KEY (url) REFERENCES SeenPages(url) ON DELETE CASCADE
);

-- Index for fast queries on latest rankings
CREATE INDEX idx_latest_rank ON PageRankResults(rank_score DESC) WHERE is_latest = TRUE;

-- Index for sweep-based queries
CREATE INDEX idx_sweep ON PageRankResults(sweep_id);

-- Index for time-based queries
CREATE INDEX idx_computed_at ON PageRankResults(computed_at DESC);

-- Comments
COMMENT ON TABLE PageRankResults IS 'Stores PageRank computation results with version history';
COMMENT ON COLUMN PageRankResults.rank_score IS 'Normalized PageRank score (0.0 to 1.0+)';
COMMENT ON COLUMN PageRankResults.sweep_id IS 'Unique identifier for each computation run (e.g., pagerank_20250115_143022)';
COMMENT ON COLUMN PageRankResults.is_latest IS 'Flag indicating if this is the most recent computation for this URL';
