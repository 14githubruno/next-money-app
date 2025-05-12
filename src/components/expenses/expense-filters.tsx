"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { Label } from "../tremor-raw/inputs/label";
import { Input } from "../tremor-raw/inputs/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../tremor-raw/inputs/select";
import { Button } from "../tremor-raw/ui/button";
import { useQueryState, parseAsString } from "nuqs";
import { useTableFiltering } from "@/hooks/use-table-filtering";

/**
 *
 * @note this is the form to filter expenses through search params
 */
export default function ExpenseFilters() {
  const searchParams = useSearchParams();
  const { isFiltering, startTransition } = useTableFiltering();

  const [page, setPage] = useQueryState("page", { shallow: false });
  const [note, setNote] = useQueryState(
    "note",
    parseAsString.withOptions({
      startTransition,
      shallow: false,
      throttleMs: 800,
    })
  );
  const [isConfirmed, setIsConfirmed] = useQueryState(
    "isConfirmed",
    parseAsString.withOptions({ startTransition, shallow: false })
  );

  return (
    <div className={clsx("flex flex-col gap-1", "lg:flex-row")}>
      <form className="flex grow items-center gap-1">
        {/* search by note */}
        <Label className="sr-only" htmlFor="search">
          Search by note
        </Label>
        <Input
          type="text"
          id="search"
          placeholder="search by note"
          value={note ?? ""}
          onChange={(e) => setNote(e.target.value)}
        />

        {/* select confirmed or pending */}
        <Label className="sr-only" htmlFor="expenseIsConfirmed">
          Expense is confirmed
        </Label>
        <Select
          onValueChange={setIsConfirmed}
          name="expenseIsConfirmed"
          value={isConfirmed ?? ""}
        >
          <SelectTrigger id="expenseIsConfirmed">
            <SelectValue placeholder="expense confirmation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"true"}>{"true"}</SelectItem>
            <SelectItem value={"false"}>{"false"}</SelectItem>
          </SelectContent>
        </Select>
      </form>
      {/* clear filters 
      
      
       Disable button if:
       - is filtering
       - if there is only page param
       - if there are no params
      */}
      <Button
        disabled={
          isFiltering ||
          (searchParams.size === 1 && page !== null) ||
          searchParams.size === 0
        }
        variant="light"
        onClick={() => {
          setPage(null);
          setNote(null);
          setIsConfirmed(null);
        }}
      >
        Reset
      </Button>
    </div>
  );
}
