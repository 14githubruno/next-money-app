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
import { CategoryTypes } from "@/lib/validations/schemas";

type ExpensesFiltersProps = {
  numOfExpenses: number;
  categories: CategoryTypes[];
};

/**
 *
 * @note this is the form to filter expenses through search params
 */
export default function ExpensesFilters({
  numOfExpenses,
  categories,
}: ExpensesFiltersProps) {
  const searchParams = useSearchParams();
  const { isFiltering, startTransition } = useTableFiltering();

  // if no expenses even without params, disable filters
  const noExpenses = numOfExpenses === 0 && searchParams.size === 0;

  // query params states
  const [page, setPage] = useQueryState("page", {
    defaultValue: "1",
    shallow: false,
  });

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

  const [category, setCategory] = useQueryState(
    "category",
    parseAsString.withOptions({
      startTransition,
      shallow: false,
    })
  );

  // clear filters
  function clearFilters() {
    setPage(null);
    setNote(null);
    setIsConfirmed(null);
    setCategory(null);
  }

  return (
    <div className={clsx("flex flex-col gap-2", "lg:flex-row")}>
      <form
        className={clsx("flex grow flex-col items-center gap-2", "lg:flex-row")}
      >
        {/* search by note */}
        <Label className="sr-only" htmlFor="search">
          Search by note
        </Label>
        <Input
          type="search"
          id="search"
          placeholder="search by note"
          value={note ?? ""}
          onChange={(e) => setNote(e.target.value)}
          disabled={noExpenses}
        />

        {/* search by category */}
        <Label className="sr-only" htmlFor="search">
          Select by category
        </Label>
        <Select
          onValueChange={(value) => {
            setCategory(value);
            setPage("1");
          }}
          name="category"
          value={category ?? ""}
          disabled={noExpenses}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="select by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => {
              return (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        {/* select confirmed or pending */}
        <Label className="sr-only" htmlFor="expenseIsConfirmed">
          Expense is confirmed
        </Label>
        <Select
          onValueChange={(value) => {
            setIsConfirmed(value);
            setPage("1");
          }}
          name="expenseIsConfirmed"
          value={isConfirmed ?? ""}
          disabled={noExpenses}
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
          (searchParams.size === 1 && page !== "1") ||
          searchParams.size === 0
        }
        variant="light"
        onClick={clearFilters}
      >
        Clear filters
      </Button>
    </div>
  );
}
