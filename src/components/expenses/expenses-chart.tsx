"use client";

import { LineChart } from "../tremor-raw/visualizations/line-chart";

type ExpensesChartProps = {
  chartData: Record<string, string | number>[];
  chartCategories: string[];
};

export const ExpensesChart = ({
  chartData,
  chartCategories,
}: ExpensesChartProps) => (
  <LineChart
    className="h-80"
    data={chartData}
    index="date"
    categories={chartCategories}
    colors={["emerald", "violet"]}
    valueFormatter={(number: number) =>
      `$${Intl.NumberFormat("us").format(number).toString()}`
    }
  />
);
