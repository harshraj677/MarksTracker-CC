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
  ranks: Record<string, { rank: number; total: number }>;
  overallRank: { rank: number; total: number } | null;
}

function getRankBadgeColor(rank: number, total: number) {
  const pct = ((total - rank + 1) / total) * 100;
  if (rank === 1) return "bg-yellow-400 text-yellow-900"; // Gold for 1st
  if (rank === 2) return "bg-gray-300 text-gray-800"; // Silver for 2nd
  if (rank === 3) return "bg-amber-600 text-white"; // Bronze for 3rd
  if (pct >= 75) return "bg-emerald-100 text-emerald-700";
  if (pct >= 50) return "bg-blue-100 text-blue-700";
  if (pct >= 25) return "bg-orange-100 text-orange-700";
  return "bg-red-100 text-red-700";
}

function RankBadge({ rank, total }: { rank: number; total: number }) {
  const color = getRankBadgeColor(rank, total);
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${color}`}>
      #{rank}
      <span className="font-normal opacity-70">/{total}</span>
    </span>
  );
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

  // Calculate average marks
  const totalMarks = result?.marks?.reduce((sum, m) => sum + m.marks, 0) ?? 0;
  const avgMarks = result?.marks?.length ? Math.round(totalMarks / result.marks.length) : 0;

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
            placeholder="e.g. 4PM23CS001"
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
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 sm:px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold flex-shrink-0">
                {result.student.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-base sm:text-lg leading-tight truncate">{result.student.name}</h3>
                <p className="text-blue-200 text-xs sm:text-sm font-mono">{result.student.usn}</p>
              </div>
            </div>

            {/* Overall Rank & Average - shown in header */}
            {hasMarks && (
              <div className="mt-3 flex items-center gap-3 pt-3 border-t border-white/20">
                {result.overallRank && (
                  <div className="flex items-center gap-1.5 bg-white/15 rounded-lg px-3 py-1.5">
                    <svg className="w-3.5 h-3.5 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-xs font-bold">Avg Rank #{result.overallRank.rank}</span>
                    <span className="text-xs text-blue-200">/{result.overallRank.total}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 bg-white/15 rounded-lg px-3 py-1.5">
                  <span className="text-xs text-blue-200">Avg:</span>
                  <span className="text-xs font-bold">{avgMarks}/100</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 sm:p-5">
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
                  <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Module Tests</h4>
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {moduleTests.map((key) => {
                      const val = marksMap[key];
                      const hasVal = val !== undefined;
                      const rankInfo = result.ranks?.[key];
                      return (
                        <div key={key} className={`rounded-xl p-2 sm:p-3 text-center relative ${hasVal ? "bg-blue-50 border border-blue-100" : "bg-gray-50 border border-gray-100"}`}>
                          <p className="text-[10px] sm:text-xs font-semibold text-gray-400 mb-0.5">{key}</p>
                          {hasVal ? (
                            <>
                              <p className="text-lg sm:text-xl font-bold text-blue-700">{val}</p>
                              {rankInfo && (
                                <div className="mt-1">
                                  <RankBadge rank={rankInfo.rank} total={rankInfo.total} />
                                </div>
                              )}
                            </>
                          ) : (
                            <p className="text-lg sm:text-xl font-bold text-gray-300">&mdash;</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Internal Tests */}
                <div>
                  <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Internal Tests</h4>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                    {internalTests.map((key) => {
                      const val = marksMap[key];
                      const hasVal = val !== undefined;
                      const rankInfo = result.ranks?.[key];
                      return (
                        <div key={key} className={`rounded-xl p-3 text-center ${hasVal ? "bg-sky-50 border border-sky-100" : "bg-gray-50 border border-gray-100"}`}>
                          <p className="text-[10px] sm:text-xs font-semibold text-gray-400 mb-0.5">{TEST_LABELS[key]}</p>
                          {hasVal ? (
                            <>
                              <p className="text-2xl font-bold text-sky-700">{val}</p>
                              {rankInfo && (
                                <div className="mt-1.5">
                                  <RankBadge rank={rankInfo.rank} total={rankInfo.total} />
                                </div>
                              )}
                            </>
                          ) : (
                            <p className="text-2xl font-bold text-gray-300">&mdash;</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Summary Footer */}
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-500">Tests completed</span>
                    <span className="text-xs sm:text-sm font-bold text-gray-700">
                      {Object.keys(marksMap).length} / 7
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-500">Average marks</span>
                    <span className="text-xs sm:text-sm font-bold text-blue-600">{avgMarks} / 100</span>
                  </div>
                  {result.overallRank && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-500">Average class rank</span>
                      <span className="text-xs sm:text-sm font-bold">
                        <RankBadge rank={result.overallRank.rank} total={result.overallRank.total} />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
