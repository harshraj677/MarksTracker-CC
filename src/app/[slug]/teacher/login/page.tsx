import LoginForm from "@/components/login-form";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubjectBySlug } from "@/lib/subjects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TeacherLoginPage({ params }: PageProps) {
  const { slug } = await params;
  const subject = getSubjectBySlug(slug);
  if (!subject) notFound();

  const isBlue = subject.color === "blue";

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] ${isBlue ? "bg-blue-50" : "bg-emerald-50"} rounded-full -translate-y-1/2 translate-x-1/3`} />
      <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] ${isBlue ? "bg-sky-50" : "bg-teal-50"} rounded-full translate-y-1/2 -translate-x-1/3`} />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-6 sm:p-8">
          <Link
            href="/"
            className={`text-sm ${isBlue ? "text-blue-600 hover:text-blue-800" : "text-emerald-600 hover:text-emerald-800"} mb-6 inline-flex items-center gap-1 transition-colors`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Home
          </Link>

          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${isBlue ? "bg-gradient-to-br from-blue-600 to-sky-500 shadow-blue-500/25" : "bg-gradient-to-br from-emerald-600 to-teal-500 shadow-emerald-500/25"} mb-4 shadow-lg`}>
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Teacher Login</h1>
            <p className="text-gray-500 text-sm mt-1">{subject.name} ({subject.code})</p>
            <p className="text-gray-400 text-xs mt-0.5">{subject.teacherName}</p>
          </div>

          <LoginForm slug={slug} />
        </div>
      </div>
    </main>
  );
}
