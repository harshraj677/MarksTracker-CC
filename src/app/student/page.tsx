import UsnLookupForm from "@/components/usn-lookup-form";
import Link from "next/link";

export default function StudentPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-sky-50 rounded-full -translate-y-1/2 -translate-x-1/3" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-50 rounded-full translate-y-1/2 translate-x-1/3" />

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Check Your Marks</h1>
            <p className="text-gray-500 text-sm mt-1">Enter your USN to view your results</p>
          </div>

          <UsnLookupForm />
        </div>
      </div>
    </main>
  );
}
