"use client";

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
      <nav className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <aside className="flex grow flex-col gap-y-6 overflow-y-auto border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
          <div className="pb-8">
            <Link aria-label="link-to-home" href={"/"}>
              <div className="h-4 w-4 bg-black dark:bg-white"></div>
            </Link>
          </div>

          <nav
            aria-label="dashboard navigation links"
            className="flex flex-1 flex-col space-y-10"
          >
            <ul role="list" className="space-y-2">
              {dashboardNavLinks.map((link) => {
                return (
                  <li key={link.name} className="border">
                    <NavLink
                      isActive={linkIsActive(pathname, link.href)}
                      {...link}
                    />
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-auto">
            <UserProfileDesktop user={user} />
          </div>
        </aside>
      </nav>
      {/* top navbar (mobile and tablet screens) */}
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-2 shadow-sm sm:gap-x-6 sm:px-4 lg:hidden dark:border-gray-800 dark:bg-gray-950">
        <div className="flex w-full items-center justify-between gap-1 sm:gap-2">
          <UserProfileMobile user={user} />
          <Link aria-label="link-to-home" href={"/"}>
            <div className="h-4 w-4 bg-black dark:bg-white"></div>
          </Link>
          <MobileSidenav />
        </div>
      </div>
    </>
  );
}
