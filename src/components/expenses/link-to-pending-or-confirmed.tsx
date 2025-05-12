import clsx from "clsx";
import Link from "next/link";
import { Button } from "../tremor-raw/ui/button";

type LinkToPendingOrConfirmedProps = {
  isConfirmed: boolean;
};

/**
 * It renders a link to all confirmed/pending expenses.
 * @note This component is rendered in `expenses-slice.tsx` component.
 */
export default function LinkToPendingOrConfirmed({
  isConfirmed,
}: LinkToPendingOrConfirmedProps) {
  const text = isConfirmed ? "confirmed" : "pending";
  const searchParam = isConfirmed ? "isConfirmed=true" : "isConfirmed=false";

  return (
    <Button
      asChild
      variant="base"
      className={clsx("absolute bottom-0 w-full", "lg:w-auto")}
    >
      <Link href={`/dashboard/expenses?${searchParam}`}>
        See all {text} expenses &rarr;
      </Link>
    </Button>
  );
}
