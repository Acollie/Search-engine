-- Seed data for development and testing
-- Insert initial data to populate database for local development

-- Disable foreign key checks temporarily for faster inserts
ALTER TABLE Links DISABLE TRIGGER ALL;
ALTER TABLE PageRankResults DISABLE TRIGGER ALL;

-- Clear existing data
TRUNCATE SearchSessions CASCADE;
TRUNCATE PageRankResults CASCADE;
TRUNCATE Links CASCADE;
TRUNCATE Queue CASCADE;
TRUNCATE SeenPages CASCADE;

-- Reset sequences
ALTER SEQUENCE seenpages_id_seq RESTART WITH 1;
ALTER SEQUENCE queue_id_seq RESTART WITH 1;
ALTER SEQUENCE links_id_seq RESTART WITH 1;
ALTER SEQUENCE pageranks_id_seq RESTART WITH 1;
ALTER SEQUENCE searchsessions_id_seq RESTART WITH 1;

-- Insert initial seed pages
INSERT INTO SeenPages (url, title, description, body, status_code, domain, is_indexable) VALUES
-- Google-like pages
('https://example.com/', 'Example Domain', 'Example domain for use in documentation', 'This domain is for use in examples', 200, 'example.com', true),
('https://example.com/search', 'Search', 'Search functionality', 'Enter search query to find results', 200, 'example.com', true),
('https://example.com/about', 'About Us', 'About Example Company', 'We are an example company providing documentation', 200, 'example.com', true),
('https://example.com/privacy', 'Privacy Policy', 'Privacy and data protection', 'We respect your privacy and protect your data', 200, 'example.com', true),
('https://example.com/terms', 'Terms of Service', 'Terms and conditions', 'By using our services you agree to these terms', 200, 'example.com', true),
('https://example.com/blog', 'Blog', 'Latest articles and news', 'Read our latest blog posts on various topics', 200, 'example.com', true),
('https://example.com/blog/getting-started', 'Getting Started Guide', 'How to get started', 'Follow this guide to get started with our service', 200, 'example.com', true),
('https://example.com/blog/advanced-topics', 'Advanced Topics', 'Advanced usage patterns', 'Learn advanced techniques for power users', 200, 'example.com', true),
('https://example.com/help', 'Help Center', 'Help and support', 'Find answers to common questions and get support', 200, 'example.com', true),
('https://wikipedia.org/', 'Wikipedia', 'The free encyclopedia', 'Wikipedia is a free and open knowledge base', 200, 'wikipedia.org', true),
('https://wikipedia.org/wiki/Web_Crawler', 'Web Crawler', 'Information about web crawlers', 'A web crawler is a bot that browses the internet', 200, 'wikipedia.org', true),
('https://github.com/', 'GitHub', 'Where the world builds software', 'GitHub is where over 73 million developers build', 200, 'github.com', true),
('https://github.com/topics/search-engine', 'Search Engines', 'Search engine projects', 'Explore open source search engine implementations', 200, 'github.com', true);

-- Insert initial queue items
INSERT INTO Queue (url, domain, priority, status) VALUES
('https://example.com/products', 'example.com', 5, 'pending'),
('https://example.com/features', 'example.com', 4, 'pending'),
('https://example.com/pricing', 'example.com', 3, 'pending'),
('https://example.com/contact', 'example.com', 2, 'pending'),
('https://wikipedia.org/wiki/Search_Engine', 'wikipedia.org', 5, 'pending'),
('https://wikipedia.org/wiki/Information_Retrieval', 'wikipedia.org', 4, 'pending'),
('https://github.com/topics/go', 'github.com', 3, 'pending'),
('https://github.com/topics/database', 'github.com', 2, 'pending');

-- Insert links (create graph structure)
INSERT INTO Links (source_page_id, target_page_id, target_url, anchor_text, link_type) VALUES
(1, 2, 'https://example.com/search', 'Search', 'internal'),
(1, 3, 'https://example.com/about', 'About', 'internal'),
(1, 4, 'https://example.com/privacy', 'Privacy', 'footer'),
(1, 5, 'https://example.com/terms', 'Terms', 'footer'),
(1, 6, 'https://example.com/blog', 'Blog', 'internal'),
(3, 1, 'https://example.com/', 'Home', 'internal'),
(3, 9, 'https://example.com/help', 'Help', 'internal'),
(6, 7, 'https://example.com/blog/getting-started', 'Getting Started', 'internal'),
(6, 8, 'https://example.com/blog/advanced-topics', 'Advanced', 'internal'),
(7, 6, 'https://example.com/blog', 'Back to Blog', 'internal'),
(8, 6, 'https://example.com/blog', 'Back to Blog', 'internal'),
(9, 1, 'https://example.com/', 'Home', 'internal'),
(10, 11, 'https://wikipedia.org/wiki/Web_Crawler', 'Web Crawler', 'internal'),
(12, 13, 'https://github.com/topics/search-engine', 'Search Engine', 'internal');

-- Insert initial PageRank results (version 1)
INSERT INTO PageRankResults (page_id, score, result_version, is_latest) VALUES
(1, 0.85, 1, true),   -- Home page gets high rank
(2, 0.45, 1, true),   -- Search page
(3, 0.55, 1, true),   -- About page
(4, 0.35, 1, true),   -- Privacy
(5, 0.35, 1, true),   -- Terms
(6, 0.65, 1, true),   -- Blog hub
(7, 0.50, 1, true),   -- Getting started
(8, 0.48, 1, true),   -- Advanced topics
(9, 0.60, 1, true),   -- Help
(10, 0.75, 1, true),  -- Wikipedia home (high authority)
(11, 0.70, 1, true),  -- Wikipedia article
(12, 0.80, 1, true),  -- GitHub (high authority)
(13, 0.65, 1, true);  -- GitHub topic

-- Insert sample search sessions (analytics)
INSERT INTO SearchSessions (query, result_count, execution_time_ms, user_id) VALUES
('search engine', 5, 125, 'user_001'),
('web crawler', 3, 98, 'user_002'),
('information retrieval', 4, 156, 'user_001'),
('pagerank algorithm', 2, 112, 'user_003'),
('distributed systems', 6, 189, 'user_002'),
('golang programming', 8, 134, 'user_004'),
('database optimization', 5, 167, 'user_001'),
('network programming', 4, 145, 'user_003'),
('full text search', 7, 178, 'user_005'),
('apache lucene', 3, 99, 'user_002');

-- Re-enable triggers
ALTER TABLE Links ENABLE TRIGGER ALL;
ALTER TABLE PageRankResults ENABLE TRIGGER ALL;

-- Verify data insertion
SELECT 'Data seeded successfully' as status;
SELECT COUNT(*) as seen_pages_count FROM SeenPages;
SELECT COUNT(*) as queue_items_count FROM Queue;
SELECT COUNT(*) as links_count FROM Links;
SELECT COUNT(*) as pagerank_count FROM PageRankResults;
SELECT COUNT(*) as search_sessions_count FROM SearchSessions;
