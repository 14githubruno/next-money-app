import NextAuth from "next-auth";
import authConfig from "../auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../prisma/prisma";
import { createDefaultCategories } from "./lib/queries/category";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub, // pass to session.user MongoDB id
        },
      };
    },

    async signIn({ user }) {
      const userId = user?.id;

      if (userId) {
        await createDefaultCategories(userId);
      }

      return true;
    },
  },
});
