"use client";

import { useState } from "react";
import { confirmExpense } from "@/lib/actions/expense";
import { Loader2 } from "lucide-react";
import { ExpenseTypes } from "@/lib/validations/schemas";
import { useTransition } from "react";

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
    <div className="overflow-x-auto rounded-sm border border-purple-100">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="divide-y divide-gray-200 bg-white">
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {expense.category.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  ${expense.amount.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {new Date(expense.expenseDate).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="max-w-xs truncate text-sm text-gray-500">
                  {expense.note || "-"}
                </div>
              </td>
              <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                <button
                  onClick={() => confirmPayment(expense.id)}
                  disabled={isPending}
                  className="inline-flex cursor-pointer items-center rounded-md border border-transparent bg-[#792882] px-3 py-1.5 text-xs font-medium text-white shadow-sm focus:ring-2 focus:ring-[#1e502f] focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isPending && expenseGettingConfirmed === expense.id ? (
                    <>
                      <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                      Confirming...
                    </>
                  ) : (
                    <>Confirm</>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
