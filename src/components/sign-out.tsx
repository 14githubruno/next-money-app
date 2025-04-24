"use client";

import { logout } from "@/lib/actions/auth";
import { useActionState } from "react";
import { Button } from "./ui/button/button";

export default function SignOut() {
  const [state, formAction, pending] = useActionState(logout, undefined);

  return (
    <form action={formAction}>
      <Button
        variant="base"
        type="submit"
        disabled={pending}
        isLoading={pending}
        className="flex h-10 w-full grow items-center justify-center gap-2 text-sm font-medium md:flex-none md:justify-start"
      >
        {pending ? "Loading..." : "Sign out"}
      </Button>

      {state && <p aria-live="polite">{state.message}</p>}
    </form>
  );
}
