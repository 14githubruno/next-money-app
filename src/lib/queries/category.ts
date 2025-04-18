import prisma from "../../../prisma/prisma";

/**
 * This file contains all the categories-related queries
 * that are NOT server actions.
 *
 * Server actions for categories can be found here:
 * - `src/lib/actions/category.ts`
 * =========================================================
 */

/**
 * CREATE DEFAULT CATEGORIES WHEN USER SIGN IN
 * (FOR THE FIRST TIME)
 * ========================================================
 */
export async function createDefaultCategories(userId: string) {
  try {
    const existingCategories = await prisma.category.findMany({
      where: { userId },
    });

    if (existingCategories.length === 0) {
      // Create default categories
      await prisma.category.createMany({
        data: [
          {
            name: "groceries",
            userId,
            isDefault: true,
          },
          {
            name: "house",
            userId,
            isDefault: true,
          },
        ],
      });
    }

    return { success: true };
  } catch (error) {
    console.error("DEFAULT CATEGORIES: ", error);
    throw new Error("Error initializing user default categories");
  }
}

/**
 * GET ALL USER CATEGORIES
 * ========================================================
 */
export async function getCategories<T>(
  userId: string | undefined,
  filters?: Record<string, T>
) {
  try {
    const userCategories = await prisma.category.findMany({
      where: {
        userId,
        ...filters,
      },
      include: {
        expenses: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    if (userCategories) return userCategories;
  } catch (error) {
    console.error("ERROR CATEGORIES: ", error);
    throw new Error("Error fetching user categories");
  }
}

/**
 * GET SINGLE USER CATEGORY
 * ========================================================
 */
export async function getSingleCategory<T>(
  categoryId: string,
  userId: string | undefined,
  filters?: Record<string, T>
) {
  try {
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId: userId!,
        ...filters,
      },
      include: {
        expenses: true,
      },
    });
    if (category) return category;
  } catch (error) {
    console.error("ERROR SINGLE CATEGORY: ", error);
    throw new Error("Error fetching single user category");
  }
}
