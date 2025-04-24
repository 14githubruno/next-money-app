"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 *
 * @note Catch errors within dashboard
 */
export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-center">Something went wrong</h1>
      <p>{error.message}</p>
      <button
        className="cursor-pointer border border-transparent bg-[#8659c6] px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
        onClick={() => reset()}
      >
        Please try again
      </button>
    </section>
  );
}
