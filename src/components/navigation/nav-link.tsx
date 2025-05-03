import clsx from "clsx";
import { focusRing } from "@/lib/utils";
import { RemixiconComponentType } from "@remixicon/react";
import { DrawerClose } from "../tremor-raw/ui/drawer";
import Link from "next/link";

type NavLinkProps = {
  isActive: boolean;
  href: string;
  name: string;
  icon: RemixiconComponentType;
  isMobile: boolean;
};

export default function NavLink({
  isActive,
  href,
  name,
  icon,
  isMobile,
}: NavLinkProps) {
  const Icon = icon;

  const navLink = (
    <Link
      href={href}
      className={clsx(
        isActive
          ? "bg-gray-950 text-white dark:bg-white dark:text-gray-950"
          : "bg-white text-gray-600 dark:bg-gray-950 dark:text-gray-400",
        "flex items-center gap-x-2.5 p-3 text-sm",
        focusRing
      )}
    >
      <Icon className="size-5 shrink-0" aria-hidden="true" />
      {name}
    </Link>
  );

  return isMobile ? <DrawerClose asChild>{navLink}</DrawerClose> : navLink;
}
