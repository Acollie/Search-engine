-- Seed initial URLs into Queue table for E2E testing
-- This runs automatically when PostgreSQL container starts

INSERT INTO Queue (url, domain, status, priority) VALUES
  ('https://example.com', 'example.com', 'pending', 10),
  ('https://example.com/about', 'example.com', 'pending', 5),
  ('https://test.com', 'test.com', 'pending', 10)
ON CONFLICT (url) DO NOTHING;
