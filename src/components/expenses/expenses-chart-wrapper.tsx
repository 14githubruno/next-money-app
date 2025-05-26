import ExpensesChart from "./expenses-chart";
import {
  getUser,
  getCurrency,
  getDateRange,
  getExpensesOfSelectedYear,
} from "@/lib/utils/server-only-utils";
import { getExpenses } from "@/lib/queries/expense";
import { notFound } from "next/navigation";
import { buildExpensesChartDataObject } from "@/lib/utils/server-only-utils";
import { Fragment } from "react";

export default async function ExpensesChartWrapper() {
  const { userId } = await getUser();

  // cookies
  const [currency, dateRange] = await Promise.all([
    getCurrency(),
    getDateRange(),
  ]);

  // filters
  const expenseDate = getExpensesOfSelectedYear(dateRange);
  const whereFiltersConfirmed = {
    expenseDate,
    isConfirmed: true,
  };
  const whereFiltersPending = {
    expenseDate,
    isConfirmed: false,
  };

  // queries
  const [confirmed, pending] = await Promise.all([
    getExpenses(userId, { ...whereFiltersConfirmed }),
    getExpenses(userId, { ...whereFiltersPending }),
  ]);

  if (!confirmed && !pending) {
    notFound();
  }

  // create chart data
  const { sum, chartData } = buildExpensesChartDataObject(confirmed, pending);

  // set chart
  const chart = (
    <ExpensesChart
      sum={sum}
      chartData={chartData}
      chartCategories={["confirmed", "pending"]}
      currency={currency}
    />
  );

  return sum === 0 ? (
    <div className="relative">
      {chart}
      <p className="absolute top-[45%] left-1/2 -translate-x-[45%]">
        No expenses found
      </p>
    </div>
  ) : (
    <Fragment>{chart}</Fragment>
  );
}
