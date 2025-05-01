import { getUser } from "@/lib/utils";
import { redirect } from "next/navigation";
import { getTotalAmountExpenses } from "@/lib/queries/expense";

export default async function ExpensesAmount() {
  const { userId } = await getUser();

  if (!userId) {
    redirect("/sign-in");
  }

  const expensesAmount = await getTotalAmountExpenses(userId);

  return expensesAmount ? (
    <div className="bg-gray-50 p-10">
      <p className="light:text-black dark:text-black">
        The total amount of expenses is:{" "}
        <span className="font-medium">
          ${expensesAmount?._sum.amount?.toFixed(2)}
        </span>
      </p>
    </div>
  ) : null;
}
