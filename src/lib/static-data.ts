import {
  RiHome2Line,
  RiListCheck,
  RiSettings5Line,
  RiComputerLine,
  RiMoonLine,
  RiSunLine,
} from "@remixicon/react";

// Dashboard sidenav links

export const dashboardNavLinks = [
  { name: "Overview", href: "/dashboard", icon: RiHome2Line },
  {
    name: "Categories",
    href: "/dashboard/categories",
    icon: RiSettings5Line,
  },
  { name: "Expenses", href: "/dashboard/expenses", icon: RiListCheck },
];

// Theme modes to populate theme-switcher

export const themes = [
  {
    mode: "Light",
    value: "light",
    ["aria-label"]: "Switch to light mode",
    icon: RiSunLine,
  },
  {
    mode: "Dark",
    value: "dark",
    ["aria-label"]: "Switch to dark mode",
    icon: RiMoonLine,
  },
  {
    mode: "System",
    value: "system",
    ["aria-label"]: "Switch to system mode",
    icon: RiComputerLine,
  },
];
