import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ usn: string }> }
) {
  const { usn } = await params;

  if (!usn || usn.length < 3) {
    return NextResponse.json(
      { error: "Invalid USN" },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  // Find student by USN
  const { data: student, error: studentError } = await supabase
    .from("students")
    .select("id, usn, name")
    .eq("usn", usn.toUpperCase())
    .single();

  if (studentError || !student) {
    return NextResponse.json(
      { error: "No student found with this USN" },
      { status: 404 }
    );
  }

  // Get marks for this student
  const { data: marks, error: marksError } = await supabase
    .from("marks")
    .select("id, subject, marks, updated_at")
    .eq("student_id", student.id)
    .order("subject", { ascending: true });

  if (marksError) {
    return NextResponse.json(
      { error: "Failed to fetch marks" },
      { status: 500 }
    );
  }

  // Compute class rank for each test the student has marks in
  const studentMarks = marks || [];
  const testKeys = studentMarks.map((m) => m.subject);

  const ranks: Record<string, { rank: number; total: number }> = {};

  if (testKeys.length > 0) {
    // Fetch all marks for the tests this student participated in
    const { data: allMarks } = await supabase
      .from("marks")
      .select("student_id, subject, marks")
      .in("subject", testKeys);

    if (allMarks) {
      // Group marks by test (subject)
      const byTest: Record<string, number[]> = {};
      for (const m of allMarks) {
        if (!byTest[m.subject]) byTest[m.subject] = [];
        byTest[m.subject].push(m.marks);
      }

      // Calculate rank for each test
      for (const sm of studentMarks) {
        const scores = byTest[sm.subject] || [];
        // Sort descending — higher marks = better rank
        scores.sort((a, b) => b - a);
        const rank = scores.indexOf(sm.marks) + 1;
        ranks[sm.subject] = { rank, total: scores.length };
      }
    }
  }

  // Compute overall average rank
  const rankValues = Object.values(ranks);
  const avgRank = rankValues.length > 0
    ? Math.round(rankValues.reduce((sum, r) => sum + r.rank, 0) / rankValues.length)
    : null;
  const avgTotal = rankValues.length > 0
    ? Math.round(rankValues.reduce((sum, r) => sum + r.total, 0) / rankValues.length)
    : null;

  return NextResponse.json({
    student: {
      usn: student.usn,
      name: student.name,
    },
    marks: studentMarks,
    ranks,
    overallRank: avgRank !== null ? { rank: avgRank, total: avgTotal } : null,
  });
}
