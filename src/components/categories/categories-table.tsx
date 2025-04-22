"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "../ui/table";
import DeleteDialog from "../ui/dialog/delete-dialog";
import Link from "next/link";
import { deleteCategory } from "@/lib/actions/category";
import { Settings2, Lock } from "lucide-react";
import { CategoryTypes } from "@/lib/validations/schemas";
import { useTransition } from "react";

const categoriesHeadings = ["Name", "Expenses", "Default", "Actions"];

type CategoriesTableProps = {
  categories: CategoryTypes[];
};

export function CategoriesTable({ categories }: CategoriesTableProps) {
  const [isPending, startTransition] = useTransition();

  const deleteCurrentCategory = (category: CategoryTypes) => {
    const { id, expenses, isDefault } = category;

    if (expenses && expenses.length) {
      alert("This category has expenses. It can't be deleted.");
      return;
    } else if (isDefault) {
      alert("This category is a default one. It can't be deleted");
      return;
    }

    startTransition(async () => {
      await deleteCategory(id);
    });
  };

  return (
    <>
      <div>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
          Overview of all your categories.
        </p>
      </div>
      <TableRoot className="mt-8">
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
            {categories.map((category) => {
              return (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    {category?.expenses ? category.expenses.length : 0}
                  </TableCell>
                  <TableCell>
                    {category.isDefault && <Lock className="h-4 w-4" />}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-4">
                      <Link href={`/dashboard/categories/${category.id}`}>
                        <Settings2 className="h-4 w-4" />
                      </Link>
                      <DeleteDialog
                        deleteAction={() => deleteCurrentCategory(category)}
                        isPending={isPending}
                        isDefaultCategory={category.isDefault}
                        itemKind="category"
                        itemData={category}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableRoot>
    </>
  );
}
