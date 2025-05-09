import { ExpensesChart } from "./expenses-chart";
import { getUser, getCurrency } from "@/lib/utils/server-only-utils";
import { getExpenses } from "@/lib/queries/expense";
import { notFound } from "next/navigation";
import { buildExpensesChartDataObject } from "@/lib/utils/server-only-utils";

const currentYear = new Date().getFullYear();
const expenseDate = {
  gte: new Date(`${currentYear}-01-01`).toISOString(),
  lte: new Date(`${currentYear}-12-31`).toISOString(),
};

const whereFiltersConfirmed = {
  expenseDate,
  isConfirmed: true,
};

const whereFiltersUnconfirmed = {
  expenseDate,
  isConfirmed: false,
};

export default async function ExpensesChartWrapper() {
  const { userId } = await getUser();

  const currency = await getCurrency();

  const [confirmed, unconfirmed] = await Promise.all([
    getExpenses(userId, { ...whereFiltersConfirmed }),
    getExpenses(userId, { ...whereFiltersUnconfirmed }),
  ]);

  if (!confirmed && !unconfirmed) {
    notFound();
  }

  // create chart data
  const chartData = buildExpensesChartDataObject(confirmed, unconfirmed);

  return (
    <ExpensesChart
      chartData={chartData}
      chartCategories={["confirmed", "unconfirmed"]}
      currency={currency}
    />
  );
}
