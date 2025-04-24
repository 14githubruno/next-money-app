"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button/button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-center">Something went wrong</h1>
      <p>{error.message}</p>
      <Button variant="base" onClick={() => reset()}>
        Please try again
      </Button>
    </section>
  );
}
