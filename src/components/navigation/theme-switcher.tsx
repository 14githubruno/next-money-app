"use client";

import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../tremor-raw/inputs/dropdown-menu";
import { useTheme } from "next-themes";
import { THEMES } from "@/lib/constants";
import { useState, useEffect } from "react";

/**
 *
 * @note This component uses Tremor `DropdownMenuRadioGroup` and `DropdownMenuRadioItem`
 */
export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenuRadioGroup
      value={theme}
      onValueChange={(value) => {
        setTheme(value);
      }}
    >
      {THEMES.map((theme) => {
        const Icon = theme.icon;
        return (
          <DropdownMenuRadioItem
            key={theme.value}
            aria-label={theme["aria-label"]}
            value={theme.value}
            iconType="check"
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            {theme.mode}
          </DropdownMenuRadioItem>
        );
      })}
    </DropdownMenuRadioGroup>
  );
}
