import Link from "next/link";
import { grabUserId } from "@/lib/utils";

export default async function Home() {
  const userId = await grabUserId();
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl">Lorem Ipsum</h1>
      {userId ? (
        <Link href={"/dashboard"}>Dashboard &rarr;</Link>
      ) : (
        <Link href={"/sign-in"}>Sign in</Link>
      )}
    </section>
  );
}
