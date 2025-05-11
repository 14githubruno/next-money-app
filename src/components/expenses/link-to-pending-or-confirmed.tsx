import clsx from "clsx";
import Link from "next/link";
import { Button } from "../tremor-raw/ui/button";

type LinkToPendingOrConfirmedProps = {
  isConfirmed: boolean;
};

export default function LinkToPendingOrConfirmed({
  isConfirmed,
}: LinkToPendingOrConfirmedProps) {
  const text = isConfirmed ? "confirmed" : "unconfirmed";
  const param = isConfirmed ? "isConfirmed=true" : "isConfirmed=false";

  return (
    <Button
      asChild
      variant="base"
      className={clsx("absolute bottom-0 w-full", "lg:w-auto")}
    >
      <Link href={`/dashboard/expenses?${param}`}>See all {text} expenses</Link>
    </Button>
  );
}
