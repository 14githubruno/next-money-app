import {
  getUser,
  getCurrency,
  getDateRange,
  getExpensesOfSelectedYear,
} from "@/lib/utils/server-only-utils";
import {
  getExpenses,
  getTotalAmountExpenses,
  getTotalExpenseCount,
} from "@/lib/queries/expense";
import { redirect } from "next/navigation";
import ExpensesSliceLabel from "./expenses-slice-label";
import ConfirmedExpensesTable from "./confirmed-expenses-table";
import PendingExpensesTable from "./pending-expenses-table";
import LinkToPendingOrConfirmed from "./link-to-pending-or-confirmed";
import { EXPENSES_PER } from "@/lib/constants";

type ExpensesSliceProps = {
  expensesAreConfirmed: boolean;
};

/**
 * It renders:
 * - a slice of confirmed or pending expenses (Only the latest three).
 * - a "table label" with the number of expenses and their total amount.
 * - optionally a link to *all* pending or confirmed expenses
 */
export default async function ExpensesSlice({
  expensesAreConfirmed,
}: ExpensesSliceProps) {
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
  const whereFilters = {
    isConfirmed: expensesAreConfirmed, // true or false
    expenseDate: getExpensesOfSelectedYear(dateRange),
  };

  // queries
  const [expenses, amount, count] = await Promise.all([
    getExpenses(userId, { ...whereFilters }, EXPENSES_PER.slice),
    getTotalAmountExpenses(userId, { ...whereFilters }),
    getTotalExpenseCount(userId, { ...whereFilters }),
  ]);

  return (
    <div className="relative flex h-[var(--height-expenses-slice)] flex-col gap-3">
      <ExpensesSliceLabel
        expensesAreConfirmed={expensesAreConfirmed}
        expensesLength={count}
        expensesAmount={amount._sum.amount ?? 0}
        currency={currency}
      />
      {/* 
       Uses two different components because:
       - ConfirmedExpensesTable is a Server Component
       - PendingExpensesTable is a Client Component
      */}
      {expensesAreConfirmed ? (
        <ConfirmedExpensesTable
          expenses={expenses}
          count={count}
          currency={currency}
        />
      ) : (
        <PendingExpensesTable
          expenses={expenses}
          count={count}
          currency={currency}
        />
      )}
      {/* 
       Show link if there are more than 3 expenses (pending/confirmed) 
      */}
      {count > 3 && (
        <LinkToPendingOrConfirmed isConfirmed={expensesAreConfirmed} />
      )}
    </div>
  );
}
