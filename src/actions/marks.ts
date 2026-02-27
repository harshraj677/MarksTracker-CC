"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { studentSchema, markSchema } from "@/lib/validators";
import type { ActionResponse } from "@/lib/types";
import { getAllSlugs } from "@/lib/subjects";

function revalidateAllPaths() {
  for (const slug of getAllSlugs()) {
    revalidatePath(`/${slug}/teacher/dashboard`);
    revalidatePath(`/${slug}/student`);
  }
}

// ---------- STUDENT ACTIONS ----------

export async function addStudent(formData: FormData, slug: string): Promise<ActionResponse> {
  const raw = {
    usn: formData.get("usn") as string,
    name: formData.get("name") as string,
  };

  const parsed = studentSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }

  const supabase = await createClient();

  // Check auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  // Check if USN already exists for this subject
  const { data: existing } = await supabase
    .from("students")
    .select("id")
    .eq("usn", parsed.data.usn)
    .eq("subject_slug", slug)
    .single();

  if (existing) {
    return { success: false, message: "A student with this USN already exists in this subject" };
  }

  const { error } = await supabase
    .from("students")
    .insert({ usn: parsed.data.usn, name: parsed.data.name, subject_slug: slug });

  if (error) {
    return { success: false, message: "Failed to add student. Please try again." };
  }

  revalidateAllPaths();
  return { success: true, message: "Student added successfully" };
}

export async function deleteStudent(studentId: string): Promise<ActionResponse> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", studentId);

  if (error) {
    return { success: false, message: "Failed to delete student" };
  }

  revalidateAllPaths();
  return { success: true, message: "Student deleted successfully" };
}

// ---------- MARK ACTIONS ----------

export async function addOrUpdateMark(formData: FormData): Promise<ActionResponse> {
  const raw = {
    student_id: formData.get("student_id") as string,
    subject: (formData.get("subject") as string) || "CloudComputing",
    marks: Number(formData.get("marks")),
  };

  const parsed = markSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  // Check if a mark already exists for this student + subject
  const { data: existing } = await supabase
    .from("marks")
    .select("id")
    .eq("student_id", parsed.data.student_id)
    .eq("subject", parsed.data.subject)
    .single();

  if (existing) {
    // Update existing mark
    const { error } = await supabase
      .from("marks")
      .update({ marks: parsed.data.marks, updated_at: new Date().toISOString() })
      .eq("id", existing.id);

    if (error) {
      return { success: false, message: "Failed to update marks" };
    }

    revalidateAllPaths();
    return { success: true, message: "Marks updated successfully" };
  }

  // Insert new mark
  const { error } = await supabase
    .from("marks")
    .insert({
      student_id: parsed.data.student_id,
      subject: parsed.data.subject,
      marks: parsed.data.marks,
    });

  if (error) {
    return { success: false, message: "Failed to add marks" };
  }

  revalidateAllPaths();
  return { success: true, message: "Marks added successfully" };
}

// ---------- SINGLE MARK SAVE (for individual cell) ----------

export async function saveSingleMark(
  studentId: string,
  testKey: string,
  marks: number
): Promise<ActionResponse> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: "Unauthorized" };

  if (marks < 0 || marks > 100 || isNaN(marks)) {
    return { success: false, message: "Marks must be 0–100" };
  }

  const { data: existing } = await supabase
    .from("marks")
    .select("id")
    .eq("student_id", studentId)
    .eq("subject", testKey)
    .single();

  if (existing) {
    const { error } = await supabase
      .from("marks")
      .update({ marks, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
    if (error) return { success: false, message: "Failed to update" };
  } else {
    const { error } = await supabase
      .from("marks")
      .insert({ student_id: studentId, subject: testKey, marks });
    if (error) return { success: false, message: "Failed to save" };
  }

  revalidateAllPaths();
  return { success: true, message: "Saved" };
}

// ---------- DELETE SINGLE MARK ----------

export async function deleteSingleMark(
  studentId: string,
  testKey: string
): Promise<ActionResponse> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: "Unauthorized" };

  const { error } = await supabase
    .from("marks")
    .delete()
    .eq("student_id", studentId)
    .eq("subject", testKey);

  if (error) return { success: false, message: "Failed to delete mark" };

  revalidateAllPaths();
  return { success: true, message: "Mark deleted" };
}

// ---------- BULK MARK SAVE ----------

export async function bulkSaveMarks(
  entries: { student_id: string; test_key: string; marks: number }[]
): Promise<ActionResponse> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: "Unauthorized" };
  }

  if (!entries.length) {
    return { success: false, message: "No marks to save" };
  }

  let saved = 0;

  for (const entry of entries) {
    if (entry.marks < 0 || entry.marks > 100 || isNaN(entry.marks)) continue;

    const { data: existing } = await supabase
      .from("marks")
      .select("id")
      .eq("student_id", entry.student_id)
      .eq("subject", entry.test_key)
      .single();

    if (existing) {
      await supabase
        .from("marks")
        .update({ marks: entry.marks, updated_at: new Date().toISOString() })
        .eq("id", existing.id);
    } else {
      await supabase
        .from("marks")
        .insert({
          student_id: entry.student_id,
          subject: entry.test_key,
          marks: entry.marks,
        });
    }
    saved++;
  }

  revalidateAllPaths();
  return { success: true, message: `Saved ${saved} mark${saved !== 1 ? "s" : ""} successfully` };
}
