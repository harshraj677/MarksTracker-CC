import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BulkMarkTable from "@/components/bulk-mark-table";
import LogoutButton from "@/components/logout-button";
import { TEST_TYPES, SUBJECT_NAME, TEACHER_NAME } from "@/lib/test-config";
import type { Student, Mark } from "@/lib/types";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/teacher/login");

  const { data: students } = await supabase
    .from("students")
    .select("*")
    .order("usn", { ascending: true });

  const { data: marks } = await supabase
    .from("marks")
    .select("*");

  // Map: student_id -> { testKey -> marks }
  const marksByStudent: Record<string, Record<string, number>> = {};
  (marks || []).forEach((mark: Mark) => {
    if (!marksByStudent[mark.student_id]) {
      marksByStudent[mark.student_id] = {};
    }
    marksByStudent[mark.student_id][mark.subject] = mark.marks;
  });

  const totalStudents = (students || []).length;

  // Count how many students have ALL 7 tests filled
  const fullyMarked = (students || []).filter((s: Student) => {
    const sm = marksByStudent[s.id];
    if (!sm) return false;
    return TEST_TYPES.every((t) => sm[t.key] !== undefined);
  }).length;

  // Count total individual marks entered
  const totalMarksEntered = (marks || []).length;
  const totalPossible = totalStudents * TEST_TYPES.length;

  const studentList = (students || []).map((s: Student) => ({
    id: s.id,
    usn: s.usn,
    name: s.name,
  }));

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">{SUBJECT_NAME}</h1>
              <p className="text-gray-500 text-sm">{TEACHER_NAME}</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Students</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600">{fullyMarked}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Fully Graded</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-600">{TEST_TYPES.length}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Tests</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">
                  {totalMarksEntered}<span className="text-sm font-normal text-gray-400">/{totalPossible}</span>
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Marks Entered</p>
              </div>
            </div>
          </div>
        </div>

        {/* Test Legend */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span className="text-gray-500 font-medium">Tests:</span>
            <div className="flex flex-wrap gap-3">
              {TEST_TYPES.map((t) => (
                <span key={t.key} className={`px-3 py-1 rounded-full text-xs font-medium ${
                  t.key.startsWith("MT")
                    ? "bg-blue-50 text-blue-600"
                    : "bg-sky-50 text-sky-600"
                }`}>
                  {t.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Students Table with Save All */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 text-lg">Student Marks</h2>
            <p className="text-gray-400 text-sm mt-0.5">
              Select a test tab, enter marks (0–100), then click <strong className="text-gray-600">Save All Marks</strong> to save everything at once
            </p>
          </div>

          {(!students || students.length === 0) ? (
            <p className="text-gray-400 text-sm p-6">No students found.</p>
          ) : (
            <BulkMarkTable students={studentList} existingMarks={marksByStudent} />
          )}
        </section>
      </div>
    </main>
  );
}
