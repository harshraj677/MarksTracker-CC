/**
 * Multi-Subject Setup Script
 * 
 * Run this when network is available:
 *   node scripts/setup-multi-subject.js
 * 
 * OR run these manually in Supabase SQL Editor:
 * 
 * 1. Add subject_slug column:
 *    ALTER TABLE students ADD COLUMN IF NOT EXISTS subject_slug TEXT DEFAULT 'cloud-computing';
 *    UPDATE students SET subject_slug = 'cloud-computing' WHERE subject_slug IS NULL;
 * 
 * 2. Create second teacher (run this script with network)
 */

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://nkqgebwdooegejfecqvn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rcWdlYndkb29lZ2VqZmVjcXZuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTU2Nzc1MSwiZXhwIjoyMDg3MTQzNzUxfQ.b5TH-7lqrM3kPeckkjR54qGl0expfVx2xYw0GLVn6-A"
);

async function run() {
  // 1. Create second teacher auth user
  const { data: newUser, error: userErr } = await supabase.auth.admin.createUser({
    email: "harish.kumar@teacher.com",
    password: "Teacher@123",
    email_confirm: true,
  });
  if (userErr) {
    console.log("Teacher creation:", userErr.message);
  } else {
    console.log("Created teacher:", newUser.user.email, newUser.user.id);
  }

  // 2. Check if subject_slug column exists by querying
  const { data: sample, error: sampleErr } = await supabase
    .from("students")
    .select("id, usn, subject_slug")
    .limit(1);

  if (sampleErr && sampleErr.message.includes("subject_slug")) {
    console.log("Column subject_slug does not exist yet. Please run this SQL in Supabase dashboard:");
    console.log("ALTER TABLE students ADD COLUMN subject_slug TEXT DEFAULT 'cloud-computing';");
    console.log("UPDATE students SET subject_slug = 'cloud-computing' WHERE subject_slug IS NULL;");
  } else {
    console.log("Sample student:", JSON.stringify(sample));
    if (sample && sample.length > 0 && sample[0].subject_slug) {
      console.log("subject_slug column exists and populated!");
    } else if (sample && sample.length > 0) {
      console.log("Column exists but may need default. Please run:");
      console.log("UPDATE students SET subject_slug = 'cloud-computing' WHERE subject_slug IS NULL;");
    }
  }
}

run().catch(console.error);
