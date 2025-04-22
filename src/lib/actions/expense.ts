"use server";

import prisma from "../../../prisma/prisma";
import { expenseSchema } from "../validations/schemas";
import { type ExpenseFormState } from "../types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { grabUserId } from "../utils";

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
  userId: string,
  prevState: ExpenseFormState,
  data: FormData
): Promise<ExpenseFormState> {
  const formData = Object.fromEntries(data);

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
      throw new Error("Invalid category selected");
    }

    const newExpense = await prisma.expense.create({
      data: {
        ...expenseData,
        userId,
      },
      include: {
        category: true,
      },
    });

    if (newExpense) {
      revalidatePath("/dashboard/expenses");
      revalidatePath("/dashboard/categories");
    }

    return {
      success: true,
      message: `Expense for category ${newExpense.category.name} created`,
      fieldValues: prevState.fieldValues,
    };
  } catch (error) {
    if (error instanceof Error) {
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
  userId: string,
  expenseId: string | undefined,
  prevState: ExpenseFormState,
  data: FormData
): Promise<ExpenseFormState> {
  let isSuccess: boolean = false;

  const formData = Object.fromEntries(data);

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
    const existingExpense = await prisma.expense.findUnique({
      where: { id: expenseId, userId },
    });

    if (!existingExpense || existingExpense.userId !== userId) {
      throw new Error(
        "Expense not found or you do not have permission to update it"
      );
    }

    const updatedExpense = await prisma.expense.update({
      where: { id: expenseId, userId },
      data: expenseData,
      include: {
        category: true,
      },
    });

    if (updatedExpense) {
      isSuccess = true;
    }

    return {
      success: true,
      message: "Expense updated",
      fieldValues: updatedExpense,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message, fieldValues };
    }

    throw new Error("Error updating expense");
  } finally {
    if (isSuccess) {
      revalidatePath(`/dashboard/expenses/${expenseId}`);
    }
  }
}

/**
 * DELETE EXPENSE
 * ========================================================
 */
export async function deleteExpense(expenseId: string) {
  const userId = await grabUserId();

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    const expense = await prisma.expense.findUnique({
      where: { id: expenseId, userId },
    });

    if (!expense || expense.userId !== userId) {
      throw new Error(
        "Expense not found or you do not have permission to delete it"
      );
    }

    const deletedExpense = await prisma.expense.delete({
      where: { id: expenseId, userId },
    });

    if (deletedExpense) {
      revalidatePath("/dashboard/expenses");
    }

    return { success: true, message: "Expense deleted" };
  } catch (error) {
    if (error instanceof Error) {
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
  const userId = await grabUserId();

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    const expense = await prisma.expense.findUnique({
      where: { id: expenseId, userId },
    });

    if (!expense || expense.userId !== userId) {
      throw new Error(
        "Expense not found or you do not have permission to delete it"
      );
    }

    const confirmedExpense = await prisma.expense.update({
      where: { id: expenseId, userId },
      data: { isConfirmed: true },
      include: { category: true },
    });

    if (confirmedExpense) {
      revalidatePath("/dashboard");
    }

    return { success: true, message: "Expense confirmed" };
  } catch (error) {
    console.log("ERROR CONFIRMING EXPENSES: ", error);
    throw new Error("Error confirming expense");
  }
}
