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
  const expensesToTake = 3;

  // queries
  const [expenses, amount, count] = await Promise.all([
    getExpenses(userId, { ...whereFilters }, expensesToTake),
    getTotalAmountExpenses(userId, { ...whereFilters }),
    getTotalExpenseCount(userId, { ...whereFilters }),
  ]);

  return (
    <div className="relative flex h-[22rem] flex-col gap-3">
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
       Show link if: 
       - there is at least 1 confirmed expense
       - there are more than 3 pending expenses  
      */}
      {expensesAreConfirmed
        ? count > 0 && (
            <LinkToPendingOrConfirmed isConfirmed={expensesAreConfirmed} />
          )
        : count > 3 && (
            <LinkToPendingOrConfirmed isConfirmed={expensesAreConfirmed} />
          )}
    </div>
  );
}
