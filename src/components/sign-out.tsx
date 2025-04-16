"use client";

import { LeafIcon } from "lucide-react";
import { logout } from "@/lib/actions/auth";
import { useActionState } from "react";

export default function SignOut() {
  const [state, formAction, pending] = useActionState(logout, undefined);

  return (
    <form action={formAction}>
      <button
        type="submit"
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-[#8f63cd6e] p-3 text-sm font-medium hover:bg-[#8659c6] hover:text-white md:flex-none md:justify-start md:p-2 md:px-3"
        disabled={pending}
      >
        <LeafIcon className="w-6" />
        <span className="hidden md:block">
          {pending ? "Loading..." : "Sign out"}
        </span>
      </button>
      {state && <p aria-live="polite">{state.message}</p>}
    </form>
  );
}
