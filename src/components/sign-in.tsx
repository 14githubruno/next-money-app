"use client";

import { login } from "@/lib/actions/auth";
import { useActionState } from "react";

export default function SignIn() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <form className="mx-auto my-0" action={formAction}>
      <button
        type="submit"
        className="cursor-pointer border bg-pink-500 p-1"
        disabled={pending}
      >
        {pending ? "Loading..." : "Sign in with Google"}
      </button>
      {state && <p aria-live="polite">{state.message}</p>}
    </form>
  );
}
