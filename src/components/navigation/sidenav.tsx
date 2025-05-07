"use client";

import clsx from "clsx";
import type { User } from "next-auth";
import MobileSidenav from "./mobile-sidenav";
import { UserProfile } from "./user-profile";
import { dashboardNavLinks } from "@/lib/static-data";
import { linkIsActive } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Tooltip } from "../tremor-raw/ui/tooltip";
import Logo from "../global/logo";
import NavLink from "./nav-link";

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
          "lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-sidebar lg:flex-col"
        )}
      >
        <aside
          className={clsx(
            "flex grow flex-col items-center justify-between gap-y-6 overflow-y-auto p-4",
            "border-r border-gray-200 dark:border-gray-800"
          )}
        >
          <Logo isMobile={false} />
          <nav aria-label="dashboard navigation links">
            <ul
              role="list"
              className="flex flex-col items-center justify-center gap-3"
            >
              {dashboardNavLinks.map((link) => {
                const { tooltip, href } = link;
                return (
                  <Tooltip asChild side="right" content={tooltip} key={tooltip}>
                    <li className="rounded-full border border-gray-300 dark:border-gray-800">
                      <NavLink
                        isMobile={false}
                        isActive={linkIsActive(pathname, href)}
                        {...link}
                      />
                    </li>
                  </Tooltip>
                );
              })}
            </ul>
          </nav>
          <UserProfile isMobile={false} user={user} />
        </aside>
      </nav>
      {/* top navbar (mobile and tablet screens) */}
      <nav
        className={clsx(
          "h-[var(--height-mobile-nav)] w-full px-2",
          "fixed top-0 z-50 flex items-center justify-between",
          "border-b border-gray-200 dark:border-gray-800",
          "bg-white/95 dark:bg-gray-950/95",
          "shadow-xs dark:shadow-gray-900",
          "lg:hidden"
        )}
      >
        <div className="flex w-full items-center justify-between px-2">
          <UserProfile isMobile={true} user={user} />
          <Logo isMobile={true} />
          <MobileSidenav />
        </div>
      </nav>
    </>
  );
}
