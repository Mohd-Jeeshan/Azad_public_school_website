/*
# Create news table for school website (single-tenant, no auth)

1. New Tables
- `news`
  - `id` (uuid, primary key)
  - `title` (text, not null) — headline of the news article
  - `summary` (text, not null) — short summary shown in the news card
  - `content` (text) — optional full article body
  - `category` (text, not null) — news category (e.g. "Event", "Achievement", "Announcement")
  - `image_url` (text) — optional hero image for the article
  - `date` (date, not null) — publication date
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `news`.
- Allow anon + authenticated CRUD because this is a public-facing school website with no sign-in.
*/

CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text NOT NULL,
  content text,
  category text NOT NULL,
  image_url text,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_news" ON news;
CREATE POLICY "anon_select_news" ON news FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_news" ON news;
CREATE POLICY "anon_insert_news" ON news FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_news" ON news;
CREATE POLICY "anon_update_news" ON news FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_news" ON news;
CREATE POLICY "anon_delete_news" ON news FOR DELETE
  TO anon, authenticated USING (true);
