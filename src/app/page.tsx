import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl">Lorem Ipsum</h1>
      {!user && <Link href={"/sign-in"}>Sign in</Link>}
      {user && <Link href={"/dashboard"}>Dashboard &rarr;</Link>}
    </section>
  );
}
