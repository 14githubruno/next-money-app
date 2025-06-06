import clsx from "clsx";
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
import { Button } from "@/components/tremor-raw/ui/button";
import DateRangeSelect from "@/components/date-range-select";
import Link from "next/link";
import Heading from "@/components/ui/heading";
import Paragraph from "@/components/ui/paragraph";
import ExpenseForm from "@/components/expenses/expense-form";
import ExpensesFilters from "@/components/expenses/expenses-filters";
import ExpensesTable from "@/components/expenses/expenses-table";
import Pagination from "@/components/pagination";
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
  const note = searchParams?.note || "";
  const currentPage = Number(searchParams?.page) || 1;
  const offset = (currentPage - 1) * EXPENSES_PER.page;
  const isConfirmedParam = searchParams?.isConfirmed;
  const category = searchParams?.category;

  if (!userId) {
    redirect("/sign-in");
  }

  const whereFilters = {
    note: { contains: note, mode: "insensitive" },
    category: {
      name: {
        equals: category,
        mode: "insensitive",
      },
    },
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
    <div className="flex flex-col gap-16">
      <DateRangeSelect dateRange={dateRange} />
      {/* first block */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Heading level={1} text={PAGES_TITLES.h1.dashboardExpenses} />
          <div
            className={clsx(
              "flex flex-col gap-1",
              "lg:flex-row lg:justify-between"
            )}
          >
            <Paragraph text="Overview of all your expenses." />
            {categories.length > 0 ? (
              <ExpenseForm categories={categories} />
            ) : (
              <div className="rounded-lg bg-red-200 pl-2 text-sm leading-6 text-gray-600">
                No category detected.{" "}
                <Button asChild variant="base">
                  <Link href="/dashboard/categories">Go create one &rarr;</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
        <ExpensesFilters
          numOfExpenses={expenses.length}
          categories={categories}
        />
        <ExpensesTable
          currentPage={currentPage}
          categories={categories}
          expenses={expenses}
          currency={currency}
        />
        {totalCount > EXPENSES_PER.page && (
          <Pagination totalPages={totalPages} />
        )}
      </div>
    </div>
  );
}
