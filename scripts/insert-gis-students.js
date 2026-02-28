/**
 * GIS Student Bulk Insert Script
 * Inserts 75 students for Dr. Harish Kumar S (GIS / BCV654)
 * Also runs DB migration + creates teacher auth user
 *
 * Usage: node scripts/insert-gis-students.js
 */

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://nkqgebwdooegejfecqvn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rcWdlYndkb29lZ2VqZmVjcXZuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTU2Nzc1MSwiZXhwIjoyMDg3MTQzNzUxfQ.b5TH-7lqrM3kPeckkjR54qGl0expfVx2xYw0GLVn6-A"
);

const GIS_STUDENTS = [
  { usn: "4PM23AI003", name: "ANANYA P. BHAT" },
  { usn: "4PM23AI006", name: "BHUVAN B." },
  { usn: "4PM23AI007", name: "BRUNDA R. GOWDA" },
  { usn: "4PM23AI011", name: "DARSHAN G. R." },
  { usn: "4PM23AI019", name: "KRUPANKA R. PALED" },
  { usn: "4PM23AI020", name: "M JUHI ROUFINA DIWAN" },
  { usn: "4PM23AI040", name: "RANGASWAMY S." },
  { usn: "4PM23AI044", name: "SAGAR GURAKHANAVAR" },
  { usn: "4PM23CD012", name: "E. MADHURI" },
  { usn: "4PM23CD033", name: "NAGANANDA M." },
  { usn: "4PM23CD039", name: "SAKSHI S. BALIGA" },
  { usn: "4PM23CD042", name: "SAMRUDDHI R." },
  { usn: "4PM23CD048", name: "SHARON COSTHA" },
  { usn: "4PM23CD050", name: "SINCHANA S." },
  { usn: "4PM23CD055", name: "SUMANGALA CHIKALGUDD" },
  { usn: "4PM23CD061", name: "VISHAL S." },
  { usn: "4PM23CE006", name: "ASMA NAZIYA" },
  { usn: "4PM23CE008", name: "BINDUSHREE B. L." },
  { usn: "4PM23CE009", name: "GANAVI M. REDDY" },
  { usn: "4PM23CE014", name: "K. GAGANA" },
  { usn: "4PM23CE019", name: "KAVANAC. M." },
  { usn: "4PM23CE021", name: "LIKHITHA K. HALAPPA" },
  { usn: "4PM23CS002", name: "ADITYA KUMAR" },
  { usn: "4PM23CE025", name: "MIZBA TARANUM" },
  { usn: "4PM23CE030", name: "NANDINI U. K." },
  { usn: "4PM23CE033", name: "NIDA KHAN" },
  { usn: "4PM23CE054", name: "THANUSHREE H. M." },
  { usn: "4PM23CE055", name: "THARA B." },
  { usn: "4PM24CE402", name: "SANIYA FIRDOSE" },
  { usn: "4PM23CG008", name: "BHOOMIKA P." },
  { usn: "4PM23CG022", name: "LEKHANA B." },
  { usn: "4PM23CG024", name: "MOHAMMED KAIF" },
  { usn: "4PM23CG029", name: "POORVI V. S." },
  { usn: "4PM23CG048", name: "SHREYAS N.P." },
  { usn: "4PM23CG055", name: "T. P. ROHIT" },
  { usn: "4PM23CGO57", name: "VIJETA VIJAYKUMAR NAIK" },
  { usn: "4PM23CG059", name: "YASHASWINI G. D." },
  { usn: "4PM24CG400", name: "AVINASH H. C." },
  { usn: "4PM23CS016", name: "B. M. BHARATHKUMAR" },
  { usn: "4PM23CS021", name: "CHETAN R. J." },
  { usn: "4PM23CS025", name: "DASARI KEERTHAN DATTA" },
  { usn: "4PM23CS038", name: "HARSHA D. P." },
  { usn: "4PM23CS049", name: "K V SRUJANA SREE" },
  { usn: "4PM23CS062", name: "MOHAMMED MAAZ F." },
  { usn: "4PM23CS072", name: "POOJA S." },
  { usn: "4PM23CS078", name: "PRASHANTH C." },
  { usn: "4PM23CS084", name: "RAMYA VIJAYKUMAR KATTI" },
  { usn: "4PM23CS085", name: "RANJITH T. H." },
  { usn: "4PM23CS086", name: "ROHITH D. K." },
  { usn: "4PM23CS089", name: "SAHANA H. M." },
  { usn: "4PM23CS098", name: "SHASHANK V. S." },
  { usn: "4PM23CS107", name: "SRUSHTI M. V." },
  { usn: "4PM23CS110", name: "SUSHMA MARUTI JADHAV" },
  { usn: "4PM23CS122", name: "VIKAS U. G." },
  { usn: "4PM24CS405", name: "NIKITA HUBLIKAR" },
  { usn: "4PM23EC064", name: "MONIKA R." },
  { usn: "4PM23EC079", name: "RASHMI P." },
  { usn: "4PM23EC080", name: "RISHI N. SIRSATE" },
  { usn: "4PM23EC089", name: "SAFAQAIN UNNISA" },
  { usn: "4PM24EC404", name: "N. K. GOWTHAM" },
  { usn: "4PM23EE005", name: "BHOOMIKA V. YATTINAHALLI" },
  { usn: "4PM23IS002", name: "AMULYA H." },
  { usn: "4PM23IS011", name: "DHANUSH" },
  { usn: "4PM24IS020", name: "KARTHIK R." },
  { usn: "4PM23IS024", name: "LAVANYA P." },
  { usn: "4PM23IS026", name: "MANISH P. GUTTI" },
  { usn: "4PM23IS031", name: "MAYUR H. R." },
  { usn: "4PM23IS035", name: "NAMAN P." },
  { usn: "4PM23IS036", name: "PAVITHRA N. K." },
  { usn: "4PM23IS047", name: "REETHU" },
  { usn: "4PM24IS401", name: "LIKHITHA U. M." },
  { usn: "4PM24IS402", name: "MALA N." },
  { usn: "4PM24IS404", name: "SANIYA BLESSY" },
  { usn: "4PM24IS405", name: "THANUA." },
  { usn: "4PM23IS006", name: "BHARATH A. N." },
];

