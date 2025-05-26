"use client";

import clsx from "clsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "../tremor-raw/ui/table";
import DeleteDialog from "../delete-dialog";
import { Button } from "../tremor-raw/ui/button";
import { deleteCategory } from "@/lib/actions/category";
import { CategoryTypes } from "@/lib/validations/schemas";
import { Fragment, useState, useMemo, useTransition } from "react";
import { useToast } from "@/hooks/toast/use-toast";
import useDebounceValue from "@/hooks/use-debounce-value";
import CategoryForm from "./category-form";
import { Label } from "../tremor-raw/inputs/label";
import { Input } from "../tremor-raw/inputs/input";
import { formatDate } from "@/lib/utils";

const categoriesHeadings = [
  "Created",
  "Name",
  "Expenses of the year",
  "Actions",
];

type CategoriesTableProps = {
  categoriesForTable: CategoryTypes[];
  categoriesWithAllExpenses: CategoryTypes[];
};

export default function CategoriesTable({
  categoriesForTable,
  categoriesWithAllExpenses,
}: CategoriesTableProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [filter, setFilter] = useState("");
  const debouncedFilter = useDebounceValue(filter, 300);

  const filteredCategories = useMemo(() => {
    return categoriesForTable.filter((cat) => {
      return cat.name.toLowerCase().includes(debouncedFilter.toLowerCase());
    });
  }, [debouncedFilter, categoriesForTable]);

  const deleteCurrentCategory = (category: CategoryTypes) => {
    const { id, expenses } = category;

    if (expenses && expenses > 0) {
      alert("This category has expenses. It can't be deleted.");
      return;
    }

    startTransition(async () => {
      const result = await deleteCategory(id);

      startTransition(() => {
        if (result.success) {
          toast({
            description: result.message,
            variant: "info",
          });
        } else {
          toast({
            description: result.message,
            variant: "error",
          });
        }
      });
    });
  };

  return (
    <Fragment>
      {/* category filter */}
      <div className={clsx("flex flex-col gap-1", "lg:flex-row")}>
        <form className="grow">
          {/* search category */}
          <Label className="sr-only" htmlFor="search">
            Search category
          </Label>
          <Input
            type="search"
            id="search"
            placeholder="search category"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            disabled={categoriesForTable.length === 0}
          />
        </form>
        <Button
          disabled={categoriesForTable.length === 0 || filter === ""}
          variant="light"
          onClick={() => setFilter("")}
        >
          Clear
        </Button>
      </div>

      <TableRoot>
        <Table>
          <TableHead>
            <TableRow>
              {categoriesHeadings.map((heading) => {
                return (
                  <TableHeaderCell key={heading}>{heading}</TableHeaderCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell>
                  <div className="py-4">no categories</div>
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => {
                return (
                  <TableRow key={category.id}>
                    <TableCell>
                      {formatDate(new Date(category.createdAt))}
                    </TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      {`${category.expenses}/${categoriesWithAllExpenses.find((cat) => cat.name === category.name)?.expenses}`}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-4">
                        <CategoryForm category={category} isEditing={true} />
                        <DeleteDialog
                          deleteAction={() => deleteCurrentCategory(category)}
                          isPending={isPending}
                          itemKind="category"
                          itemData={category}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableRoot>
    </Fragment>
  );
}
