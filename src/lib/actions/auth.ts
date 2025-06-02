"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { prisma } from "../../../prisma/prisma";
import {
  getUser,
  PredictableError,
  clearCookies,
} from "../utils/server-only-utils";
import { redirect } from "next/navigation";

/**
 * SIGN IN
 * ========================================================
 */
export async function login() {
  try {
    await signIn("google", { redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("ERROR TYPE LOGIN", error.type);
      throw new Error("Google sign in failed");
    }

    throw error;
  }
}

/**
 * SIGN OUT
 * ========================================================
 */
export async function logout() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("ERROR TYPE LOGOUT", error.type);
      throw new Error("Sign out failed");
    }

    throw error;
  }
}

/**
 * DELETE ACCOUNT
 */
export async function deleteAccount() {
  const { userId } = await getUser();

  let isDeleted: boolean = false;

  try {
    // With cascade deletion set in prisma schemas,
    // deleting the user will automatically delete all related records
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    if (!deletedUser) {
      throw new PredictableError("Failed to delete account");
    } else {
      isDeleted = true;
      await clearCookies();
    }

    return { success: true, message: "Account deleted" };
  } catch (error) {
    if (error instanceof PredictableError) {
      return { success: false, error: error.message };
    }

    throw new Error("Error deleting account");
  } finally {
    if (isDeleted) {
      redirect("/");
    }
  }
}
