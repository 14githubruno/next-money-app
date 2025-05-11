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
    <Button asChild variant="base">
      <Link href={`/dashboard/expenses?${param}`}>See all {text} expenses</Link>
    </Button>
  );
}
