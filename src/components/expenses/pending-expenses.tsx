import {
  getUser,
  getCurrency,
  getDateRange,
  getExpensesOfSelectedYear,
} from "@/lib/utils/server-only-utils";
import { getExpenses, getTotalAmountExpenses } from "@/lib/queries/expense";
import { redirect } from "next/navigation";
import PendingExpensesTable from "./pending-expenses-table";
import { formatPriceWithCurrency } from "@/lib/utils";

export default async function PendingExpenses() {
  const { userId } = await getUser();

  if (!userId) {
    redirect("/sign-in");
  }

  // cookies
  const [currency, dateRange] = await Promise.all([
    getCurrency(),
    getDateRange(),
  ]);

  // filters
  const pendingExpenses = {
    isConfirmed: false,
    expenseDate: getExpensesOfSelectedYear(dateRange),
  };

  // queries
  const [expenses, amount] = await Promise.all([
    getExpenses(userId, { ...pendingExpenses }),
    getTotalAmountExpenses(userId, { ...pendingExpenses }),
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
