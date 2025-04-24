"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button/button";

// links
const links = [
  { name: "Home", href: "/dashboard" },
  {
    name: "Categories",
    href: "/dashboard/categories",
  },
  {
    name: "Expenses",
    href: "/dashboard/expenses",
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Button
            key={link.name}
            variant={pathname === link.href ? "base" : "secondary"}
            asChild
          >
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex items-center justify-center gap-2 text-sm font-medium md:flex-none md:justify-start"
              )}
            >
              <p className="hidden md:block">{link.name}</p>
            </Link>
          </Button>
        );
      })}
    </>
  );
}
