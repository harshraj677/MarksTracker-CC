-- =============================================
-- Test Management System — Supabase SQL Setup
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- =============================================

-- 1. Create students table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usn TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create marks table
CREATE TABLE marks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  subject TEXT NOT NULL DEFAULT 'General',
  marks INTEGER NOT NULL CHECK (marks >= 0 AND marks <= 100),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (student_id, subject)
);

-- 3. Create indexes for fast lookups
CREATE INDEX idx_students_usn ON students(usn);
CREATE INDEX idx_marks_student ON marks(student_id);

-- 4. Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE marks ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for students table

-- Anyone can read students (for USN lookup)
CREATE POLICY "Anyone can view students"
  ON students FOR SELECT
  USING (true);

-- Only authenticated users (teacher) can insert
CREATE POLICY "Teacher can insert students"
  ON students FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users (teacher) can update
CREATE POLICY "Teacher can update students"
  ON students FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users (teacher) can delete
CREATE POLICY "Teacher can delete students"
  ON students FOR DELETE
  TO authenticated
  USING (true);

-- 6. RLS Policies for marks table

-- Anyone can read marks (for student lookup)
CREATE POLICY "Anyone can view marks"
  ON marks FOR SELECT
  USING (true);

-- Only authenticated users (teacher) can insert
CREATE POLICY "Teacher can insert marks"
  ON marks FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users (teacher) can update
CREATE POLICY "Teacher can update marks"
  ON marks FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users (teacher) can delete
CREATE POLICY "Teacher can delete marks"
  ON marks FOR DELETE
  TO authenticated
  USING (true);
