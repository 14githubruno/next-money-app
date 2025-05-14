"use server";

import { prisma } from "../../../prisma/prisma";
import { categorySchema } from "../validations/schemas";
import { type CategoryFormState } from "../types";
import { categoryFormInitialState as initState } from "../utils";
import { revalidateTag } from "next/cache";
import { getUser, PredictableError } from "../utils/server-only-utils";

/**
 * This file contains all the categories-related queries
 * that ARE server actions.
 *
 * Other queries for categories can be found here:
 * - `src/lib/queries/category.ts`
 * =========================================================
 */

/**
 * CREATE CATEGORY
 * ========================================================
 */
export async function createCategory(
  userId: string,
  prevState: CategoryFormState,
  data: FormData
): Promise<CategoryFormState> {
  const formData = Object.fromEntries(data);

  // avoid type conflicts with FormData
  const fieldValues = Object.assign(formData);

  // validate form data
  const validation = categorySchema.safeParse(formData);

  if (!validation.success) {
    return {
      success: false,
      message: "Invalid data",
      errors: validation.error.flatten().fieldErrors,
      fieldValues,
    };
  }

  // grab category data
  const categoryData = validation.data;

  try {
    // Check if category with same name already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        userId,
        name: categoryData.name,
      },
    });

    if (existingCategory) {
      throw new PredictableError(
        `Category with name ${existingCategory.name} already exists`
      );
    }

    const newCategory = await prisma.category.create({
      data: {
        ...categoryData,
        userId,
      },
    });

    if (newCategory) {
      revalidateTag("categories");
    }

    return {
      success: true,
      message: `Category with name ${newCategory.name} created`,
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

    throw new Error("Error creating category");
  }
}

/**
 * UPDATE CATEGORY
 * ========================================================
 */
export async function updateCategory(
  userId: string,
  categoryId: string | undefined,
  prevState: CategoryFormState,
  data: FormData
): Promise<CategoryFormState> {
  let isSuccess: boolean = false;

  const formData = Object.fromEntries(data);

  // avoid type conflicts with FormData
  const fieldValues = Object.assign(formData);

  // validate form data
  const validation = categorySchema.safeParse(formData);

  if (!validation.success) {
    return {
      success: false,
      message: "Invalid data",
      errors: validation.error.flatten().fieldErrors,
      fieldValues,
    };
  }

  // grab category data
  const categoryData = validation.data;

  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId!, userId },
    });

    if (!category || category.userId !== userId) {
      throw new PredictableError(
        "Category not found or you do not have permission to update it"
      );
    }

    // Check if another category with the new name already exists
    if (categoryData.name !== category.name) {
      const existingCategory = await prisma.category.findFirst({
        where: {
          userId,
          name: categoryData.name,
          id: { not: categoryId! },
        },
      });

      if (existingCategory) {
        throw new PredictableError("A category with this name already exists");
      }
    }

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: categoryData,
    });

    if (updatedCategory) {
      isSuccess = true;
    }

    return {
      success: true,
      message: `Category with name ${updatedCategory.name} updated`,
      fieldValues: updatedCategory,
    };
  } catch (error) {
    if (error instanceof PredictableError) {
      return {
        success: false,
        message: error.message,
        fieldValues,
      };
    }

    throw new Error("Error updating category");
  } finally {
    if (isSuccess) {
      revalidateTag("categories");
      revalidateTag("expenses");
    }
  }
}

/**
 * DELETE CATEGORY
 * ========================================================
 */
export async function deleteCategory(categoryId: string) {
  const { userId } = await getUser();

  let isDeleted: boolean = false;

  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId, userId },
      include: {
        expenses: {
          take: 1, // We only need to know if there are any expenses
        },
      },
    });

    if (!category || category.userId !== userId) {
      throw new PredictableError(
        "Category not found or you do not have permission to delete it"
      );
    }

    // Check if category is used by any expenses
    if (category.expenses.length > 0) {
      throw new PredictableError(
        "This category cannot be deleted because it is used by one or more expenses"
      );
    }

    // Check if it's a default category
    if (category.isDefault) {
      throw new PredictableError("Default categories cannot be deleted");
    }

    const deletedCategory = await prisma.category.delete({
      where: { id: categoryId, userId },
    });

    if (deletedCategory) {
      isDeleted = true;
    }

    return {
      success: true,
      message: `Category with name ${deletedCategory.name} deleted`,
    };
  } catch (error) {
    if (error instanceof PredictableError) {
      return {
        success: false,
        message: error.message,
      };
    }

    throw new Error("Error deleting category");
  } finally {
    if (isDeleted) {
      revalidateTag("categories");
    }
  }
}
