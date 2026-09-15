-- Drop duplicate indexes on seenpages.
--
-- The table carries two pairs of identical indexes, which cost ~9.9GB of a
-- 98GB volume and slow every write:
--
--   idx_seen_pages_search_vector  GIN (search_vector)  8975 MB, 3 scans
--   idx_seenpages_search          GIN (search_vector)  8975 MB, 60 scans   <- kept
--
--   idx_seen_pages_url            btree (url)           887 MB, 0 scans
--   idx_seenpages_url             btree (url)           887 MB, 2838 scans <- kept
--   seenpages_url_key             UNIQUE btree (url)    891 MB, 198 scans  <- kept
--
-- Context: the volume filled completely on 2026-09-02, which crash-looped
-- postgres (PANIC: could not write to file ... No space left on device) every
-- 10 minutes for weeks. Freeing space here is the cheapest win; the rest of
-- the usage is 53GB of TOASTed page bodies.
--
-- CONCURRENTLY keeps the table writable, but cannot run inside a transaction
-- block, so run this file with psql directly rather than via a wrapping BEGIN.

DROP INDEX CONCURRENTLY IF EXISTS idx_seen_pages_search_vector;
DROP INDEX CONCURRENTLY IF EXISTS idx_seen_pages_url;
