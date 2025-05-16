"use client";

import clsx from "clsx";
import { login } from "@/lib/actions/auth";
import { useActionState } from "react";
import { Button } from "./tremor-raw/ui/button";

export default function SignIn() {
  const [, formAction, pending] = useActionState(login, undefined);

  return (
    <form className="mx-auto my-0" action={formAction}>
      <Button
        variant="base"
        type="submit"
        disabled={pending}
        isLoading={pending}
        className={clsx(
          "flex h-10 grow items-center justify-center gap-2 text-sm font-medium",
          "md:flex-none md:justify-start"
        )}
      >
        {pending ? "Loading..." : "Sign in with Google"}
      </Button>
    </form>
  );
}
