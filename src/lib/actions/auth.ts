"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

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
