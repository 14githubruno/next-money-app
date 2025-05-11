import {
  getUser,
  getCurrency,
  getDateRange,
  getExpensesOfSelectedYear,
} from "@/lib/utils/server-only-utils";
import { getExpenses, getTotalAmountExpenses } from "@/lib/queries/expense";
import { redirect } from "next/navigation";
import { formatPriceWithCurrency } from "@/lib/utils";
import ConfirmedExpensesTable from "./confirmed-expenses-table";
import LinkToPendingOrConfirmed from "./link-to-pending-or-confirmed";

export default async function ConfirmedExpenses() {
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
  const confirmedExpenses = {
    isConfirmed: true,
    expenseDate: getExpensesOfSelectedYear(dateRange),
  };

  // queries
  const [expenses, amount] = await Promise.all([
    getExpenses(userId, { ...confirmedExpenses }),
    getTotalAmountExpenses(userId, { ...confirmedExpenses }),
  ]);

  return (
    <div className="flex h-[6.9rem] flex-col gap-3">
      <p className="rounded-lg bg-emerald-50 p-3 text-black dark:text-black">
        You have{" "}
        <span className="font-bold text-emerald-700">{expenses.length}</span>{" "}
        confirmed {expenses.length === 1 ? "payment" : "payments"}
      </p>
      <p className="rounded-lg bg-emerald-100 p-3 text-black dark:text-black">
        Total Confirmed:{" "}
        <span className="font-medium text-emerald-700">
          {formatPriceWithCurrency(amount._sum.amount ?? 0, currency)}
        </span>
      </p>
      <ConfirmedExpensesTable
        expenses={expenses.slice(0, 3)}
        currency={currency}
      />
      <LinkToPendingOrConfirmed isConfirmed={true} />
    </div>
  );
}
