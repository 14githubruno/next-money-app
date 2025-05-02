import { getUser } from "@/lib/utils";
import { redirect } from "next/navigation";
import { getTotalAmountExpenses } from "@/lib/queries/expense";

export default async function ExpensesAmount() {
  const { userId } = await getUser();

  if (!userId) {
    redirect("/sign-in");
  }

  const expensesAmount = await getTotalAmountExpenses(userId);

  return (
    <div className="flex h-[6.8rem] items-center bg-gray-50 pl-6">
      <p className="text-black dark:text-black">
        The total amount of expenses is:{" "}
        <span className="font-medium">
          $
          {expensesAmount?._sum.amount
            ? expensesAmount._sum.amount.toFixed(2)
            : 0}
        </span>
      </p>
    </div>
  );
}
