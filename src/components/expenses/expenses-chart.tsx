"use client";

import { LineChart } from "../tremor-raw/visualizations/line-chart";
import { formatPriceWithCurrency } from "@/lib/utils";

type ExpensesChartProps = {
  chartData: Record<string, string | number>[];
  chartCategories: string[];
  currency: string | undefined;
};

export const ExpensesChart = ({
  chartData,
  chartCategories,
  currency,
}: ExpensesChartProps) => (
  <LineChart
    data={chartData}
    index="date"
    categories={chartCategories}
    colors={["emerald", "violet"]}
    valueFormatter={(number: number) =>
      `${formatPriceWithCurrency(number, currency)}`
    }
  />
);
