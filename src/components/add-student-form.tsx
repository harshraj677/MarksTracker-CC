"use client";

import { useActionState } from "react";
import { addStudent } from "@/actions/marks";
import type { ActionResponse } from "@/lib/types";

const initialState: ActionResponse = { success: false, message: "" };

interface AddStudentFormProps {
  slug: string;
}

export default function AddStudentForm({ slug }: AddStudentFormProps) {
  const [state, formAction, pending] = useActionState(
    async (_prev: ActionResponse, formData: FormData) => {
      return await addStudent(formData, slug);
    },
    initialState
  );

  return (
    <form action={formAction} className="space-y-3">
      <h3 className="font-semibold text-gray-800">Add New Student</h3>

      <div className="flex gap-3">
        <input
          name="usn"
          type="text"
          placeholder="USN (e.g. 1RV21CS001)"
          required
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <input
          name="name"
          type="text"
          placeholder="Student Name"
          required
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <button
          type="submit"
          disabled={pending}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm whitespace-nowrap transition-colors"
        >
          {pending ? "Adding..." : "Add Student"}
        </button>
      </div>

      {state.message && (
        <p className={`text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
