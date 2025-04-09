"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function login() {
  try {
    await signIn("google", { redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("ERROR TYPE LOGIN", error.type);
      console.error("ERROR LOGIN", error);

      return {
        message: "Sign in with Google has failed",
      };
    }

    throw error;
  }
}

export async function logout() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("ERROR TYPE LOGOUT", error.type);
      console.error("ERROR LOGOUT", error);

      return {
        message: "Sign out has failed",
      };
    }

    throw error;
  }
}
