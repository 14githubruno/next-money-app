import clsx from "clsx";
import { Fragment } from "react";
import { formatPriceWithCurrency } from "@/lib/utils";

type ExpensesSliceLabel = {
  expensesAreConfirmed: boolean;
  expensesLength: number;
  expensesAmount: number;
  currency: string | undefined;
};

/**
 * It renders two paragraphs:
 * - the number of confirmed/pending expenses.
 * - the total amount of confirmed/pending expenses.
 * @note This component is rendered in `expenses-slice.tsx` component.
 */
export default function ExpensesSliceLabel({
  expensesAreConfirmed,
  expensesLength,
  expensesAmount,
  currency,
}: ExpensesSliceLabel) {
  // set text to display
  const text = expensesAreConfirmed ? "confirmed" : "pending";

  // paragraphs classes
  const paragraphClasses = "rounded-lg p-3 text-black dark:text-black";
  const firstParagraphBG = expensesAreConfirmed
    ? "bg-emerald-50"
    : "bg-purple-50";
  const secondParagraphBG = expensesAreConfirmed
    ? "bg-emerald-100"
    : "bg-purple-200";

  // span classes
  const spanClasses = "font-bold";
  const spanTextColor = expensesAreConfirmed
    ? "text-emerald-700"
    : "text-[#8659c6]";

  return (
    <Fragment>
      <p className={clsx(paragraphClasses, firstParagraphBG)}>
        {"You have "}
        <span className={clsx(spanClasses, spanTextColor)}>
          {expensesLength}
        </span>
        {` ${text} `}
        {expensesLength === 1 ? "payment" : "payments"}
      </p>
      <p className={clsx(paragraphClasses, secondParagraphBG)}>
        {`Total ${text}: `}
        <span className={clsx(spanClasses, spanTextColor)}>
          {formatPriceWithCurrency(expensesAmount, currency)}
        </span>
      </p>
    </Fragment>
  );
}
