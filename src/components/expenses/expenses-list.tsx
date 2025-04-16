"use client";

import clsx from "clsx";
import Link from "next/link";
import { useTransition } from "react";
import { deleteExpense } from "@/lib/actions/expense";
import { Search, Pencil, Trash } from "lucide-react";
import { type ExpenseTypes } from "@/lib/validations/schemas";

type ExpenseListProps = {
  expenses: ExpenseTypes[];
};

const expensesTableHeadings = [
  "Date",
  "Category",
  "Amount",
  "Note",
  "Confirmed",
  "Type",
  "Actions",
];

export function ExpensesList({ expenses }: ExpenseListProps) {
  const [isPending, startTransition] = useTransition();

  const deleteCurrentExpense = (expenseId: string) => {
    startTransition(async () => {
      await deleteExpense(expenseId);
    });
  };

  return (
    <div>
      {expenses.length === 0 ? (
        <div className="py-8 text-center text-gray-500">No expenses found</div>
      ) : (
        <div className="relative h-[30rem] overflow-x-auto">
          <table className="min-w-full table-fixed divide-y divide-gray-200">
            <thead className="sticky top-0 z-10 bg-gray-50">
              <tr>
                {expensesTableHeadings.map((heading) => {
                  return (
                    <th
                      key={heading}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      {heading}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className={clsx(
                    "hover:bg-gray-50",
                    isPending && "opacity-25"
                  )}
                >
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {new Date(expense.expenseDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 whitespace-nowrap">
                    <span className="inline-flex rounded-full px-2 text-sm leading-5 font-semibold">
                      {expense.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                    ${expense.amount.toFixed(2)}
                  </td>
                  <td className="truncate px-6 py-4 text-sm text-gray-500">
                    {expense.note || "-"}
                  </td>
                  <td className="truncate px-6 py-4 text-sm text-gray-500">
                    <div
                      className={clsx(
                        "flex items-center justify-center rounded-sm border p-1",
                        expense.isConfirmed
                          ? "gap-x-2 bg-emerald-50 text-emerald-700"
                          : "bg-gray-100 text-gray-500"
                      )}
                    >
                      {expense.isConfirmed ? "confirmed" : "to confirm"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    <div className="flex space-x-2">
                      {expense.payment.toLowerCase()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                    <div className="flex space-x-4">
                      <Link href={`/dashboard/expenses/${expense.id}/view`}>
                        <Search className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                      <Link href={`/dashboard/expenses/${expense.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                      <button
                        onClick={() => deleteCurrentExpense(expense.id)}
                        className="cursor-pointer"
                        disabled={isPending}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
