"use client";

import { useActionState } from "react";
import { addOrUpdateMark } from "@/actions/marks";
import type { ActionResponse } from "@/lib/types";

const initialState: ActionResponse = { success: false, message: "" };

export default function MarkForm({ studentId }: { studentId: string; studentName?: string }) {
  const [state, formAction, pending] = useActionState(
    async (_prev: ActionResponse, formData: FormData) => {
      return await addOrUpdateMark(formData);
    },
    initialState
  );

  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="student_id" value={studentId} />
      <input type="hidden" name="subject" value="CloudComputing" />

      <input
        name="marks"
        type="number"
        placeholder="0–100"
        min={0}
        max={100}
        required
        className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm w-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-center font-mono"
      />

      <button
        type="submit"
        disabled={pending}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg disabled:opacity-50 text-sm font-medium transition-all shadow-sm"
      >
        {pending ? (
          <span className="inline-flex items-center gap-1">
            <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            Saving
          </span>
        ) : "Save"}
      </button>

      {state.message && (
        <span className={`text-xs font-medium ${state.success ? "text-emerald-600" : "text-red-500"}`}>
          {state.success ? "\u2713" : "\u2717"} {state.message}
        </span>
      )}
    </form>
  );
}
