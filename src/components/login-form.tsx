"use client";

import { useActionState } from "react";
import { login } from "@/actions/auth";
import type { ActionResponse } from "@/lib/types";

const initialState: ActionResponse = { success: false, message: "" };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: ActionResponse, formData: FormData) => {
      return await login(formData);
    },
    initialState
  );

  return (
    <form action={formAction} className="space-y-5 w-full">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1.5">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="teacher@example.com"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1.5">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          placeholder="••••••••"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all"
        />
      </div>

      {state.message && !state.success && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg shadow-blue-600/20"
      >
        {pending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
