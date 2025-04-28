"use client";

import { useState } from "react";
import { DatePicker } from "./tremor-raw/inputs/date-picker";
import { Fragment } from "react";

type DatePickerYearNavigationProps = {
  nameAndId: string;
  defaultValue: Date | undefined;
};

export default function DatePickerYearNavigation({
  nameAndId,
  defaultValue,
}: DatePickerYearNavigationProps) {
  const [date, setDate] = useState<Date | undefined>(
    typeof defaultValue === "string" ? new Date(defaultValue) : defaultValue
  );

  return (
    <Fragment>
      <p className="text-sm leading-none text-gray-900 dark:text-gray-50">
        Expense date
      </p>
      <DatePicker
        id={nameAndId}
        enableYearNavigation
        value={date}
        onChange={setDate}
        className="w-full"
      />
      {/* the input below will be passed in the formData when form action gets fired */}
      <input
        type="hidden"
        name={nameAndId}
        value={
          date
            ? date.toDateString()
            : defaultValue
              ? defaultValue.toDateString()
              : new Date().toDateString()
        }
      />
    </Fragment>
  );
}
