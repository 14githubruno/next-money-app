"use client";

import clsx from "clsx";
import type { User } from "next-auth";
import MobileSidenav from "./mobile-sidenav";
import { UserProfileDesktop, UserProfileMobile } from "./user-profile";
import Link from "next/link";
import NavLink from "./nav-link";
import { dashboardNavLinks } from "@/lib/static-data";
import { linkIsActive } from "@/lib/utils";
import { usePathname } from "next/navigation";

type SidenavProps = {
  user: User | undefined;
};

export default function Sidenav({ user }: SidenavProps) {
  const pathname = usePathname();

  return (
    <>
      {/* desktop sidenav */}
      <nav
        className={clsx(
          "hidden",
          "lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
        )}
      >
        <aside className="flex grow flex-col justify-between gap-y-6 overflow-y-auto border-r border-gray-200 p-4 dark:border-gray-800">
          <Link aria-label="link-to-home" href={"/"}>
            <div className="h-4 w-4 bg-gray-950 dark:bg-white"></div>
          </Link>

          <nav aria-label="dashboard navigation links">
            <ul role="list" className="space-y-3">
              {dashboardNavLinks.map((link) => {
                return (
                  <li
                    key={link.name}
                    className="border border-gray-300 dark:border-gray-800"
                  >
                    <NavLink
                      isMobile={false}
                      isActive={linkIsActive(pathname, link.href)}
                      {...link}
                    />
                  </li>
                );
              })}
            </ul>
          </nav>
          <UserProfileDesktop user={user} />
        </aside>
      </nav>
      {/* top navbar (mobile and tablet screens) */}
      <nav
        className={clsx(
          "sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-2 dark:border-gray-800",
          "sm:gap-x-6 sm:px-4",
          "lg:hidden"
        )}
      >
        <div
          className={clsx(
            "flex w-full items-center justify-between gap-1",
            "sm:gap-2"
          )}
        >
          <UserProfileMobile user={user} />
          <Link aria-label="link-to-home" href={"/"}>
            <div className="h-4 w-4 bg-gray-950 dark:bg-white"></div>
          </Link>
          <MobileSidenav />
        </div>
      </nav>
    </>
  );
}
