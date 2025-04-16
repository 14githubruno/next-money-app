import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { getSingleExpense } from "@/lib/queries/expense";

export default async function ViewExpensePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const user = session?.user;
  const userId = user?.id;

  const expense = await getSingleExpense(id, userId, true);

  if (!expense) {
    notFound();
  }

  return (
    <div className="p-6">
      {expense && userId && <p>{JSON.stringify(expense)}</p>}
    </div>
  );
}
