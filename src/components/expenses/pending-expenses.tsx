import { getUser, getCurrency } from "@/lib/utils/server-only-utils";
import { getExpenses, getTotalAmountExpenses } from "@/lib/queries/expense";
import { redirect } from "next/navigation";
import PendingExpensesTable from "./pending-expenses-table";
import { formatPriceWithCurrency } from "@/lib/utils";

const pendingExpenses = {
  isConfirmed: false,
};

export default async function PendingExpenses() {
  const { userId } = await getUser();

  if (!userId) {
    redirect("/sign-in");
  }

  const currency = await getCurrency();
  const [expenses, amount] = await Promise.all([
    getExpenses<boolean>(userId, pendingExpenses),
    getTotalAmountExpenses<boolean>(userId, pendingExpenses),
  ]);

  return (
    <div className="flex h-[27rem] flex-col gap-3">
      <p className="rounded-lg bg-purple-50 p-3 text-black dark:text-black">
        You have{" "}
        <span className="font-bold text-[#8659c6]">{expenses.length}</span>{" "}
        pending {expenses.length === 1 ? "payment" : "payments"}
      </p>
      <p className="rounded-lg bg-purple-200 p-3 text-black dark:text-black">
        Total Pending:{" "}
        <span className="font-medium">
          {formatPriceWithCurrency(amount._sum.amount ?? 0, currency)}
        </span>
      </p>
      <PendingExpensesTable
        expenses={expenses.slice(0, 5)}
        currency={currency}
      />
    </div>
  );
}
