"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function login() {
  try {
    await signIn("google", { redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("ERROR TYPE", error.type);
      console.error("ERROR", error);

      return {
        message: "Sign in with Google has failed",
      };
    }

    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
