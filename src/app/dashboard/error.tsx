"use client";

import { useEffect } from "react";
import ErrorComponent from "@/components/global/error-component";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorComponent errorMessage={error.message} reset={reset} />;
}
