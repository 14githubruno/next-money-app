"use client";

import { NotebookTabs, HomeIcon, FileChartColumnIcon } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

// links
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Categories",
    href: "/dashboard/categories",
    icon: NotebookTabs,
  },
  {
    name: "Expenses",
    href: "/dashboard/expenses",
    icon: FileChartColumnIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex grow items-center justify-center gap-2 rounded-md border border-[#8f63cd6e] p-3 text-sm font-medium hover:bg-[#8659c6] hover:text-white md:flex-none md:justify-start md:p-2 md:px-3",
              pathname === link.href && "bg-[#8659c6] text-white"
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
