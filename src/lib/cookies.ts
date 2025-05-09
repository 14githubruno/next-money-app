import { cookies } from "next/headers";

export async function getCurrency() {
  const cookiesStore = await cookies();
  return cookiesStore.get("currency")?.value;
}
