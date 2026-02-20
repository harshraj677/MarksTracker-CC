// Setup script: Creates tables, RLS policies, and seeds all students
// Run with: node scripts/setup.mjs

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://nkqgebwdooegejfecqvn.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rcWdlYndkb29lZ2VqZmVjcXZuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTU2Nzc1MSwiZXhwIjoyMDg3MTQzNzUxfQ.b5TH-7lqrM3kPeckkjR54qGl0expfVx2xYw0GLVn6-A";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ---------- Step 1: Create tables & RLS via SQL ----------
const migrationSQL = `
-- Create students table (if not exists)
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usn TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create marks table (if not exists)
CREATE TABLE IF NOT EXISTS marks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  subject TEXT NOT NULL DEFAULT 'General',
  marks INTEGER NOT NULL CHECK (marks >= 0 AND marks <= 100),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (student_id, subject)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_students_usn ON students(usn);
CREATE INDEX IF NOT EXISTS idx_marks_student ON marks(student_id);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE marks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (avoid duplicates on re-run)
DROP POLICY IF EXISTS "Anyone can view students" ON students;
DROP POLICY IF EXISTS "Teacher can insert students" ON students;
DROP POLICY IF EXISTS "Teacher can update students" ON students;
DROP POLICY IF EXISTS "Teacher can delete students" ON students;
DROP POLICY IF EXISTS "Anyone can view marks" ON marks;
DROP POLICY IF EXISTS "Teacher can insert marks" ON marks;
DROP POLICY IF EXISTS "Teacher can update marks" ON marks;
DROP POLICY IF EXISTS "Teacher can delete marks" ON marks;

-- RLS: Students
CREATE POLICY "Anyone can view students" ON students FOR SELECT USING (true);
CREATE POLICY "Teacher can insert students" ON students FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Teacher can update students" ON students FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Teacher can delete students" ON students FOR DELETE TO authenticated USING (true);

-- RLS: Marks
CREATE POLICY "Anyone can view marks" ON marks FOR SELECT USING (true);
CREATE POLICY "Teacher can insert marks" ON marks FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Teacher can update marks" ON marks FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Teacher can delete marks" ON marks FOR DELETE TO authenticated USING (true);
`;

console.log("Step 1: Creating tables & RLS policies...");
const { error: sqlError } = await supabase.rpc("exec_sql", { sql: migrationSQL }).maybeSingle();

// If rpc doesn't exist, try direct REST — fall back to individual inserts
if (sqlError) {
  console.log("  (rpc not available, using Supabase REST API — tables must exist already)");
  console.log("  If tables don't exist, run the SQL in supabase/migrations/20260220000000_init.sql manually in SQL Editor.");
}  else {
  console.log("  ✓ Tables & RLS created");
}

