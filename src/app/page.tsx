import Link from "next/link";
import { SUBJECTS } from "@/lib/subjects";

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-50 rounded-full translate-y-1/2 -translate-x-1/3" />

      {/* Nav */}
      <nav className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold text-gray-900 leading-tight tracking-tight">Marks<span className="text-blue-600">Tracker</span></span>
            <span className="text-[9px] sm:text-[10px] font-medium text-gray-400 uppercase tracking-widest leading-none">Test Management</span>
          </div>
        </Link>
      </nav>

      {/* Hero */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-8 sm:pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            {SUBJECTS.length} Subjects &middot; {SUBJECTS.length} Teachers
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-4 sm:mb-6">
            Test Management
            <span className="block text-blue-600">System</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-8 sm:mb-12 max-w-xl mx-auto">
            Choose your subject below. Teachers grade marks, students check results instantly — all in one place.
          </p>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {SUBJECTS.map((subject) => {
            const isBlue = subject.color === "blue";
            return (
              <div
                key={subject.slug}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow group"
              >
                {/* Subject Header */}
                <div className={`px-5 sm:px-6 py-4 sm:py-5 ${isBlue ? "bg-gradient-to-r from-blue-600 to-blue-500" : "bg-gradient-to-r from-emerald-600 to-emerald-500"} text-white`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      {subject.icon === "cloud" ? (
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-bold text-lg sm:text-xl leading-tight truncate">{subject.name}</h2>
                      <p className="text-white/70 text-xs sm:text-sm font-mono">{subject.code}</p>
                    </div>
                  </div>
                </div>

                {/* Subject Body */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-8 h-8 rounded-full ${isBlue ? "bg-blue-100" : "bg-emerald-100"} flex items-center justify-center text-xs font-bold ${isBlue ? "text-blue-600" : "text-emerald-600"}`}>
                      {subject.teacherName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{subject.teacherName}</p>
                      <p className="text-xs text-gray-400">Faculty</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-500 mb-5">{subject.description}</p>

                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-5">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                      7 Tests
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      MT1-MT5 + IT1-IT2
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <Link
                      href={`/${subject.slug}/teacher/login`}
                      className={`flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all shadow-md hover:-translate-y-0.5 transform ${
                        isBlue
                          ? "bg-blue-600 hover:bg-blue-700 shadow-blue-200/50"
                          : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200/50"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                      </svg>
                      Teacher
                    </Link>
                    <Link
                      href={`/${subject.slug}/student`}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all hover:-translate-y-0.5 transform"
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                      Student
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Feature Bar */}
      <div className="relative z-10 border-t border-gray-100 bg-gray-50/50 mt-4 sm:mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">5 Module Tests</p>
                <p className="text-xs text-gray-400 mt-0.5">MT1 through MT5 for continuous assessment</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">2 Internal Tests</p>
                <p className="text-xs text-gray-400 mt-0.5">IT1 &amp; IT2 for comprehensive evaluation</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Multi-Subject</p>
                <p className="text-xs text-gray-400 mt-0.5">Each subject has its own teacher &amp; students</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
