import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../prisma/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [Google],
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
  },
});
