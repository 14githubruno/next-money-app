import { prisma } from "../../../prisma/prisma";
import { unstable_cache } from "next/cache";

/**
 * This file contains all the expenses-related
 * that are NOT server actions.
 *
 * Server actions for expenses can be found here:
 * - `src/lib/actions/expense.ts`
 * =========================================================
 */

/**
 * GET ALL USER EXPENSES
 * ========================================================
 */
export const getExpenses = unstable_cache(
  async <T>(
    userId: string | undefined,
    whereFilters?: Record<string, T>,
    take?: number,
    skip?: number
  ) => {
    try {
      const userExpenses = await prisma.expense.findMany({
        where: {
          userId,
          ...whereFilters,
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
        omit: {
          userId: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
        skip,
        take,
      });
      return userExpenses;
    } catch (error) {
      console.error("ERROR EXPENSES: ", error);
      throw new Error("Error fetching user expenses");
    }
  },
  ["expenses"],
  { revalidate: 3600, tags: ["expenses"] }
);

/**
 * GET TOTAL AMOUNT OF EXPENSES
 * ========================================================
 */
export const getTotalAmountExpenses = unstable_cache(
  async <T>(userId: string | undefined, filters?: Record<string, T>) => {
    try {
      const amount = await prisma.expense.aggregate({
        where: {
          userId,
          ...filters,
        },
        _sum: {
          amount: true,
        },
      });

      return amount;
    } catch (error) {
      console.error("ERROR AGGREGATING: ", error);
      throw new Error("Error aggregating amount expenses");
    }
  },
  ["expenses"],
  { revalidate: 3600, tags: ["expenses"] }
);

/**
 * GET TOTAL COUNT OF USER EXPENSES
 * ========================================================
 */
export const getTotalExpenseCount = unstable_cache(
  async <T>(userId: string | undefined, whereFilters?: Record<string, T>) => {
    try {
      const count = await prisma.expense.count({
        where: {
          userId,
          ...whereFilters,
        },
      });
      return count;
    } catch (error) {
      console.error("ERROR GETTING EXPENSE COUNT: ", error);
      throw new Error("Error fetching total expense count");
    }
  },
  ["expenses"],
  { revalidate: 3600, tags: ["expenses"] }
);
