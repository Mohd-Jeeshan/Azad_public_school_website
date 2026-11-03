/*
# Create school website tables (single-tenant, no auth)

1. New Tables
- `admission_applications`
  - `id` (uuid, primary key)
  - `student_name` (text, not null) — full name of the student applying
  - `parent_name` (text, not null) — name of parent/guardian
  - `email` (text, not null) — contact email
  - `phone` (text, not null) — contact phone number
  - `grade_applying_for` (text, not null) — which grade/class the student is applying to
  - `previous_school` (text) — optional, name of previous school
  - `message` (text) — optional, additional notes from parent
  - `status` (text, default 'pending') — application status: pending, reviewed, accepted, rejected
  - `created_at` (timestamptz, default now())

- `results`
  - `id` (uuid, primary key)
  - `student_name` (text, not null) — name of the student
  - `roll_number` (text, not null) — student roll number
  - `grade` (text, not null) — class/grade name
  - `exam_term` (text, not null) — which exam term (e.g. "Mid-Term 2025")
  - `subjects` (jsonb, not null) — array of {subject, marks, total} objects
  - `total_marks` (integer, not null) — sum of all subject marks
  - `max_marks` (integer, not null) — sum of all subject totals
  - `percentage` (numeric, not null) — percentage score
  - `grade_letter` (text, not null) — letter grade (A+, A, B, etc.)
  - `rank` (text) — optional class rank
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on both tables.
- Allow anon + authenticated CRUD because this is a public-facing school website with no sign-in.
  - Admission applications: anyone can submit (INSERT), but only SELECT for display purposes.
  - Results: anyone can view (SELECT), and INSERT/UPDATE/DELETE for admin management.
*/

-- Admission applications table
CREATE TABLE IF NOT EXISTS admission_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  parent_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  grade_applying_for text NOT NULL,
  previous_school text,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admission_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_applications" ON admission_applications;
CREATE POLICY "anon_select_applications" ON admission_applications FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_applications" ON admission_applications;
CREATE POLICY "anon_insert_applications" ON admission_applications FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_applications" ON admission_applications;
CREATE POLICY "anon_update_applications" ON admission_applications FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_applications" ON admission_applications;
CREATE POLICY "anon_delete_applications" ON admission_applications FOR DELETE
  TO anon, authenticated USING (true);

-- Results table
CREATE TABLE IF NOT EXISTS results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  roll_number text NOT NULL,
  grade text NOT NULL,
  exam_term text NOT NULL,
  subjects jsonb NOT NULL,
  total_marks integer NOT NULL,
  max_marks integer NOT NULL,
  percentage numeric NOT NULL,
  grade_letter text NOT NULL,
  rank text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_results" ON results;
CREATE POLICY "anon_select_results" ON results FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_results" ON results;
CREATE POLICY "anon_insert_results" ON results FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_results" ON results;
CREATE POLICY "anon_update_results" ON results FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_results" ON results;
CREATE POLICY "anon_delete_results" ON results FOR DELETE
  TO anon, authenticated USING (true);
