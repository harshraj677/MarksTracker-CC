"use client";

import { useState, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import { bulkSaveMarks, saveSingleMark, deleteSingleMark } from "@/actions/marks";
import { TEST_TYPES, type TestKey } from "@/lib/test-config";

interface Student {
  id: string;
  usn: string;
  name: string;
}

interface BulkMarkTableProps {
  students: Student[];
  existingMarks: Record<string, Record<string, number>>; // student_id -> { testKey -> marks }
}

export default function BulkMarkTable({ students, existingMarks }: BulkMarkTableProps) {
  const router = useRouter();

  const [marksMap, setMarksMap] = useState<Record<string, Record<string, string>>>(() => {
    const initial: Record<string, Record<string, string>> = {};
    for (const s of students) {
      initial[s.id] = {};
      for (const t of TEST_TYPES) {
        initial[s.id][t.key] = existingMarks[s.id]?.[t.key] !== undefined
          ? String(existingMarks[s.id][t.key])
          : "";
      }
    }
    return initial;
  });

  // Track which cells are being saved/deleted individually
  const [cellStates, setCellStates] = useState<Record<string, "saving" | "deleting" | "saved" | "deleted" | "error" | null>>({});

  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [activeTest, setActiveTest] = useState<TestKey>("MT1");

  const cellKey = (studentId: string, testKey: string) => `${studentId}_${testKey}`;

  function handleChange(studentId: string, testKey: string, value: string) {
    setMarksMap((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], [testKey]: value },
    }));
    setFeedback(null);
    // Clear cell state when user edits
    setCellStates((prev) => ({ ...prev, [cellKey(studentId, testKey)]: null }));
  }

  // Save individual cell
  const handleSaveCell = useCallback(async (studentId: string, testKey: string) => {
    const val = marksMap[studentId]?.[testKey]?.trim();
    if (!val) return;
    const num = Number(val);
    if (isNaN(num) || num < 0 || num > 100) return;

    const key = cellKey(studentId, testKey);
    setCellStates((prev) => ({ ...prev, [key]: "saving" }));

    const result = await saveSingleMark(studentId, testKey, num);
    setCellStates((prev) => ({ ...prev, [key]: result.success ? "saved" : "error" }));

    if (result.success) {
      router.refresh(); // Live refresh from DB
      setTimeout(() => setCellStates((prev) => ({ ...prev, [key]: null })), 2000);
    }
  }, [marksMap, router]);

  // Delete individual cell
  const handleDeleteCell = useCallback(async (studentId: string, testKey: string) => {
    const key = cellKey(studentId, testKey);
    setCellStates((prev) => ({ ...prev, [key]: "deleting" }));

    const result = await deleteSingleMark(studentId, testKey);
    if (result.success) {
      setMarksMap((prev) => ({
        ...prev,
        [studentId]: { ...prev[studentId], [testKey]: "" },
      }));
      setCellStates((prev) => ({ ...prev, [key]: "deleted" }));
      router.refresh(); // Live refresh from DB
      setTimeout(() => setCellStates((prev) => ({ ...prev, [key]: null })), 2000);
    } else {
      setCellStates((prev) => ({ ...prev, [key]: "error" }));
    }
  }, [router]);

  function handleSaveAll() {
    const entries: { student_id: string; test_key: string; marks: number }[] = [];
    for (const s of students) {
      for (const t of TEST_TYPES) {
        const val = marksMap[s.id]?.[t.key]?.trim();
        if (val !== "" && val !== undefined) {
          const num = Number(val);
          if (!isNaN(num) && num >= 0 && num <= 100) {
            entries.push({ student_id: s.id, test_key: t.key, marks: num });
          }
        }
      }
    }

    if (entries.length === 0) {
      setFeedback({ success: false, message: "No valid marks to save" });
      return;
    }

    startTransition(async () => {
      const result = await bulkSaveMarks(entries);
      setFeedback(result);
      if (result.success) router.refresh(); // Live refresh from DB
    });
  }

  const activeFilledCount = students.filter((s) => {
    const val = marksMap[s.id]?.[activeTest]?.trim();
    return val !== "" && val !== undefined;
  }).length;

  const totalFilled = students.reduce((acc, s) => {
    return acc + TEST_TYPES.filter((t) => {
      const val = marksMap[s.id]?.[t.key]?.trim();
      return val !== "" && val !== undefined;
    }).length;
  }, 0);

  const totalPossible = students.length * TEST_TYPES.length;

  return (
    <div>
      {/* Test Type Tabs */}
      <div className="px-4 sm:px-6 py-3 border-b border-gray-100 bg-gray-50/50">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {TEST_TYPES.map((t) => {
            const isActive = activeTest === t.key;
            const isModuleTest = t.key.startsWith("MT");
            const filledForTest = students.filter((s) => {
              const val = marksMap[s.id]?.[t.key]?.trim();
              return val !== "" && val !== undefined;
            }).length;

            return (
              <button
                key={t.key}
                onClick={() => setActiveTest(t.key)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all relative ${
                  isActive
                    ? isModuleTest
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "bg-sky-500 text-white shadow-md shadow-sky-200"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {t.short}
                {filledForTest > 0 && (
                  <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20" : "bg-gray-100"
                  }`}>
                    {filledForTest}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Save All Bar */}
      <div className="px-4 sm:px-6 py-3 border-b border-gray-100 bg-blue-50/40 flex items-center justify-between flex-wrap gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="text-xs sm:text-sm text-gray-500">
            <span className="font-semibold text-blue-600">{activeFilledCount}</span>
            <span className="text-gray-400">/{students.length}</span>
            <span className="ml-1 text-gray-400">{activeTest}</span>
          </div>
          <div className="text-xs text-gray-400 border-l border-gray-200 pl-4">
            Total: <span className="font-medium text-gray-600">{totalFilled}</span>/{totalPossible}
          </div>
          {feedback && (
            <span className={`text-xs sm:text-sm font-medium px-3 py-1 rounded-full ${
              feedback.success ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
            }`}>
              {feedback.success ? "\u2713" : "\u2717"} {feedback.message}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleSaveAll}
          disabled={isPending || totalFilled === 0}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all shadow-md shadow-blue-200/50 flex items-center gap-2 text-xs sm:text-sm"
        >
          {isPending ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving All...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save All Marks
            </>
          )}
        </button>
      </div>

      {/* Active Test Label */}
      <div className="px-4 sm:px-6 py-2 bg-white border-b border-gray-100">
        <p className="text-xs sm:text-sm font-medium text-gray-700">
          Entering marks for:{" "}
          <span className="text-blue-600 font-bold">
            {TEST_TYPES.find((t) => t.key === activeTest)?.label}
          </span>
          <span className="text-gray-400 ml-2 text-xs">(Save individually or use Save All)</span>
        </p>
      </div>

      {/* Legend */}
      <div className="px-4 sm:px-6 py-2 bg-gray-50/50 border-b border-gray-100 flex flex-wrap gap-4 text-[10px] sm:text-xs text-gray-400">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> Saved in DB</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Unsaved</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-gray-200 inline-block" /> Empty</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-gray-50/80 text-left">
              <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-10 sm:w-12">#</th>
              <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">USN</th>
              <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Student Name</th>
              {TEST_TYPES.map((t) => (
                <th
                  key={t.key}
                  className={`px-1.5 py-3 text-xs font-semibold uppercase tracking-wider text-center w-12 cursor-pointer transition-colors ${
                    activeTest === t.key
                      ? "text-blue-600 bg-blue-50/50"
                      : "text-gray-300 hover:text-gray-500"
                  }`}
                  onClick={() => setActiveTest(t.key)}
                  title={t.label}
                >
                  {t.short}
                </th>
              ))}
              <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs font-semibold text-blue-600 uppercase tracking-wider text-center w-28 sm:w-36">
                {activeTest}
              </th>
              <th className="px-2 py-2.5 sm:py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map((student, index) => {
              const activeVal = marksMap[student.id]?.[activeTest]?.trim() ?? "";
              const num = Number(activeVal);
              const isFilled = activeVal !== "";
              const isValid = isFilled && !isNaN(num) && num >= 0 && num <= 100;
              const key = cellKey(student.id, activeTest);
              const state = cellStates[key];
              const hasSavedInDb = existingMarks[student.id]?.[activeTest] !== undefined;

              return (
                <tr
                  key={student.id}
                  className={`transition-colors ${
                    state === "saved" ? "bg-emerald-50/40" :
                    state === "deleted" ? "bg-red-50/30" :
                    isFilled ? "bg-blue-50/30" : "hover:bg-gray-50/50"
                  }`}
                >
                  <td className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-300 font-mono">{index + 1}</td>
                  <td className="px-3 sm:px-4 py-2 sm:py-2.5">
                    <span className="text-[10px] sm:text-xs font-mono text-blue-600 bg-blue-50 px-1 sm:px-1.5 py-0.5 rounded">
                      {student.usn}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-800 truncate max-w-[120px] sm:max-w-[180px]">
                    {student.name}
                  </td>
                  {TEST_TYPES.map((t) => {
                    const val = marksMap[student.id]?.[t.key]?.trim() ?? "";
                    const hasMark = val !== "";
                    const hasSaved = existingMarks[student.id]?.[t.key] !== undefined;
                    return (
                      <td key={t.key} className="px-1.5 py-2.5 text-center">
                        {hasSaved ? (
                          <span className="inline-block w-3 h-3 rounded-full bg-emerald-400" title={`${t.short}: ${val || existingMarks[student.id]?.[t.key]}`} />
                        ) : hasMark ? (
                          <span className="inline-block w-3 h-3 rounded-full bg-amber-400" title={`${t.short}: ${val} (unsaved)`} />
                        ) : (
                          <span className="inline-block w-3 h-3 rounded-full bg-gray-200" title={`${t.short}: not entered`} />
                        )}
                      </td>
                    );
                  })}
                  <td className="px-3 sm:px-4 py-2 sm:py-2.5 text-center">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={marksMap[student.id]?.[activeTest] ?? ""}
                      onChange={(e) => handleChange(student.id, activeTest, e.target.value)}
                      placeholder="0\u2013100"
                      className={`w-16 sm:w-20 px-1.5 sm:px-2 py-1 sm:py-1.5 border rounded-lg text-xs sm:text-sm text-center font-mono transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isFilled && !isValid
                          ? "border-red-300 bg-red-50"
                          : isFilled
                            ? "border-blue-200 bg-blue-50/50"
                            : "border-gray-200 bg-gray-50/50"
                      }`}
                    />
                  </td>
                  <td className="px-2 py-2 sm:py-2.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {/* Save single */}
                      <button
                        type="button"
                        onClick={() => handleSaveCell(student.id, activeTest)}
                        disabled={!isFilled || !isValid || state === "saving"}
                        title="Save this mark"
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                      >
                        {state === "saving" ? (
                          <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                        ) : state === "saved" ? (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        )}
                      </button>
                      {/* Delete single */}
                      <button
                        type="button"
                        onClick={() => handleDeleteCell(student.id, activeTest)}
                        disabled={!hasSavedInDb || state === "deleting"}
                        title="Delete this mark from DB"
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-red-50 text-red-500 hover:bg-red-100"
                      >
                        {state === "deleting" ? (
                          <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                        ) : state === "deleted" ? (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
