"use client";

import { type ReactNode, useState, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../tremor-raw/inputs/dropdown-menu";
import ThemeSwitcherSubMenu from "./theme-switcher-sub-menu";
import Link from "next/link";
import SignOutDialog from "./sign-out-dialog";

type DropdownUserProfileProps = {
  children: ReactNode;
  align?: "center" | "start" | "end";
  userEmail: string | null | undefined;
  isMobile: boolean;
};

export default function DropdownUserProfile({
  children,
  align = "start",
  userEmail,
  isMobile,
}: DropdownUserProfileProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const focusRef = useRef<null | HTMLButtonElement>(null);
  const dropdownTriggerRef = useRef<null | HTMLButtonElement>(null);

  const handleDialogSelect = () => {
    focusRef.current = dropdownTriggerRef.current;
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (open === false) {
      setDropdownOpen(false);
    }
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={`${isMobile ? "lg:hidden" : ""}`} // make sure to *always* hide dropdown on desktop
        onCloseAutoFocus={(event) => {
          if (focusRef.current) {
            focusRef.current.focus();
            focusRef.current = null;
            event.preventDefault();
          }
        }}
        align={align}
      >
        <DropdownMenuLabel>{userEmail && userEmail}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <ThemeSwitcherSubMenu isMobile={isMobile} />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-0">
            <Link
              className="h-full w-full py-1.5 pr-1 pl-2"
              href={"/dashboard/account"}
              onClick={() => handleDialogOpenChange(false)}
            >
              Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <SignOutDialog
            onSelect={handleDialogSelect}
            onOpenChange={handleDialogOpenChange}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
