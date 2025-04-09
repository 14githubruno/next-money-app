"use client";

import { login } from "@/lib/actions/auth";

export default function SignIn() {
  return (
    <form action={() => login()}>
      <button
        className="cursor-pointer rounded-2xl border bg-pink-500 p-1"
        type="submit"
      >
        Sign in
      </button>
    </form>
  );
}
