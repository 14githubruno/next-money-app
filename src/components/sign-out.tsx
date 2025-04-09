"use client";

import { logout } from "@/lib/actions/auth";

export default function SignOut() {
  return (
    <form action={() => logout()}>
      <button
        className="cursor-pointer rounded-2xl border bg-pink-500 p-1"
        type="submit"
      >
        Sign out
      </button>
    </form>
  );
}
