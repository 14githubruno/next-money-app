/* SERVER ONLY UTILS */
import "server-only";

import { auth } from "@/auth";
import type { User } from "next-auth";
import { cache } from "react";
import { cookies } from "next/headers";
import type { ExpenseTypes } from "@/lib/validations/schemas";
import { MONTHS } from "../constants";

/**
 * Get logged in user data
 */
export const getUser = cache(
  async (): Promise<{
    user: User | undefined;
    userId: string | undefined;
  }> => {
    const session = await auth();
    const user = session?.user;
    const userId = user?.id;

    return {
      user,
      userId,
    };
  }
);

/**
 * Set custom Error object to catch predictable category and expense errors
 */
export class PredictableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PredictableError";
  }
}

/**
 * Helper to get currency cookie.
 */
export async function getCurrency() {
  const cookiesStore = await cookies();
  return cookiesStore.get("currency")?.value;
}

/**
 * Helper to get dateRange cookie.
 */
export async function getDateRange() {
  const cookiesStore = await cookies();
  return (
    cookiesStore.get("dateRange")?.value ?? new Date().getFullYear().toString()
  );
}

/**
 * Return prisma date filters based on selected year.
 */
export function getExpensesOfSelectedYear(dateRange: string) {
  return {
    gte: new Date(`${dateRange}-01-01`).toISOString(),
    lte: new Date(`${dateRange}-12-31`).toISOString(),
  };
}

/**
 * Convert true or false strings (coming from search params) to boolean
 */
export function convertToBoolean(value: string | string[] | undefined) {
  switch (value) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return undefined;
  }
}

/**
 * Build chart data for expenses-chart
 */
export function buildExpensesChartDataObject(
  confirmed: ExpenseTypes[],
  pending: ExpenseTypes[]
) {
  const sum = confirmed.length + pending.length;
  const chartData = [];

  for (let i = 0; i < MONTHS.length; i++) {
    chartData.push({
      date: MONTHS[i].slice(0, 3),
      confirmed: calculateAmountPerMonth(confirmed, i),
      pending: calculateAmountPerMonth(pending, i),
    });
  }

  return { sum, chartData };
}

function calculateAmountPerMonth(expenses: ExpenseTypes[], monthIndex: number) {
  const expensesByMonth = expenses.filter(
    (exp) => exp.expenseDate.getMonth() === monthIndex
  );

  if (expensesByMonth.length === 0) {
    return 0;
  }

  const amounts = expensesByMonth.map((exp) => exp.amount);
  const total = amounts.reduce((total, num) => {
    return (total += num);
  }, 0);

  return total;
}
