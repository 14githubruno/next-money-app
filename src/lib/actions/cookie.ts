"use server";

import { cookies } from "next/headers";

export async function setDateRange(
  prevState: Record<string, string | undefined>,
  data: FormData
) {
  const cookieStore = await cookies();
  const dateRange = cookieStore.get("dateRange")?.value;

  if (dateRange) cookieStore.delete("dateRange");
  cookieStore.set("dateRange", data.get("dateRange") as string);
  return { dateRange };
}
