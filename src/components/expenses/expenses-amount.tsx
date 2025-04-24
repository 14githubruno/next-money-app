import { grabUserId } from "@/lib/utils";
import { redirect } from "next/navigation";
import { getTotalAmountExpenses } from "@/lib/queries/expense";

export default async function ExpensesAmount() {
  const userId = await grabUserId();

  if (!userId) {
    redirect("/sign-in");
  }

  const expensesAmount = await getTotalAmountExpenses(userId);

  return expensesAmount ? (
    <div className="border border-purple-400 pl-4">
      <p>
        The total amount of expenses is:{" "}
        <span className="font-medium">
          ${expensesAmount?._sum.amount?.toFixed(2)}
        </span>
      </p>
    </div>
  ) : null;
}
