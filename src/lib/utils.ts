import { auth } from "@/auth";

export async function grabUserId() {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id;
  return userId;
}
