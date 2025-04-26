import {
  DropdownMenuSubMenu,
  DropdownMenuSubMenuContent,
  DropdownMenuSubMenuTrigger,
} from "../inputs/dropdown-menu";
import ThemeSwitcher from "./theme-switcher";

/**
 *
 * @note This uses Tremor `DropdownSubMenu`, `DropdownMenuSubMenuTrigger` and `DropdownMenuSubMenuContent` to wrap the `ThemeSwitcher` in `dropdown-user-profile.tsx`
 */
export default function ThemeSwitcherSubMenu() {
  return (
    <DropdownMenuSubMenu>
      <DropdownMenuSubMenuTrigger>Theme</DropdownMenuSubMenuTrigger>
      <DropdownMenuSubMenuContent>
        <ThemeSwitcher />
      </DropdownMenuSubMenuContent>
    </DropdownMenuSubMenu>
  );
}
