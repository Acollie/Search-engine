-- Search suggestions: powers autocomplete (prefix match) and "did you mean"
-- (trigram similarity) in the searcher.
--
-- Why a separate table: matching against SeenPages directly would mean a prefix
-- or trigram scan over millions of rows (and an index on an ~80GB table). This
-- holds only the titles of the highest-PageRank pages (300k rows, tens of MB),
-- so both lookups are cheap, and the indexes are built on that small table.
--
-- Safe to run more than once: the table/indexes are IF NOT EXISTS and the load
-- is an upsert, so re-running refreshes weights from the latest PageRank run.
-- Titles that have since fallen out of the top N are left in place; to prune,
-- TRUNCATE search_suggestions first (suggestions are empty until the INSERT
-- finishes, and the searcher degrades gracefully while they are).
--
-- The searcher treats a missing table as "no suggestions", so deploying the
-- code before running this is harmless.
--
-- Run during a quiet period; the INSERT reads PageRankResults and SeenPages:
--   psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f scripts/04-search-suggestions.sql

SET statement_timeout = 0;

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE IF NOT EXISTS search_suggestions (
  term    TEXT PRIMARY KEY,
  term_lc TEXT NOT NULL,                       -- lower(term), what lookups match
  weight  DOUBLE PRECISION NOT NULL DEFAULT 0  -- PageRank score of the page
);

-- Prefix lookups (autocomplete): term_lc LIKE 'prefix%' ORDER BY weight DESC.
CREATE INDEX IF NOT EXISTS idx_search_suggestions_prefix
  ON search_suggestions (term_lc text_pattern_ops, weight DESC);
-- Fuzzy lookups ("did you mean"): term_lc % 'query'.
CREATE INDEX IF NOT EXISTS idx_search_suggestions_trgm
  ON search_suggestions USING gin (term_lc gin_trgm_ops);

INSERT INTO search_suggestions (term, term_lc, weight)
SELECT term, lower(term), max(score)
FROM (
  SELECT
    -- "University of Arizona - Wikipedia" -> "University of Arizona"
    btrim(regexp_replace(sp.title, '\s*[-–—|]\s*Wikipedia[^-–—|]*$', '', 'i')) AS term,
    pr.score
  FROM pagerankresults pr
  JOIN seenpages sp ON sp.id = pr.page_id
  WHERE pr.is_latest = true
    AND sp.title IS NOT NULL
    AND sp.is_indexable = true
  ORDER BY pr.score DESC
  LIMIT 300000
) t
WHERE term <> ''
  AND char_length(term) BETWEEN 2 AND 100
  -- Skip MediaWiki namespace pages (Category:, Talk:, Special:, ...): they are
  -- not things a person types into a search box.
  AND term !~ '^(Special|Category|Talk|User|User talk|Wikipedia|File|Template|Help|Portal|Draft|MediaWiki|Module):'
GROUP BY term
ON CONFLICT (term) DO UPDATE SET weight = EXCLUDED.weight;

ANALYZE search_suggestions;
