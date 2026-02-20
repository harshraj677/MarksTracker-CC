"use client";

import { deleteStudent } from "@/actions/marks";
import { useTransition } from "react";

export default function DeleteStudentButton({ studentId }: { studentId: string }) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Are you sure you want to delete this student and all their marks?")) {
      return;
    }

    startTransition(async () => {
      await deleteStudent(studentId);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="text-red-500 hover:text-red-700 disabled:opacity-50 text-sm transition-colors"
      title="Delete student"
    >
      {pending ? "..." : "✕"}
    </button>
  );
}
