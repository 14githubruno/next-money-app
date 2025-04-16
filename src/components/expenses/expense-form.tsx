"use client";

import { useRouter } from "next/navigation";
import { useActionState, useCallback } from "react";
import { createExpense, updateExpense } from "@/lib/actions/expense";
import {
  type CategoryTypes,
  type ExpenseTypes,
} from "@/lib/validations/schemas";
import { type ExpenseFormState } from "@/lib/types";

type ExpenseFormProps = {
  userId: string;
  categories: CategoryTypes[];
  expense?: ExpenseTypes;
  isEditing?: boolean;
};

const initState: ExpenseFormState = {
  success: false,
  message: "",
  fieldValues: {
    amount: 0.01,
    expenseDate: new Date(),
    isConfirmed: true,
    payment: "CASH",
    note: "-",
    categoryId: "",
  },
};

export function ExpenseForm({
  userId,
  categories,
  expense,
  isEditing = false,
}: ExpenseFormProps) {
  const router = useRouter();

  // Bind userId and set action state
  const createExpenseByPassingUserId = createExpense.bind(null, userId);
  const updateExpenseByPassingUserIdAndExpenseId = updateExpense.bind(
    null,
    userId,
    isEditing && expense ? expense.id : undefined
  );

  const action =
    expense && isEditing
      ? updateExpenseByPassingUserIdAndExpenseId
      : createExpenseByPassingUserId;

  const initialState =
    expense && isEditing
      ? { ...initState, fieldValues: { ...expense } }
      : { ...initState };

  const [state, formAction, pending] = useActionState(action, initialState);

  // Helper function to display field errors
  const getFieldError = useCallback(
    (fieldName: string) => {
      return state?.errors && state.errors[fieldName]?.[0] ? (
        <p className="mt-1 text-red-600">{state?.errors[fieldName][0]}</p>
      ) : null;
    },
    [state]
  );

  return (
    <>
      <form action={formAction} className="mx-auto w-full max-w-lg">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">
            {isEditing ? "Edit Expense" : "Add New Expense"}
          </h2>

          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium">
              Amount
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                $
              </span>
              <input
                type="number"
                id="amount"
                name="amount"
                step="0.01"
                min="0"
                placeholder="0.00"
                defaultValue={state.fieldValues?.amount}
                required
                className={`w-full rounded-md border border-gray-300 px-3 py-2 pl-8 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none`}
              />
            </div>
            {getFieldError("amount")}
          </div>

          <div className="space-y-2">
            <label htmlFor="categoryId" className="block text-sm font-medium">
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              required
              defaultValue={state.fieldValues?.categoryId}
              className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none`}
            >
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
            {getFieldError("categoryId")}
          </div>

          <div className="space-y-2">
            <label htmlFor="note" className="block text-sm font-medium">
              Note (Optional)
            </label>
            <textarea
              id="note"
              name="note"
              rows={3}
              placeholder="Add details about this expense"
              defaultValue={state.fieldValues?.note ?? ""}
              className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none`}
            />
            {getFieldError("note")}
          </div>

          <div className="space-y-2">
            <label htmlFor="expenseDate" className="block text-sm font-medium">
              Date
            </label>
            <input
              type="date"
              id="expenseDate"
              name="expenseDate"
              defaultValue={
                state.fieldValues?.expenseDate
                  ? new Date(state.fieldValues.expenseDate)
                      .toISOString()
                      .split("T")[0]
                  : new Date().toISOString().split("T")[0]
              }
              required
              className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none`}
            />
            {getFieldError("expenseDate")}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isConfirmed"
              name="isConfirmed"
              defaultChecked={Boolean(state.fieldValues?.isConfirmed)}
              className="h-4 w-4 rounded border-gray-300 focus:ring-black"
            />
            <label htmlFor="isConfirmed" className="ml-2 block text-sm">
              Is payment confirmed?
            </label>
            {getFieldError("isConfirmed")}
          </div>

          <div className="space-y-2 pl-6">
            <label className="block text-sm font-medium">Payment</label>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="CASH"
                  defaultChecked={state.fieldValues?.payment === "CASH"}
                  className="h-4 w-4 border-gray-300 focus:ring-black focus:ring-offset-2"
                />
                <span className="ml-2">Cash</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="CARD"
                  defaultChecked={state.fieldValues?.payment === "CARD"}
                  className="h-4 w-4 border-gray-300 text-black focus:ring-black focus:ring-offset-2"
                />
                <span className="ml-2">Card</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="CRYPTO"
                  defaultChecked={state.fieldValues?.payment === "CRYPTO"}
                  className="h-4 w-4 border-gray-300 focus:ring-black focus:ring-offset-2"
                />
                <span className="ml-2">Crypto</span>
              </label>
            </div>
            {getFieldError("payment")}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="rounded-md border border-transparent bg-[#8659c6] px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending
                ? "Saving..."
                : isEditing
                  ? "Update Expense"
                  : "Create Expense"}
            </button>
          </div>
        </div>
      </form>
      {state?.message && !state.success && (
        <p className="mx-auto w-full max-w-lg">{state.message}</p>
      )}
    </>
  );
}
