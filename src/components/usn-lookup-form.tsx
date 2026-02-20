"use client";

import { useState } from "react";

const TEST_LABELS: Record<string, string> = {
  MT1: "Module Test 1",
  MT2: "Module Test 2",
  MT3: "Module Test 3",
  MT4: "Module Test 4",
  MT5: "Module Test 5",
  IT1: "Internal Test 1",
  IT2: "Internal Test 2",
};

interface MarkResult {
  student: { usn: string; name: string };
  marks: { id: string; subject: string; marks: number; updated_at: string }[];
}

export default function UsnLookupForm() {
  const [usn, setUsn] = useState("");
  const [result, setResult] = useState<MarkResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);

    const trimmed = usn.trim().toUpperCase();
    if (trimmed.length < 3) {
      setError("USN must be at least 3 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/marks/${encodeURIComponent(trimmed)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setResult(data);
    } catch {
      setError("Failed to fetch marks. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Build marks map from result
  const marksMap: Record<string, number> = {};
  result?.marks?.forEach((m) => {
    marksMap[m.subject] = m.marks;
  });

  const moduleTests = ["MT1", "MT2", "MT3", "MT4", "MT5"];
  const internalTests = ["IT1", "IT2"];
  const hasMarks = result && result.marks.length > 0;

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="usn" className="block text-sm font-medium text-gray-600 mb-1.5">
            Enter your USN
          </label>
          <input
            id="usn"
            type="text"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            placeholder="e.g. 4SF22CS001"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all text-gray-800 placeholder:text-gray-300"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-md shadow-blue-200/50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Looking up...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              View Marks
            </>
          )}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-white/80 backdrop-blur border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {/* Student Header */}
          <div className="bg-blue-600 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                {result.student.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">{result.student.name}</h3>
                <p className="text-blue-200 text-sm font-mono">{result.student.usn}</p>
              </div>
            </div>
          </div>

          <div className="p-5">
            {!hasMarks ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-3-3v6" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">No marks recorded yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Module Tests */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Module Tests</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {moduleTests.map((key) => {
                      const val = marksMap[key];
                      const hasVal = val !== undefined;
                      return (
                        <div key={key} className={`rounded-xl p-3 text-center ${hasVal ? "bg-blue-50 border border-blue-100" : "bg-gray-50 border border-gray-100"}`}>
                          <p className="text-xs font-semibold text-gray-400 mb-1">{key}</p>
                          {hasVal ? (
                            <p className="text-xl font-bold text-blue-700">{val}</p>
                          ) : (
                            <p className="text-xl font-bold text-gray-300">—</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Internal Tests */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Internal Tests</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {internalTests.map((key) => {
                      const val = marksMap[key];
                      const hasVal = val !== undefined;
                      return (
                        <div key={key} className={`rounded-xl p-3 text-center ${hasVal ? "bg-sky-50 border border-sky-100" : "bg-gray-50 border border-gray-100"}`}>
                          <p className="text-xs font-semibold text-gray-400 mb-1">{TEST_LABELS[key]}</p>
                          {hasVal ? (
                            <p className="text-2xl font-bold text-sky-700">{val}</p>
                          ) : (
                            <p className="text-2xl font-bold text-gray-300">—</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Summary */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Tests completed</span>
                  <span className="text-sm font-bold text-gray-700">
                    {Object.keys(marksMap).length} / 7
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
