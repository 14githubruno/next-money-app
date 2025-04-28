import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../tremor-raw/ui/drawer";
import { Button } from "../tremor-raw/ui/button";
import { RiMenuLine } from "@remixicon/react";
import NavLink from "./nav-link";
import { usePathname } from "next/navigation";
import { dashboardNavLinks } from "@/lib/static-data";
import { linkIsActive } from "@/lib/utils";

export default function MobileSidenav() {
  const pathname = usePathname();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          aria-label="open sidenav"
          className="group flex items-center rounded-md p-2 text-sm font-medium hover:bg-gray-100 data-[state=open]:bg-gray-100 hover:dark:bg-gray-400/10 dark:data-[state=open]:bg-gray-400/10"
        >
          <RiMenuLine
            className="size-6 shrink-0 sm:size-5"
            aria-hidden="true"
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="sm:max-w-lg">
        <DrawerHeader>
          <DrawerTitle>Retail Analytics</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <nav
            aria-label="dashboard navigation links"
            className="flex flex-1 flex-col space-y-10"
          >
            <ul role="list" className="space-y-2">
              {dashboardNavLinks.map((link) => (
                <li key={link.name}>
                  <DrawerClose asChild>
                    <NavLink
                      isActive={linkIsActive(pathname, link.href)}
                      {...link}
                    />
                  </DrawerClose>
                </li>
              ))}
            </ul>
          </nav>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
