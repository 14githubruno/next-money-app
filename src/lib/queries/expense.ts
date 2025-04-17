import prisma from "../../../prisma/prisma";

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
export async function getExpenses<T>(
  userId: string | undefined,
  filters?: Record<string, T>
) {
  try {
    const userExpenses = await prisma.expense.findMany({
      where: {
        userId,
        ...filters,
      },
      include: {
        category: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return userExpenses;
  } catch (error) {
    console.error("ERROR EXPENSES: ", error);
    throw new Error("Error fetching user expenses");
  }
}

/**
 * GET SINGLE EXPENSE
 * ========================================================
 */

export async function getSingleExpense<T>(
  expenseId: string,
  userId: string | undefined,
  toViewExpense = false,
  filters?: Record<string, T>
) {
  try {
    const expense = await prisma.expense.findUnique({
      where: {
        id: expenseId,
        userId: userId!,
        ...filters,
      },

      include: {
        category: toViewExpense
          ? {
              select: {
                name: true,
                _count: true,
              },
            }
          : true,
      },
    });

    return expense;
  } catch (error) {
    console.error("ERROR SINGLE EXPENSE: ", error);
    throw new Error("Error fetching single user expense");
  }
}

/**
 * GET TOTAL AMOUNT OF EXPENSES
 * ========================================================
 */
export async function getTotalAmountExpenses<T>(
  userId: string | undefined,
  filters?: Record<string, T>
) {
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
}
