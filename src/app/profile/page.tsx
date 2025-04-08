import { auth } from "@/auth";
import Image from "next/image";

export default async function UserInfo() {
  const session = await auth();
  return (
    <div>
      <p>{JSON.stringify(session)}</p>
      {session?.user?.image && (
        <Image
          src={session.user.image}
          width={48}
          height={48}
          alt={session.user.name ?? "Avatar"}
        />
      )}
    </div>
  );
}
