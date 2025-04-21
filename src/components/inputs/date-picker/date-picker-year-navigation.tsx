"use client";

import { useState } from "react";
import { DatePicker } from ".";
import { dateToString } from "@/lib/utils";
import { Fragment } from "react";

type DatePickerYearNavigationProps = {
  nameAndId: string;
  defaultValue: Date;
};

export default function DatePickerYearNavigation({
  nameAndId,
  defaultValue,
}: DatePickerYearNavigationProps) {
  const [date, setDate] = useState<Date | undefined>(defaultValue);

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
        defaultValue={dateToString(date) ?? dateToString(defaultValue)}
      />
    </Fragment>
  );
}
