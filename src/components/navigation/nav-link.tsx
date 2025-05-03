import Link from "next/link";
import { cx, focusRing } from "@/lib/utils";
import { RemixiconComponentType } from "@remixicon/react";

type NavLinkProps = {
  isActive: boolean;
  href: string;
  name: string;
  icon: RemixiconComponentType;
};

export default function NavLink({ isActive, href, name, icon }: NavLinkProps) {
  const Icon = icon;
  return (
    <Link
      href={href}
      className={cx(
        isActive
          ? "bg-gray-950 text-white dark:bg-white dark:text-gray-950"
          : "bg-white text-gray-950 dark:bg-gray-950 dark:text-white",
        "flex items-center gap-x-2.5 px-3 py-2.5 text-sm font-medium",
        focusRing
      )}
    >
      <Icon className="size-5 shrink-0" aria-hidden="true" />
      {name}
    </Link>
  );
}
