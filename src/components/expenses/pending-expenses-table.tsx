"use client";

import { useState } from "react";
import { confirmExpense } from "@/lib/actions/expense";
import { ExpenseTypes } from "@/lib/validations/schemas";
import { useTransition } from "react";
import { Table, TableBody, TableCell, TableRoot, TableRow } from "../ui/table";
import { Button } from "../ui/button/button";

type PendingExpensesTableProps = {
  expenses: ExpenseTypes[];
};

export default function PendingExpensesTable({
  expenses,
}: PendingExpensesTableProps) {
  const [isPending, startTransition] = useTransition();
  const [expenseGettingConfirmed, setExpenseGettingConfirmed] = useState("");

  const confirmPayment = (expenseId: string) => {
    setExpenseGettingConfirmed(expenseId);
    startTransition(async () => {
      await confirmExpense(expenseId);
    });
  };

  if (expenses.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 py-8 text-center">
        <p className="text-gray-500">No unconfirmed expenses found.</p>
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
                <TableCell>${expense.amount.toFixed(2)}</TableCell>
                <TableCell>
                  {new Date(expense.expenseDate).toLocaleDateString()}
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
                    className="inline-flex items-center gap-x-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium whitespace-nowrap text-blue-900 ring-blue-500/30"
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