// ---------- Step 2: Seed students ----------
const students = [
  { usn: "4PM23CS001", name: "ADARSH UMESH HEGDE" },
  { usn: "4PM23CS002", name: "ADITYA KUMAR" },
  { usn: "4PM23CS003", name: "AHMED SHAREEF" },
  { usn: "4PM23CS004", name: "AISHWARYA K R" },
  { usn: "4PM23CS005", name: "AISHWARYALAXMI" },
  { usn: "4PM23CS006", name: "AKASH" },
  { usn: "4PM23CS007", name: "ALOK HAVANAGI" },
  { usn: "4PM23CS008", name: "AMRUTHA R H" },
  { usn: "4PM23CS009", name: "ANAND HOLI" },
  { usn: "4PM23CS010", name: "ANANYA K JOIS" },
  { usn: "4PM23CS011", name: "ANISH M" },
  { usn: "4PM23CS012", name: "ANKITHA B" },
  { usn: "4PM23CS013", name: "ANKITHA C" },
  { usn: "4PM23CS014", name: "ANKITHA N B" },
  { usn: "4PM23CS015", name: "ANUSHA H M" },
  { usn: "4PM23CS016", name: "B M BHARATH KUMAR" },
  { usn: "4PM23CS017", name: "BHARGAVI S R" },
  { usn: "4PM23CS018", name: "BHAVYA G S" },
  { usn: "4PM23CS019", name: "CHANDANA B" },
  { usn: "4PM23CS020", name: "CHANDRAPPA IRAPPA BANNIHATTI" },
  { usn: "4PM23CS021", name: "CHETAN R J" },
  { usn: "4PM23CS022", name: "CHETAN SATYEPPA MAGADUM" },
  { usn: "4PM23C0S23", name: "CHINMAY S R" },
  { usn: "4PM23CS024", name: "D R VIJAY" },
  { usn: "4PM23CS025", name: "DASARI KEERTHAN DATTA" },
  { usn: "4PM23CS026", name: "DEEKSHA J R" },
  { usn: "4PM23CS027", name: "DHANYA P TIMALAPUR" },
  { usn: "4PM23CS028", name: "DHRUVA PATEL H" },
  { usn: "4PM23CS029", name: "DIVYA S K" },
  { usn: "4PM23CS030", name: "DUTHI S M" },
  { usn: "4PM23CS031", name: "G VARUN RAJU" },
  { usn: "4PM23CS032", name: "GAGAN R BANGER" },
  { usn: "4PM23CS033", name: "GAGANA J" },
  { usn: "4PM23CS034", name: "GORAKATI CHAITANYA REDDY" },
  { usn: "4PM23CS035", name: "GOWTHAM K" },
  { usn: "4PM23CS036", name: "H GANESH" },
  { usn: "4PM23CS037", name: "H N SPANDAN GOWDA" },
  { usn: "4PM23CS038", name: "HARSHA D P" },
  { usn: "4PM23CS039", name: "HARSHITHA B R" },
  { usn: "4PM23CS042", name: "IMRAN BAIG" },
  { usn: "4PM23CS043", name: "JAYASURYA V" },
  { usn: "4PM23CS044", name: "JEEVANA KRISHNAMOORTI NAIK" },
  { usn: "4PM23CS045", name: "JYOTI ASHOK HINDI" },
  { usn: "4PM23CS046", name: "K C ASHWINI" },
  { usn: "4PM23CS047", name: "K N NANDITHA" },
  { usn: "4PM23CS048", name: "KAVANA A" },
  { usn: "4PM23CS049", name: "KONA VENKATA SRUJANA SREE" },
  { usn: "4PM23CS050", name: "LAVANYA J" },
  { usn: "4PM23CS051", name: "LIKHITH GOWDA K N" },
  { usn: "4PM23CS052", name: "LINGANAGOUDA SHADAKSHARAGOUDA PATIL" },
  { usn: "4PM23CS053", name: "M C BINDU RANI" },
  { usn: "4PM23CS054", name: "MAHANTESHA U" },
  { usn: "4PM23CS055", name: "MAHERA MUSKAN" },
  { usn: "4PM23CS056", name: "MANASA M P" },
  { usn: "4PM23CS057", name: "MANASA N C" },
  { usn: "4PM23CS058", name: "MANDARA G N" },
  { usn: "4PM23CS059", name: "MANSI H J" },
  { usn: "4PM23CS061", name: "MD ZULKERNAIN KHAN" },
  { usn: "4PM23CS062", name: "MOHAMMED MAAZ F" },
  { usn: "4PM23CS063", name: "MOHAMMED SAIF KATTIMANI" },
  { usn: "4PM23CS064", name: "MUBARAK KHAN" },
  { usn: "4PM23CS065", name: "NANDAN S P" },
  { usn: "4PM23CS066", name: "NANDINI HOSAMANI" },
  { usn: "4PM24CS400", name: "A R VAISHNAVI" },
  { usn: "4PM24CS401", name: "BHUVAN S" },
  { usn: "4PM24CS402", name: "CHETHAN K C" },
];

console.log(`\nStep 2: Seeding ${students.length} students...`);
const { data, error: insertError } = await supabase
  .from("students")
  .upsert(students, { onConflict: "usn", ignoreDuplicates: true })
  .select();

if (insertError) {
  console.error("  ✗ Error seeding students:", insertError.message);
  console.log("\n  If the error says 'relation does not exist', you need to run the SQL first.");
  console.log("  Go to: https://supabase.com/dashboard/project/nkqgebwdooegejfecqvn/sql/new");
  console.log("  Copy & run the contents of: supabase/migrations/20260220000000_init.sql");
  console.log("  Then re-run this script.");
} else {
  console.log(`  ✓ ${data?.length || students.length} students seeded`);
}

// ---------- Step 3: Create teacher account ----------
console.log("\nStep 3: Creating teacher account...");
const { data: teacherData, error: teacherError } = await supabase.auth.admin.createUser({
  email: "sanketh.gujjar@teacher.com",
  password: "Teacher@123",
  email_confirm: true,
  user_metadata: { name: "Sanketh Gujjar U" },
});

if (teacherError) {
  if (teacherError.message.includes("already been registered")) {
    console.log("  ✓ Teacher account already exists");
  } else {
    console.error("  ✗ Error:", teacherError.message);
  }
} else {
  console.log("  ✓ Teacher created:", teacherData.user?.email);
}

console.log("\n==========================================");
console.log("Setup complete!");
console.log("==========================================");
console.log("\nTeacher login credentials:");
console.log("  Email:    sanketh.gujjar@teacher.com");
console.log("  Password: Teacher@123");
console.log("\nStart the app: npm run dev");
console.log("Login at: http://localhost:3000/teacher/login");
