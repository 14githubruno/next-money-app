import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getTotalAmountExpenses } from "@/lib/queries/expense";

export default async function ExpensesAmount() {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id;

  if (!userId) {
    redirect("/sign-in");
  }

  const expensesAmount = await getTotalAmountExpenses(userId);

  return expensesAmount ? (
    <div className="rounded-sm border border-purple-400 pl-4">
      <p>
        The total amount of expenses is:{" "}
        <span className="font-medium">${expensesAmount?._sum.amount}</span>
      </p>
    </div>
  ) : null;
}
