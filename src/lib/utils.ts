import { auth } from "@/auth";
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CategoryFormState, ExpenseFormState } from "./types";

// grab user id through auth.js

export async function grabUserId() {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id;
  return userId;
}

// prepare text in square brackets for dialog deletion

export function textInBrackets(text: string) {
  return `[${text}]`;
}

// convert true or false strings (coming from search params) to boolean
export function convertToBoolean(value: string | string[] | undefined) {
  switch (value) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return undefined;
  }
}

// set initial/default state to populate category and expense forms

export const categoryFormInitialState: CategoryFormState = {
  success: false,
  message: "",
  fieldValues: { name: "" },
};

export const expenseFormInitialState: ExpenseFormState = {
  success: false,
  message: "",
  fieldValues: {
    amount: 0.01,
    expenseDate: new Date(),
    isConfirmed: false,
    payment: "CASH",
    note: "",
    categoryId: "",
  },
};

// handle pagination (based on nextjs-learn example)
export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages
  if (currentPage < 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage === 3) {
    return [1, 2, 3, 4, "...", totalPages];
  }

  // If the current page is among the last 3 pages
  if (currentPage > totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  if (currentPage === 6) {
    return [
      1,
      2,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // If the current page is somewhere in the middle
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

// Tremor Raw cx [v0.0.0]

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}

// Tremor focusInput [v0.0.2]

export const focusInput = [
  // base
  "focus:ring-2",
  // ring color
  "focus:ring-blue-200 dark:focus:ring-blue-700/30",
  // border color
  "focus:border-blue-500 dark:focus:border-blue-700",
];

// Tremor Raw focusRing [v0.0.1]

export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500 dark:outline-blue-500",
];

// Tremor Raw hasErrorInput [v0.0.1]

export const hasErrorInput = [
  // base
  "ring-2",
  // border color
  "border-red-500 dark:border-red-700",
  // ring color
  "ring-red-200 dark:ring-red-700/30",
];
