-- Search suggestions: powers autocomplete (prefix match) and "did you mean"
-- (trigram similarity) in the searcher.
--
-- Why a separate table: matching against SeenPages directly would mean a prefix
-- or trigram scan over millions of rows (and an index on an ~80GB table). This
-- holds only the titles of the highest-ranked pages (300k rows, tens of MB),
-- so both lookups are cheap, and the indexes are built on that small table.
--
-- Safe to run more than once: the table/indexes are IF NOT EXISTS and the load
-- is an upsert, so re-running refreshes weights from the latest PageRank run.
-- When a PageRank run exists the table is cleared and reloaded, which also
-- prunes titles that have fallen out of the top N; the searcher shows fewer
-- suggestions while that runs and degrades gracefully if there are none.
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

-- Both loads below share the title cleaning and filtering, so they are written
-- once as a view-like CTE per statement. Exactly one of them inserts anything:
-- the PageRank load when PageRankResults has a latest run, otherwise the
-- crawl-order fallback.

-- 1) Ranked by PageRank (the normal case).
-- Clear the table first when a PageRank run exists. Fallback rows are weighted
-- 1/(1+id), a different scale from PageRank scores, so leaving them would let
-- stale fallback entries outrank real ones. This also prunes titles that have
-- fallen out of the top N. (A DELETE rather than TRUNCATE, so concurrent
-- lookups are never blocked; they just see fewer suggestions while this runs.)
DELETE FROM search_suggestions
WHERE EXISTS (SELECT 1 FROM pagerankresults WHERE is_latest = true);

INSERT INTO search_suggestions (term, term_lc, weight)
SELECT term, lower(term), max(score)
FROM (
  SELECT
    -- "University of Arizona - Wikipedia" -> "University of Arizona"
    btrim(regexp_replace(sp.title, '\s*[-–—|]\s*Wikip[eé]dia[^-–—|]*$', '', 'i')) AS term,
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

-- 2) Fallback when no PageRank has been stored (PageRankResults is empty, as it
-- is until the Cartographer has completed a run). The crawler walks the web
-- breadth-first from its seed pages, so a lower id means a page closer to the
-- seeds and, on average, a more central and better-known one. That makes id a
-- reasonable stand-in for importance, weighted so earlier pages rank higher.
-- Once PageRank exists, re-run this script: the load above takes over and the
-- weights are replaced (ON CONFLICT ... DO UPDATE).
INSERT INTO search_suggestions (term, term_lc, weight)
SELECT term, lower(term), max(score)
FROM (
  SELECT
    btrim(regexp_replace(sp.title, '\s*[-–—|]\s*Wikip[eé]dia[^-–—|]*$', '', 'i')) AS term,
    1.0 / (1 + sp.id) AS score
  FROM seenpages sp
  WHERE NOT EXISTS (SELECT 1 FROM pagerankresults WHERE is_latest = true)
    AND sp.title IS NOT NULL
    AND sp.is_indexable = true
  ORDER BY sp.id
  LIMIT 300000
) t
WHERE term <> ''
  AND char_length(term) BETWEEN 2 AND 100
  AND term !~ '^(Special|Category|Talk|User|User talk|Wikipedia|File|Template|Help|Portal|Draft|MediaWiki|Module):'
GROUP BY term
ON CONFLICT (term) DO UPDATE SET weight = EXCLUDED.weight;

ANALYZE search_suggestions;
