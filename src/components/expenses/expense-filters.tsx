"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Label } from "../tremor-raw/inputs/label";
import { Input } from "../tremor-raw/inputs/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../tremor-raw/inputs/select";

/**
 *
 * @note this is the form to filter expenses through search params
 */
export default function ExpenseFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((note) => {
    updateParams({ note });
  }, 300);

  const handleIsConfirmedChange = (isConfirmedToString: string) => {
    updateParams({ isConfirmed: isConfirmedToString });
  };

  const updateParams = (
    newParams: Record<string, string | null | undefined>
  ) => {
    const params = new URLSearchParams(searchParams);

    // during params updates, always set page 1 as default
    params.set("page", "1");

    for (const [key, value] of Object.entries(newParams)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form className="flex items-center gap-1">
      {/* search by note */}
      <Label className="sr-only" htmlFor="search">
        Search by note
      </Label>
      <Input
        type="text"
        id="search"
        placeholder="search by note"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("note")?.toString()}
      />

      {/* select confirmed or unconfirmed */}
      <Label className="sr-only" htmlFor="expenseIsConfirmed">
        Expense is confirmed
      </Label>
      <Select
        onValueChange={handleIsConfirmedChange}
        name="expenseIsConfirmed"
        defaultValue={searchParams.get("isConfirmed") ?? ""}
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
  );
}
