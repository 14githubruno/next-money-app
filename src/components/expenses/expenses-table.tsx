"use client";

import { Badge } from "../tremor-raw/ui/badge";
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
import { type ExpenseTypes } from "@/lib/validations/schemas";
import { deleteExpense } from "@/lib/actions/expense";
import { Settings2 } from "lucide-react";
import { useToast } from "@/hooks/toast/use-toast";
import Link from "next/link";
import { useTransition } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

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
  currentPage: number;
  expenses: ExpenseTypes[];
};

export function ExpensesTable({ currentPage, expenses }: ExpensesTableProps) {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { toast } = useToast();

  const deleteCurrentExpense = (expenseId: string) => {
    startTransition(async () => {
      const isLast = expenses.length === 1;
      const result = await deleteExpense(expenseId);

      startTransition(() => {
        if (result.success) {
          toast({
            description: result.message,
            variant: "info",
          });

          // if it's the last expense (on the page) being deleted and there are more pages (< 1 page),
          // push user to previous one
          if (isLast && currentPage > 1) {
            const params = new URLSearchParams(searchParams);
            const pageNumber = currentPage - 1;
            params.set("page", pageNumber.toString());
            replace(`${pathname}?${params.toString()}`);
          }
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
    <TableRoot className="mt-8">
      <Table>
        <TableHead>
          <TableRow>
            {expensesTableHeadings.map((heading) => {
              return <TableHeaderCell key={heading}>{heading}</TableHeaderCell>;
            })}
          </TableRow>
        </TableHead>
        {expenses.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="py-4">no result</div>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
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
        )}
      </Table>
    </TableRoot>
  );
}
