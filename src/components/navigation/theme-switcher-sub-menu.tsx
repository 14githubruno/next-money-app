import {
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuSubMenuTrigger,
} from "../tremor-raw/inputs/dropdown-menu";
import ThemeSwitcher from "./theme-switcher";

type ThemeSwitcherSubMenuProps = {
  isMobile: boolean;
};

/**
 *
 * @note This uses Tremor `DropdownSubMenu`, `DropdownMenuSubMenuTrigger` and `DropdownMenuSubMenuContent` to wrap the `ThemeSwitcher` in `dropdown-user-profile.tsx`
 */
export default function ThemeSwitcherSubMenu({
  isMobile,
}: ThemeSwitcherSubMenuProps) {
  return (
    <DropdownMenuSubMenu>
      <DropdownMenuSubMenuTrigger>Theme</DropdownMenuSubMenuTrigger>
      {/*  make sure to *always* hide dropdown theme switcher on desktop  */}
      <DropdownMenuSubMenuContent className={`${isMobile ? "lg:hidden" : ""}`}>
        <ThemeSwitcher />
      </DropdownMenuSubMenuContent>
    </DropdownMenuSubMenu>
  );
}
