import { prisma } from "../../../prisma/prisma";
import { unstable_cache } from "next/cache";

/**
 * This file contains all the user-related queries
 * that are NOT server actions.
 * =========================================================
 */

/**
 * GET USER DB
 * ========================================================
 */
export const getUserDB = unstable_cache(
  async <T>(userId: string | undefined, filters?: Record<string, T>) => {
    try {
      const userDB = await prisma.user.findUnique({
        where: {
          id: userId,
          ...filters,
        },
        select: {
          createdAt: true, // grab only createdAt field for now
        },
      });

      return userDB;
    } catch (error) {
      console.error("ERROR USER DB: ", error);
      throw new Error("Error fetching user db");
    }
  },
  ["userDB"],
  { revalidate: 3600, tags: ["userDB"] }
);
