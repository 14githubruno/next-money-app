"use client";

import { confirmExpense } from "@/lib/actions/expense";
import { ExpenseTypes } from "@/lib/validations/schemas";
import { useState, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRoot,
  TableRow,
} from "../tremor-raw/ui/table";
import { Button } from "../tremor-raw/ui/button";
import { useToast } from "@/hooks/toast/use-toast";
import { formatPriceWithCurrency, formatDate } from "@/lib/utils";

type PendingExpensesTableProps = {
  expenses: ExpenseTypes[];
  count: number;
  currency: string | undefined;
};

export default function PendingExpensesTable({
  expenses,
  count,
  currency,
}: PendingExpensesTableProps) {
  const [isPending, startTransition] = useTransition();
  const [expenseGettingConfirmed, setExpenseGettingConfirmed] = useState("");
  const { toast } = useToast();

  const confirmPayment = (expenseId: string) => {
    setExpenseGettingConfirmed(expenseId);
    startTransition(async () => {
      const result = await confirmExpense(expenseId);

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

  if (count === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-md bg-gray-50 dark:bg-neutral-900">
        <p className="text-gray-500 dark:text-white">
          No pending expenses found
        </p>
      </div>
    );
  }

  return (
    <TableRoot>
      <Table>
        <TableBody>
          {expenses.map((expense) => {
            return (
              <TableRow key={expense.id}>
                <TableCell>{expense.category.name}</TableCell>
                <TableCell>
                  {formatPriceWithCurrency(expense.amount, currency)}
                </TableCell>
                <TableCell>
                  {formatDate(new Date(expense.expenseDate))}
                </TableCell>
                <TableCell>{expense.note || "-"}</TableCell>
                <TableCell>
                  <Button
                    variant="secondary"
                    onClick={() => confirmPayment(expense.id)}
                    disabled={isPending}
                    isLoading={
                      isPending && expenseGettingConfirmed === expense.id
                    }
                    className="inline-flex items-center gap-x-1 border-none bg-blue-50 px-2 py-1 text-xs font-medium whitespace-nowrap text-blue-900 ring-blue-500/30"
                  >
                    {isPending && expenseGettingConfirmed === expense.id ? (
                      <>confirming...</>
                    ) : (
                      <>confirm</>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableRoot>
  );
}
