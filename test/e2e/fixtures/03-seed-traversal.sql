-- Additional seed data for testing link traversal and graph connectivity
-- This file demonstrates how pages link to each other, creating a web graph

-- Add more programming language pages to test traversal
INSERT INTO SeenPages (url, title, body, status_code, is_indexable) VALUES
  ('https://javascript.info', 'JavaScript Tutorial', 'Modern JavaScript tutorial for beginners and advanced developers. Learn JavaScript from the basics to advanced topics.', 200, true),
  ('https://docs.oracle.com/javase', 'Java Platform Documentation', 'Official Java platform documentation. Java is a widely-used programming language for enterprise applications.', 200, true),
  ('https://cplusplus.com', 'C++ Language Tutorial', 'Complete C++ language tutorial covering all aspects of C++ programming from basics to advanced concepts.', 200, true)
ON CONFLICT (url) DO NOTHING;

-- Create a web graph structure for PageRank testing
-- golang.org -> python.org, rust-lang.org, javascript.info
INSERT INTO Links (source_page_id, target_page_id, target_url, link_type)
SELECT s.id, t.id, t.url, 'internal'
FROM SeenPages s CROSS JOIN SeenPages t
WHERE s.url = 'https://golang.org'
  AND t.url IN ('https://python.org', 'https://rust-lang.org', 'https://javascript.info')
ON CONFLICT DO NOTHING;

-- python.org -> rust-lang.org, javascript.info, docs.oracle.com/javase
INSERT INTO Links (source_page_id, target_page_id, target_url, link_type)
SELECT s.id, t.id, t.url, 'internal'
FROM SeenPages s CROSS JOIN SeenPages t
WHERE s.url = 'https://python.org'
  AND t.url IN ('https://rust-lang.org', 'https://javascript.info', 'https://docs.oracle.com/javase')
ON CONFLICT DO NOTHING;

-- rust-lang.org -> cplusplus.com (systems programming connection)
INSERT INTO Links (source_page_id, target_page_id, target_url, link_type)
SELECT s.id, t.id, t.url, 'internal'
FROM SeenPages s CROSS JOIN SeenPages t
WHERE s.url = 'https://rust-lang.org'
  AND t.url = 'https://cplusplus.com'
ON CONFLICT DO NOTHING;

-- javascript.info -> docs.oracle.com/javase, golang.org (web development to backend)
INSERT INTO Links (source_page_id, target_page_id, target_url, link_type)
SELECT s.id, t.id, t.url, 'internal'
FROM SeenPages s CROSS JOIN SeenPages t
WHERE s.url = 'https://javascript.info'
  AND t.url IN ('https://docs.oracle.com/javase', 'https://golang.org')
ON CONFLICT DO NOTHING;

-- cplusplus.com -> docs.oracle.com/javase (both compiled languages)
INSERT INTO Links (source_page_id, target_page_id, target_url, link_type)
SELECT s.id, t.id, t.url, 'internal'
FROM SeenPages s CROSS JOIN SeenPages t
WHERE s.url = 'https://cplusplus.com'
  AND t.url = 'https://docs.oracle.com/javase'
ON CONFLICT DO NOTHING;

-- Add some external links for completeness
INSERT INTO Links (source_page_id, target_page_id, target_url, link_type)
SELECT s.id, NULL, 'https://github.com', 'external'
FROM SeenPages s
WHERE s.url IN ('https://golang.org', 'https://python.org', 'https://rust-lang.org')
ON CONFLICT DO NOTHING;

-- Add circular reference (realistic web scenario)
INSERT INTO Links (source_page_id, target_page_id, target_url, link_type)
SELECT s.id, t.id, t.url, 'internal'
FROM SeenPages s CROSS JOIN SeenPages t
WHERE s.url = 'https://docs.oracle.com/javase'
  AND t.url = 'https://golang.org'
ON CONFLICT DO NOTHING;
