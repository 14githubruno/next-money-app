import clsx from "clsx";
import { focusRing } from "@/lib/utils";
import { LucideIcon } from "lucide-react"; // https://github.com/lucide-icons/lucide/discussions/1869#discussioncomment-12718951
import { DrawerClose } from "../tremor-raw/ui/drawer";
import Link from "next/link";

type NavLinkProps = {
  isActive: boolean;
  href: string;
  name: string;
  icon: LucideIcon;
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
      aria-label="link to home"
      className={clsx(
        "flex items-center rounded-lg p-2 text-sm",
        isMobile && "gap-2",
        isMobile && isActive
          ? "bg-gray-950 text-white dark:bg-white dark:text-gray-950"
          : "bg-white text-gray-600 dark:bg-gray-950 dark:text-gray-400",
        !isMobile && isActive && "ring-2 transition-all",
        focusRing
      )}
    >
      <Icon
        className={clsx(
          "bg-red dark:bg-red size-5 overflow-hidden",
          "lg:size-6"
        )}
        aria-hidden="true"
      />
      {isMobile && name}
    </Link>
  );

  return isMobile ? <DrawerClose asChild>{navLink}</DrawerClose> : navLink;
}
