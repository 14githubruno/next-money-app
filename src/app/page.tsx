import { auth } from "@/auth";
import Link from "next/link";
import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  if (user) {
    return (
      <div className="flex flex-col gap-2">
        <Link href="/profile">I want to see my session info &rarr;</Link>
        <SignOut />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-2">
        <p>You are not signed in</p>
        <SignIn />
      </div>
    );
  }
}
