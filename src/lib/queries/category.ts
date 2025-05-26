import { prisma } from "../../../prisma/prisma";
import { unstable_cache } from "next/cache";

/**
 * This file contains all the categories-related queries
 * that are NOT server actions.
 *
 * Server actions for categories can be found here:
 * - `src/lib/actions/category.ts`
 * =========================================================
 */

/**
 * GET ALL USER CATEGORIES
 * ========================================================
 */

export const getCategories = unstable_cache(
  async <T>(
    userId: string | undefined,
    filters?: Record<string, T>,
    expensesWhereFilters?: Record<string, T>
  ) => {
    try {
      const userCategories = await prisma.category.findMany({
        where: {
          userId,
          ...filters,
        },
        include: {
          _count: {
            select: {
              expenses: {
                where: { ...expensesWhereFilters },
              },
            },
          },
        },
        omit: {
          userId: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      if (userCategories) {
        return userCategories.map((category) => ({
          ...category,
          expenses: category._count.expenses,
          _count: undefined,
        }));
      }
    } catch (error) {
      console.error("ERROR CATEGORIES: ", error);
      throw new Error("Error fetching user categories");
    }
  },
  ["categories"],
  { revalidate: 3600, tags: ["categories"] }
);
