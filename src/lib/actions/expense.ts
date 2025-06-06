"use server";

import { prisma } from "../../../prisma/prisma";
import { expenseSchema } from "../validations/schemas";
import { type ExpenseFormState } from "../types";
import {
  EXPENSE_FORM_INITIAL_STATE as initState,
  APP_FIRST_YEAR,
} from "../constants";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getUser, PredictableError } from "../utils/server-only-utils";

/**
 * This file contains all the expenses-related queries
 * that ARE server actions.
 *
 * Other queries for expenses can be found here:
 * - `src/lib/queries/expense.ts`
 * =========================================================
 */

/**
 * CREATE EXPENSE
 * ========================================================
 */
export async function createExpense(
  prevState: ExpenseFormState,
  data: FormData
): Promise<ExpenseFormState> {
  const { userId } = await getUser();

  const formData = Object.fromEntries(data);

  // check if expense year is valid
  const expenseYear = new Date(formData.expenseDate as string).getFullYear();
  const isValidExpenseYear = expenseYear >= APP_FIRST_YEAR;

  if (!isValidExpenseYear) {
    return {
      success: false,
      message: `Expense date can't be older than app first year (${APP_FIRST_YEAR})`,
      fieldValues: initState.fieldValues,
    };
  }

  // avoid type conflicts with FormData
  const fieldValues = Object.assign(formData);

  // validate form data
  const validation = expenseSchema.safeParse(formData);

  if (!validation.success) {
    return {
      success: false,
      message: "Invalid data",
      errors: validation.error.flatten().fieldErrors,
      fieldValues,
    };
  }

  // grab expense data
  const expenseData = validation.data;

  try {
    // Verify the category exists and belongs to the user
    const category = await prisma.category.findFirst({
      where: {
        id: expenseData.categoryId,
        userId,
      },
    });

    if (!category) {
      throw new PredictableError("Invalid category selected");
    }

    const newExpense = await prisma.expense.create({
      data: {
        ...expenseData,
        userId: userId!,
      },
      include: {
        category: true,
      },
    });

    if (newExpense) {
      revalidateTag("categories");
      revalidateTag("expenses");
    }

    return {
      success: true,
      message: `Expense for category ${newExpense.category.name} created`,
      fieldValues: initState.fieldValues,
    };
  } catch (error) {
    if (error instanceof PredictableError) {
      return {
        success: false,
        message: error.message,
        fieldValues,
      };
    }

    throw new Error("Error creating expense");
  }
}

/**
 * UPDATE EXPENSE
 * ========================================================
 */
export async function updateExpense(
  expenseId: string | undefined,
  prevState: ExpenseFormState,
  data: FormData
): Promise<ExpenseFormState> {
  const { userId } = await getUser();

  let isSuccess: boolean = false;

  const formData = Object.fromEntries(data);

  // check if expense year is valid
  const expenseYear = new Date(formData.expenseDate as string).getFullYear();
  const isValidExpenseYear = expenseYear >= APP_FIRST_YEAR;

  if (!isValidExpenseYear) {
    return {
      success: false,
      message: `Expense date can't be older than app first year (${APP_FIRST_YEAR})`,
      fieldValues: initState.fieldValues,
    };
  }

  // avoid type conflicts with FormData
  const fieldValues = Object.assign(formData);

  // validate form data
  const validation = expenseSchema.safeParse(formData);

  if (!validation.success) {
    return {
      success: false,
      message: "Invalid data",
      errors: validation.error.flatten().fieldErrors,
      fieldValues,
    };
  }

  // grab expense data
  const expenseData = validation.data;

  try {
    const updatedExpense = await prisma.expense.update({
      where: { id: expenseId, userId },
      data: expenseData,
      include: {
        category: true,
      },
    });

    if (updatedExpense) {
      isSuccess = true;
    } else {
      throw new PredictableError(
        "Expense not found or you do not have permission to update it"
      );
    }

    return {
      success: true,
      message: "Expense updated",
      fieldValues: updatedExpense,
    };
  } catch (error) {
    if (error instanceof PredictableError) {
      return { success: false, message: error.message, fieldValues };
    }

    throw new Error("Error updating expense");
  } finally {
    if (isSuccess) {
      revalidateTag("categories");
      revalidateTag("expenses");
    }
  }
}

/**
 * DELETE EXPENSE
 * ========================================================
 */
export async function deleteExpense(expenseId: string) {
  const { userId } = await getUser();

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    const deletedExpense = await prisma.expense.delete({
      where: { id: expenseId, userId },
    });

    if (deletedExpense) {
      revalidateTag("categories");
      revalidateTag("expenses");
    } else {
      throw new PredictableError(
        "Expense not found or you do not have permission to delete it"
      );
    }

    return { success: true, message: "Expense deleted" };
  } catch (error) {
    if (error instanceof PredictableError) {
      return { success: false, error: error.message };
    }

    throw new Error("Error in deleting the expense");
  }
}

/**
 * JUST CONFIRM EXPENSE/PAYMENT
 * ========================================================
 */
export async function confirmExpense(expenseId: string) {
  const { userId } = await getUser();

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    const confirmedExpense = await prisma.expense.update({
      where: { id: expenseId, userId },
      data: { isConfirmed: true },
      include: { category: true },
    });

    if (confirmedExpense) {
      revalidateTag("categories");
      revalidateTag("expenses");
    } else {
      throw new Error(
        "Expense not found or you do not have permission to delete it"
      );
    }

    return { success: true, message: "Expense confirmed" };
  } catch (error) {
    console.log("ERROR CONFIRMING EXPENSES: ", error);
    throw new Error("Error confirming expense");
  }
}
