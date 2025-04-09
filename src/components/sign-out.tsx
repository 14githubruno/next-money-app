"use client";

import { logout } from "@/lib/actions/auth";
import { useActionState } from "react";

export default function SignOut() {
  const [state, formAction, pending] = useActionState(logout, undefined);

  return (
    <form className="mx-auto my-0" action={formAction}>
      <button
        type="submit"
        className="cursor-pointer border bg-pink-500 p-1"
        disabled={pending}
      >
        {pending ? "Loading..." : "Sign out"}
      </button>
      {state && <p aria-live="polite">{state.message}</p>}
    </form>
  );
}
