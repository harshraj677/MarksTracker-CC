"use client";

import { logout } from "@/actions/auth";
import { useTransition } from "react";

export default function LogoutButton() {
  const [pending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logout();
    });
  }

  return (
    <button
      onClick={handleLogout}
      disabled={pending}
      className="bg-white text-gray-600 border border-gray-200 px-4 py-2 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 disabled:opacity-50 text-sm font-medium transition-all shadow-sm"
    >
      {pending ? "Logging out..." : "Logout"}
    </button>
  );
}