async function run() {
  console.log("=== GIS Multi-Subject Setup ===\n");

  // ---- Step 1: Create teacher auth user ----
  console.log("1. Creating teacher: harish.kumar@teacher.com ...");
  try {
    const { data: newUser, error: userErr } = await supabase.auth.admin.createUser({
      email: "harish.kumar@teacher.com",
      password: "Teacher@123",
      email_confirm: true,
    });
    if (userErr) {
      if (userErr.message.includes("already been registered")) {
        console.log("   Already exists — OK\n");
      } else {
        console.log("   Error:", userErr.message, "\n");
      }
    } else {
      console.log("   Created:", newUser.user.email, "\n");
    }
  } catch (e) {
    console.log("   Network error on auth — will retry later\n");
  }

  // ---- Step 2: Check subject_slug column ----
  console.log("2. Checking subject_slug column ...");
  const { error: colErr } = await supabase
    .from("students")
    .select("subject_slug")
    .limit(1);

  if (colErr && colErr.message.includes("subject_slug")) {
    console.log("   Column missing! Please run in Supabase SQL Editor:");
    console.log("   ALTER TABLE students ADD COLUMN subject_slug TEXT DEFAULT 'cloud-computing';");
    console.log("   UPDATE students SET subject_slug = 'cloud-computing' WHERE subject_slug IS NULL;");
    console.log("   Then re-run this script.\n");
    return;
  }
  console.log("   Column exists — OK\n");

  // ---- Step 3: Set existing students to cloud-computing ----
  console.log("3. Tagging existing students as cloud-computing ...");
  const { error: tagErr } = await supabase
    .from("students")
    .update({ subject_slug: "cloud-computing" })
    .is("subject_slug", null);
  if (tagErr) {
    console.log("   Warning:", tagErr.message);
  } else {
    console.log("   Done\n");
  }

  // ---- Step 4: Insert GIS students ----
  console.log("4. Inserting", GIS_STUDENTS.length, "GIS students ...");

  let inserted = 0;
  let skipped = 0;
  const errors = [];

  for (const student of GIS_STUDENTS) {
    // Check if already exists for this subject
    const { data: existing } = await supabase
      .from("students")
      .select("id")
      .eq("usn", student.usn)
      .eq("subject_slug", "gis")
      .single();

    if (existing) {
      skipped++;
      continue;
    }

    const { error } = await supabase
      .from("students")
      .insert({
        usn: student.usn,
        name: student.name,
        subject_slug: "gis",
      });

    if (error) {
      errors.push({ usn: student.usn, error: error.message });
    } else {
      inserted++;
    }
  }

  console.log(`   Inserted: ${inserted}`);
  console.log(`   Skipped (already exist): ${skipped}`);
  if (errors.length > 0) {
    console.log(`   Errors: ${errors.length}`);
    errors.forEach((e) => console.log(`     ${e.usn}: ${e.error}`));
  }

  // ---- Step 5: Verify ----
  console.log("\n5. Verification ...");
  const { data: ccStudents } = await supabase
    .from("students")
    .select("id")
    .eq("subject_slug", "cloud-computing");
  const { data: gisStudents } = await supabase
    .from("students")
    .select("id")
    .eq("subject_slug", "gis");

  console.log(`   Cloud Computing students: ${ccStudents?.length || 0}`);
  console.log(`   GIS students: ${gisStudents?.length || 0}`);
  console.log("\n=== Done! ===");
}

run().catch(console.error);
