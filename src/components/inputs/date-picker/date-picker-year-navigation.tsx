"use client";

import { useState } from "react";
import { DatePicker } from ".";
import { dateToString } from "@/lib/utils";
import { Label } from "../label/label";

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
    <div className="flex flex-col items-center gap-y-4">
      <Label htmlFor={nameAndId}>Expense Date</Label>
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
    </div>
  );
}
