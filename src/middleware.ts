import authConfig from "../auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const privateRoutes = ["/profile"];
const authRoutes = ["/sign-in"];

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);

export default auth(async (request) => {
  const isLoggedIn = !!request.auth;
  const pathname = request.nextUrl.pathname;

  const isPrivateRoute = privateRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isApiRoute = pathname.includes("/api");

  // allow auth.js logic
  if (isApiRoute) return NextResponse.next();

  // avoid user to sign in, if they are already signed in
  if (isLoggedIn && isAuthRoute)
    return NextResponse.redirect(new URL("/profile", request.url));

  // allow user to sign in, if they are not
  if (!isLoggedIn && isAuthRoute) return NextResponse.next();

  // protect private routes
  if (!isLoggedIn && isPrivateRoute)
    return NextResponse.redirect(new URL("/sign-in", request.url));
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
