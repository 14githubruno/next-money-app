"use client";

import { useRouter } from "next/navigation";
import { useActionState, useCallback } from "react";
import { createExpense, updateExpense } from "@/lib/actions/expense";
import {
  type CategoryTypes,
  type ExpenseTypes,
} from "@/lib/validations/schemas";
import { type ExpenseFormState } from "@/lib/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../inputs/select/select";

import { Checkbox } from "../inputs/checkbox/checkbox";

import { RadioGroup, RadioGroupItem } from "../inputs/radio-group/radio-group";

import DatePickerYearNavigation from "../inputs/date-picker/date-picker-year-navigation";

import { Textarea } from "../inputs/textarea/textarea";

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
    note: "",
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
            <Select
              name="categoryId"
              defaultValue={
                state.fieldValues?.categoryId !== ""
                  ? state.fieldValues?.categoryId
                  : undefined
              }
            >
              <SelectTrigger id="categoryId">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {categories &&
                  categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {getFieldError("categoryId")}
          </div>

          <div className="space-y-2">
            <label htmlFor="note" className="block text-sm font-medium">
              Note (Optional)
            </label>
            <Textarea
              id="note"
              name="note"
              rows={3}
              placeholder="Add details about this expense"
              defaultValue={state.fieldValues?.note ?? ""}
            />
            {getFieldError("note")}
          </div>

          <div className="space-y-2">
            <DatePickerYearNavigation
              nameAndId="expenseDate" // input name and id + htmlFor of label
              defaultValue={state.fieldValues?.expenseDate ?? new Date()}
            />
            {getFieldError("expenseDate")}
          </div>

          <div className="flex items-center">
            <label htmlFor="isConfirmed" className="ml-2 block text-sm">
              Is payment confirmed?
            </label>
            <Checkbox
              id="isConfirmed"
              name="isConfirmed"
              defaultChecked={Boolean(state.fieldValues?.isConfirmed)}
            />
            {getFieldError("isConfirmed")}
          </div>

          <div className="space-y-2 pl-6">
            <label className="block text-sm font-medium">Payment</label>
            <RadioGroup
              name="payment"
              defaultValue={state.fieldValues?.payment}
            >
              <div>
                <label htmlFor="cash">Cash</label>
                <RadioGroupItem value="CASH" id="cash" />
              </div>
              <div>
                <label htmlFor="card">Card</label>
                <RadioGroupItem value="CARD" id="card" />
              </div>
              <div>
                <label htmlFor="crypto">Crypto</label>
                <RadioGroupItem value="CRYPTO" id="crypto" />
              </div>
            </RadioGroup>
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
