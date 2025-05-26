"use client";

import { LineChart } from "../tremor-raw/visualizations/line-chart";
import { formatPriceWithCurrency } from "@/lib/utils";

type ExpensesChartProps = {
  sum: number;
  chartData: Record<string, string | number>[];
  chartCategories: string[];
  currency: string | undefined;
};

export default function ExpensesChart({
  sum,
  chartData,
  chartCategories,
  currency,
}: ExpensesChartProps) {
  return (
    <LineChart
      className="h-[var(--height-expenses-chart)]"
      data={chartData}
      index="date"
      categories={chartCategories}
      colors={["emerald", "yellow"]}
      valueFormatter={(number: number) =>
        `${formatPriceWithCurrency(number, currency)}`
      }
      showGridLines={sum > 0}
    />
  );
}
