import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-50 rounded-full translate-y-1/2 -translate-x-1/3" />

      {/* Nav */}
      <nav className="relative z-10 max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-900">CloudTest</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/student" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors px-4 py-2">
            Student Lookup
          </Link>
          <Link href="/teacher/login" className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors px-5 py-2.5 rounded-lg shadow-sm">
            Teacher Login
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Cloud Computing &middot; Sanketh Gujjar U
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6">
              Test Management
              <span className="block text-blue-600">System</span>
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
              Manage marks for 5 Module Tests and 2 Internal Tests seamlessly. Teachers grade, students check results instantly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/teacher/login"
                className="group bg-blue-600 text-white px-7 py-3.5 rounded-xl hover:bg-blue-700 transition-all text-base font-semibold shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 transform flex items-center gap-2.5"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                </svg>
                Teacher Login
              </Link>
              <Link
                href="/student"
                className="group text-gray-700 bg-gray-100 px-7 py-3.5 rounded-xl hover:bg-gray-200 transition-all text-base font-semibold hover:-translate-y-0.5 transform flex items-center gap-2.5"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                Student Lookup
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                Secure
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Realtime
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg>
                Cloud
              </span>
            </div>
          </div>

          {/* Right - Test Cards */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/60 border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Cloud Computing</p>
                    <p className="text-xs text-gray-400">7 Tests &middot; 100 marks each</p>
                  </div>
                </div>

                {/* Module Tests Grid */}
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Module Tests</p>
                <div className="grid grid-cols-5 gap-2 mb-5">
                  {["MT1", "MT2", "MT3", "MT4", "MT5"].map((t, i) => (
                    <div key={t} className="bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
                      <p className="text-xs font-bold text-blue-400 mb-1">{t}</p>
                      <p className="text-xl font-extrabold text-blue-700">{[85, 92, 78, 88, 95][i]}</p>
                    </div>
                  ))}
                </div>

                {/* Internal Tests */}
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Internal Tests</p>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {["Internal 1", "Internal 2"].map((t, i) => (
                    <div key={t} className="bg-sky-50 rounded-xl p-3 text-center border border-sky-100">
                      <p className="text-xs font-bold text-sky-400 mb-1">{t}</p>
                      <p className="text-2xl font-extrabold text-sky-700">{[76, 82][i]}</p>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-500 font-medium">Completion</span>
                  <span className="text-blue-600 font-bold">7/7 Tests</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-sky-400 rounded-full" style={{ width: "100%" }} />
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-green-500/30 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                All Graded
              </div>

              {/* Floating student count */}
              <div className="absolute -bottom-3 -left-3 bg-white text-gray-700 text-sm font-bold px-4 py-2.5 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  <div className="w-6 h-6 rounded-full bg-blue-200 border-2 border-white" />
                  <div className="w-6 h-6 rounded-full bg-sky-200 border-2 border-white" />
                  <div className="w-6 h-6 rounded-full bg-indigo-200 border-2 border-white" />
                </div>
                66 Students
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Feature Bar */}
      <div className="relative z-10 border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-6 py-8">
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
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Instant Results</p>
                <p className="text-xs text-gray-400 mt-0.5">Students check marks with USN lookup</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
