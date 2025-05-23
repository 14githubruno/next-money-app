"use client";

import { logout } from "@/lib/actions/auth";
import { useActionState } from "react";
import { Button } from "../tremor-raw/ui/button";

export default function SignOut() {
  const [, formAction, pending] = useActionState(logout, undefined);

  return (
    <form action={formAction}>
      <Button
        variant="destructive"
        type="submit"
        disabled={pending}
        isLoading={pending}
        className="w-full rounded-sm"
      >
        {pending ? "Loading..." : "Yes"}
      </Button>
    </form>
  );
}
