"use client";

import { login } from "@/lib/actions/auth";
import { useActionState } from "react";

export default function SignIn() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <form className="mx-auto my-0" action={formAction}>
      <button
        type="submit"
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-[#8f63cd6e] p-3 text-sm font-medium hover:bg-[#8659c6] hover:text-white md:flex-none md:justify-start md:p-2 md:px-3"
        disabled={pending}
      >
        {pending ? "Loading..." : "Sign in with Google"}
      </button>
      {state && <p aria-live="polite">{state.message}</p>}
    </form>
  );
}
