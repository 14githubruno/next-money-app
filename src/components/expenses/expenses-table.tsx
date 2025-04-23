"use client";

import { Badge } from "../ui/badge";

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
import { type ExpenseTypes } from "@/lib/validations/schemas";
import Link from "next/link";
import { useTransition } from "react";
import { deleteExpense } from "@/lib/actions/expense";
import { Settings2 } from "lucide-react";
import { useToast } from "@/hooks/toast/use-toast";

const expensesTableHeadings = [
  "Date",
  "Category",
  "Amount",
  "Note",
  "Confirmed",
  "Type",
  "Actions",
];

type ExpensesTableProps = {
  expenses: ExpenseTypes[];
};

export function ExpensesTable({ expenses }: ExpensesTableProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const deleteCurrentExpense = (expenseId: string) => {
    startTransition(async () => {
      const result = await deleteExpense(expenseId);

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
    <>
      <div>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
          Overview of all your expenses.
        </p>
      </div>
      <TableRoot className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              {expensesTableHeadings.map((heading) => {
                return (
                  <TableHeaderCell key={heading}>{heading}</TableHeaderCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>
                  {new Date(expense.expenseDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{expense.category.name}</TableCell>
                <TableCell>{expense.amount.toFixed(2)}</TableCell>
                <TableCell>{expense.note || "-"}</TableCell>
                <TableCell>
                  <Badge variant={expense.isConfirmed ? "success" : "warning"}>
                    {expense.isConfirmed ? "confirmed" : "to confirm"}
                  </Badge>
                </TableCell>
                <TableCell>{expense.payment.toLowerCase()}</TableCell>
                <TableCell>
                  <div className="flex space-x-4">
                    <Link href={`/dashboard/expenses/${expense.id}`}>
                      <Settings2 className="h-4 w-4" />
                    </Link>
                    <DeleteDialog
                      deleteAction={() => deleteCurrentExpense(expense.id)}
                      isPending={isPending}
                      itemKind="expense"
                      itemData={expense}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </>
  );
}
