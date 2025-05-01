"use client";

import type { ReactNode } from "react";
import type { User } from "next-auth";
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
import { useState, useRef } from "react";

type DropdownUserProfileProps = {
  children: ReactNode;
  align?: "center" | "start" | "end";
  user: User | undefined;
};

export default function DropdownUserProfile({
  children,
  align = "start",
  user,
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
        onCloseAutoFocus={(event) => {
          if (focusRef.current) {
            focusRef.current.focus();
            focusRef.current = null;
            event.preventDefault();
          }
        }}
        align={align}
      >
        <DropdownMenuLabel>
          {user && user.email && user.email}
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <ThemeSwitcherSubMenu />
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
