import SignOut from "@/components/sign-out";
import Link from "next/link";
import { Fragment } from "react";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  return (
    <section>
      <h1>Lorem Ipsum</h1>
      {!user && <Link href={"/sign-in"}>Sign in</Link>}

      {user && (
        <Fragment>
          <hr />
          <SignOut />
        </Fragment>
      )}
    </section>
  );
}
