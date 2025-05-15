"use client";

import { Button } from "../tremor-raw/ui/button";
import DropdownUserProfile from "./dropdown-user-profile";
import { cx } from "@/lib/utils/tremor-raw/utils";

type UserProfileProps = {
  userName: string | null | undefined;
  userEmail: string | null | undefined;
  isMobile: boolean;
};

export function UserProfile({
  userName,
  userEmail,
  isMobile,
}: UserProfileProps) {
  return (
    <DropdownUserProfile userEmail={userEmail} isMobile={isMobile}>
      <Button
        aria-label="User settings"
        variant="ghost"
        className={cx(
          "group flex items-center p-1 text-sm font-medium text-gray-900",
          "hover:bg-gray-100 hover:dark:bg-gray-400/10",
          "data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-400/10"
        )}
      >
        <span
          className={cx(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            "border border-gray-300 dark:border-gray-800",
            "bg-white dark:bg-gray-950",
            "text-xs text-gray-700 dark:text-gray-300"
          )}
          aria-hidden="true"
        >
          {userName && userName.slice(0, 1).toUpperCase()}
        </span>
      </Button>
    </DropdownUserProfile>
  );
}
