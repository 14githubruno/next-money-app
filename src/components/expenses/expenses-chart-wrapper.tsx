import { ExpensesChart } from "./expenses-chart";
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
  const whereFiltersUnconfirmed = {
    expenseDate,
    isConfirmed: false,
  };

  // queries
  const [confirmed, unconfirmed] = await Promise.all([
    getExpenses(userId, { ...whereFiltersConfirmed }),
    getExpenses(userId, { ...whereFiltersUnconfirmed }),
  ]);

  if (!confirmed && !unconfirmed) {
    notFound();
  }

  // create chart data
  const { sum, chartData } = buildExpensesChartDataObject(
    confirmed,
    unconfirmed
  );

  // set chart
  const chart = (
    <ExpensesChart
      sum={sum}
      chartData={chartData}
      chartCategories={["confirmed", "unconfirmed"]}
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
