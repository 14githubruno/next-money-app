import Heading from "../ui/heading";
import { Button } from "../tremor-raw/ui/button";
import Link from "next/link";

export default function NotFoundComponent() {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <Heading level={1} text="404" />
      <p className="text-red-700">Resource not found</p>
      <Button asChild variant="base">
        <Link href="/dashboard">Go back</Link>
      </Button>
    </section>
  );
}
