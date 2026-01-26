-- Seed pre-crawled pages and links for E2E testing
-- This runs automatically when PostgreSQL container starts

-- Insert 3 pre-crawled pages for search testing
INSERT INTO SeenPages (url, title, body, status_code, is_indexable) VALUES
  ('https://golang.org', 'Go Programming Language', 'Go is a statically typed compiled language designed for building simple reliable and efficient software. Go has excellent tooling and a great standard library.', 200, true),
  ('https://python.org', 'Python Programming', 'Python is a high-level interpreted language known for its simplicity and readability. Python is widely used in web development data science and automation.', 200, true),
  ('https://rust-lang.org', 'Rust Programming Language', 'Rust is a systems programming language focused on safety speed and concurrency. Rust prevents memory errors and data races at compile time.', 200, true)
ON CONFLICT (url) DO NOTHING;

-- Insert links for PageRank graph
INSERT INTO Links (source_page_id, target_page_id, target_url, link_type)
SELECT s.id, t.id, t.url, 'internal'
FROM SeenPages s CROSS JOIN SeenPages t
WHERE s.url = 'https://golang.org'
  AND t.url IN ('https://python.org', 'https://rust-lang.org')
ON CONFLICT DO NOTHING;

-- Add more cross-links for PageRank variety
INSERT INTO Links (source_page_id, target_page_id, target_url, link_type)
SELECT s.id, t.id, t.url, 'internal'
FROM SeenPages s CROSS JOIN SeenPages t
WHERE s.url = 'https://python.org'
  AND t.url = 'https://rust-lang.org'
ON CONFLICT DO NOTHING;
