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

/**
 * Create list of years based on current year `new Date().getFullYear()`
 * @note The list starts at year 2025 and always ends 2 years after the current year.
 */
export function generateListOfYears(): string[] {
  const years = [];
  const firstYear = 2025;
  const currentYear = new Date().getFullYear();
  const yearsAfterCurrentYear = 2;

  for (let i = firstYear; i <= currentYear + yearsAfterCurrentYear; i++) {
    years.push(i.toString());
  }

  return years;
}

/**
 * Centralize date formatting for tables
 */
export function formatDate(date: Date) {
  return date.toLocaleDateString();
}
