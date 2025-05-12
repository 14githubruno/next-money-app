import {
  getUser,
  getCurrency,
  getDateRange,
  getExpensesOfSelectedYear,
} from "@/lib/utils/server-only-utils";
import { getExpenses, getTotalAmountExpenses } from "@/lib/queries/expense";
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
  const confirmedExpenses = {
    isConfirmed: expensesAreConfirmed, // true or false
    expenseDate: getExpensesOfSelectedYear(dateRange),
  };

  // queries
  const [expenses, amount] = await Promise.all([
    getExpenses(userId, { ...confirmedExpenses }),
    getTotalAmountExpenses(userId, { ...confirmedExpenses }),
  ]);

  return (
    <div className="relative flex h-[22rem] flex-col gap-3">
      <ExpensesSliceLabel
        expensesAreConfirmed={expensesAreConfirmed}
        expensesLength={expenses.length}
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
          expenses={expenses.slice(0, 3)}
          currency={currency}
        />
      ) : (
        <PendingExpensesTable
          expenses={expenses.slice(0, 3)}
          currency={currency}
        />
      )}
      {/* 
       Show link if: 
       - there is at least 1 confirmed expense
       - there are more than 3 unconfirmed expenses  
      */}
      {expensesAreConfirmed
        ? expenses.length > 0 && (
            <LinkToPendingOrConfirmed isConfirmed={expensesAreConfirmed} />
          )
        : expenses.length > 3 && (
            <LinkToPendingOrConfirmed isConfirmed={expensesAreConfirmed} />
          )}
    </div>
  );
}
