import authConfig from "../auth.config";
import NextAuth from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { geolocation } from "@vercel/functions";
import { countriesData } from "./lib/static-data";
import { DEFAULT_COUNTRY } from "./lib/utils";

const privateRoutes = ["/dashboard"];
const authRoutes = ["/sign-in"];

/**
 * Check if currency cookie exists. If it doesn't, set it.
 */
async function handleCookieCurrency(request: NextRequest) {
  const cookieStore = await cookies();
  const currencyExists = cookieStore.has("currency");

  if (currencyExists) return NextResponse.next();

  const { country = DEFAULT_COUNTRY.code } = geolocation(request);
  const countryInfo = countriesData.find((item) => item.cca2 === country);
  const currencies = countryInfo?.currencies;
  const currency = currencies
    ? Object.keys(currencies)[0]
    : DEFAULT_COUNTRY.currency;

  cookieStore.set({
    name: "currency",
    value: currency,
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
}

/**
 * Use only one of the two middleware options below:
 * - 1) Use middleware directly
 * @example export const { auth: middleware } = NextAuth(authConfig)
 *
 * - 2) Wrapped middleware option
 * @note Option `2` is used.
 */
const { auth } = NextAuth(authConfig);

export default auth(async (request) => {
  const isLoggedIn = !!request.auth;
  const pathname = request.nextUrl.pathname;

  const isPrivateRoute = pathname.startsWith(privateRoutes[0]);
  const isAuthRoute = authRoutes.includes(pathname);
  const isApiRoute = pathname.includes("/api");

  // allow auth.js logic
  if (isApiRoute) return NextResponse.next();

  // avoid user to sign in, if they are already signed in
  if (isLoggedIn && isAuthRoute)
    return NextResponse.redirect(new URL("/dashboard", request.url));

  // allow user to sign in, if they are not; plus, set currency as cookie if not found
  if (!isLoggedIn && isAuthRoute) {
    await handleCookieCurrency(request);
    return NextResponse.next();
  }

  // protect private routes
  if (!isLoggedIn && isPrivateRoute)
    return NextResponse.redirect(new URL("/sign-in", request.url));
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
