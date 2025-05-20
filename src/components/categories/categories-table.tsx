"use client";

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
import { deleteCategory } from "@/lib/actions/category";
import { Lock } from "lucide-react";
import { CategoryTypes } from "@/lib/validations/schemas";
import { useTransition } from "react";
import { useToast } from "@/hooks/toast/use-toast";
import CategoryForm from "./category-form";

const categoriesHeadings = [
  "Name",
  "Expenses of the year",
  "Default",
  "Actions",
];

type CategoriesTableProps = {
  categoriesForTable: CategoryTypes[];
  categoriesWithAllExpenses: CategoryTypes[];
};

export function CategoriesTable({
  categoriesForTable,
  categoriesWithAllExpenses,
}: CategoriesTableProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const deleteCurrentCategory = (category: CategoryTypes) => {
    const { id, expenses, isDefault } = category;

    if (expenses && expenses > 0) {
      alert("This category has expenses. It can't be deleted.");
      return;
    } else if (isDefault) {
      alert("This category is a default one. It can't be deleted");
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
    <TableRoot>
      <Table>
        <TableHead>
          <TableRow>
            {categoriesHeadings.map((heading) => {
              return <TableHeaderCell key={heading}>{heading}</TableHeaderCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {categoriesForTable.map((category) => {
            return (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  {`${category.expenses}/${categoriesWithAllExpenses.find((cat) => cat.name === category.name)?.expenses}`}
                </TableCell>
                <TableCell>
                  {category.isDefault && <Lock className="h-4 w-4" />}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-4">
                    <CategoryForm category={category} isEditing={true} />
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
  );
}
