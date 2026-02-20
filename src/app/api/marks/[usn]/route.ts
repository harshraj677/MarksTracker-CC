import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

  return NextResponse.json({
    student: {
      usn: student.usn,
      name: student.name,
    },
    marks: marks || [],
  });
}
