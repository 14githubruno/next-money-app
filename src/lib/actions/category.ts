"use server";

import prisma from "../../../prisma/prisma";
import { categorySchema } from "../validations/schemas";
import { type CategoryFormState } from "../types";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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
    // Check if category with same name already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        userId,
        name: categoryData.name,
      },
    });

    if (existingCategory) {
      throw Error(`Category with name ${existingCategory.name} already exists`);
    }

    const newCategory = await prisma.category.create({
      data: {
        ...categoryData,
        userId,
      },
    });

    if (newCategory) {
      isSuccess = true;
    }

    return {
      success: true,
      message: `Category with name ${newCategory.name} created`,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        fieldValues,
      };
    }

    throw new Error("Error creating category");
  } finally {
    if (isSuccess) {
      revalidatePath("/dashboard/categories");
      redirect("/dashboard/categories");
    }
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
      throw Error(
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
        throw new Error("A category with this name already exists");
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
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        fieldValues,
      };
    }

    throw new Error("Error updating category");
  } finally {
    if (isSuccess) {
      revalidatePath("/dashboard/categories");
      redirect("/dashboard/categories");
    }
  }
}

/**
 * DELETE CATEGORY
 * ========================================================
 */
export async function deleteCategory(categoryId: string) {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id;

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
      throw new Error(
        "Category not found or you do not have permission to delete it"
      );
    }

    // Check if category is used by any expenses
    if (category.expenses.length > 0) {
      throw new Error(
        "This category cannot be deleted because it is used by one or more expenses"
      );
    }

    // Check if it's a default category
    if (category.isDefault) {
      throw new Error("Default categories cannot be deleted");
    }

    const deletedCategory = await prisma.category.delete({
      where: { id: categoryId, userId },
    });

    if (deletedCategory) {
      isDeleted = true;
      console.log(deletedCategory);
    }
    return {
      success: true,
      message: `Category with name ${deletedCategory.name} updated`,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: "Error in deleting category",
      };
    }

    throw new Error("Error deleting category");
  } finally {
    if (isDeleted) {
      revalidatePath("/dashboard/categories");
    }
  }
}
