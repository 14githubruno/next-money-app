import type { CategoryFormState, ExpenseFormState } from "../types";
import { DEFAULT_COUNTRY, CURRENCIES } from "../constants";

/**
 * Check if current link is active.
 */
export function linkIsActive(pathname: string, href: string): boolean {
  return pathname === href;
}

/**
 * Prepare text in square brackets for dialog deletion.
 */
export function textInBrackets(text: string) {
  return `[${text}]`;
}

/**
 * Initial/default state of category form fields.
 */
export const categoryFormInitialState: CategoryFormState = {
  success: false,
  message: "",
  fieldValues: { name: "" },
};

/**
 * Initial/default state of form fields.
 */
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

/**
 * Handle table pagination.
 */
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

/**
 * Format price with currency (and optional locale).
 *
 * @note TO DO: decide if locale needs to be used
 */
export function formatPriceWithCurrency(
  amount: number,
  currency: string | undefined,
  locale = DEFAULT_COUNTRY.locale
): string {
  const validCurrency =
    currency && CURRENCIES.includes(currency)
      ? currency
      : DEFAULT_COUNTRY.currency;

  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: validCurrency,
    notation: "compact",
  }).format(amount);

  return formatted;
}
