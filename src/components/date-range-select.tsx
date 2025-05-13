"use client";

import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./tremor-raw/inputs/select";
import { Label } from "./tremor-raw/inputs/label";
import { setDateRange } from "@/lib/actions/cookie";
import { generateListOfYears } from "@/lib/utils";
import { useActionState, useRef, useMemo } from "react";
import { usePathname, useParams } from "next/navigation";

type DateRangeSelectProps = {
  dateRange: string | undefined;
};

export default function DateRangeSelect({ dateRange }: DateRangeSelectProps) {
  const years = useMemo(() => {
    return generateListOfYears();
  }, []);

  // do not display the select date range on the single expense page
  const pathname = usePathname();
  const params = useParams();
  const isSingleExpensePage = pathname.includes("expenses") && params.id;

  const [state, formAction, pending] = useActionState(setDateRange, {
    dateRange:
      dateRange && years.includes(dateRange)
        ? dateRange
        : new Date().getFullYear().toString(),
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const fireForm = () => {
    if (formRef.current !== null) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <form
      className={clsx(isSingleExpensePage && "hidden", "lg:w-fit")}
      ref={formRef}
      action={formAction}
    >
      <div className="space-y-2">
        <Label htmlFor="dateRange">Expenses year</Label>
        <Select
          name="dateRange"
          defaultValue={state.dateRange}
          onValueChange={fireForm}
          disabled={pending}
        >
          <SelectTrigger id="dateRange">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="h-3/6">
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}
