import LoginForm from "@/components/login-form";
import Link from "next/link";

export default function TeacherLoginPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-50 rounded-full translate-y-1/2 -translate-x-1/3" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-8">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:text-blue-800 mb-6 inline-flex items-center gap-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Home
          </Link>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 mb-4 shadow-lg shadow-blue-500/25">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to manage student marks</p>
          </div>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}
