import {
  LayoutDashboard,
  ListOrdered,
  ReceiptText,
  Sun,
  Moon,
  MonitorCog,
} from "lucide-react";

/**
 * Dashboard sidenav links
 */
export const dashboardNavLinks = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    tooltip: "Overview",
  },
  {
    name: "Categories",
    href: "/dashboard/categories",
    icon: ListOrdered,
    tooltip: "Categories",
  },
  {
    name: "Expenses",
    href: "/dashboard/expenses",
    icon: ReceiptText,
    tooltip: "Expenses",
  },
];

/**
 * Theme modes to populate theme-switcher
 */
export const themes = [
  {
    mode: "Light",
    value: "light",
    ["aria-label"]: "Switch to light mode",
    icon: Sun,
  },
  {
    mode: "Dark",
    value: "dark",
    ["aria-label"]: "Switch to dark mode",
    icon: Moon,
  },
  {
    mode: "System",
    value: "system",
    ["aria-label"]: "Switch to system mode",
    icon: MonitorCog,
  },
];
