import { redirect, notFound } from "next/navigation";
import {
  getUser,
  getCurrency,
  getDateRange,
  convertToBoolean,
  getExpensesOfSelectedYear,
} from "@/lib/utils/server-only-utils";
import { getExpenses, getTotalExpenseCount } from "@/lib/queries/expense";
import { getCategories } from "@/lib/queries/category";
import Heading from "@/components/ui/heading";
import { ExpensesTable } from "@/components/expenses/expenses-table";
import ExpenseForm from "@/components/expenses/expense-form";
import ExpenseFilters from "@/components/expenses/expense-filters";
import Pagination from "@/components/pagination";
import { Suspense } from "react";
import { PAGES_TITLES, EXPENSES_PER } from "@/lib/constants";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ExpensesPage(props: {
  searchParams?: SearchParams;
}) {
  const { userId } = await getUser();
  const [currency, dateRange] = await Promise.all([
    getCurrency(),
    getDateRange(),
  ]);

  const searchParams = await props.searchParams;
  const query = searchParams?.note || "";
  const currentPage = Number(searchParams?.page) || 1;
  const offset = (currentPage - 1) * EXPENSES_PER.page;
  const isConfirmedParam = searchParams?.isConfirmed;

  if (!userId) {
    redirect("/sign-in");
  }

  const whereFilters = {
    note: { contains: query, mode: "insensitive" },
    isConfirmed: convertToBoolean(isConfirmedParam),
    expenseDate: getExpensesOfSelectedYear(dateRange),
  };

  const [expenses, categories, totalCount] = await Promise.all([
    getExpenses(userId, { ...whereFilters }, EXPENSES_PER.page, offset),
    getCategories(userId),
    getTotalExpenseCount(userId, { ...whereFilters }),
  ]);

  if (!expenses || !categories) {
    notFound();
  }

  const totalPages = Math.ceil(totalCount / EXPENSES_PER.page);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <Heading level={1} text={PAGES_TITLES.h1.dashboardExpenses} />
        <div className="flex items-center justify-between">
          <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
            Overview of all your expenses.
          </p>
          <ExpenseForm categories={categories} />
        </div>

        <ExpenseFilters />
      </div>
      <Suspense fallback={null}>
        <ExpensesTable
          currentPage={currentPage}
          categories={categories}
          expenses={expenses}
          currency={currency}
        />
      </Suspense>

      {totalCount > EXPENSES_PER.page && <Pagination totalPages={totalPages} />}
    </div>
  );
}
