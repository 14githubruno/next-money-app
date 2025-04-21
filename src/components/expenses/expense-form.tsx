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

import { Switch } from "../inputs/switch/switch";

import { RadioGroup, RadioGroupItem } from "../inputs/radio-group/radio-group";

import DatePickerYearNavigation from "../inputs/date-picker/date-picker-year-navigation";

import { Textarea } from "../inputs/textarea/textarea";

import { Input } from "../inputs/input/input";

import { Button } from "../ui/button/button";

import { Label } from "../inputs/label/label";

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
      <h2 className="text-2xl font-bold">
        {isEditing ? "Edit Expense" : "Add New Expense"}
      </h2>
      <form action={formAction} className="mx-auto w-full max-w-lg">
        <div className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              type="number"
              id="amount"
              name="amount"
              step="0.01"
              placeholder="0.00"
              defaultValue={state.fieldValues?.amount}
            />
            {getFieldError("amount")}
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryId">Category</Label>
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
            <Label htmlFor="note">Note</Label>
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

          <div className="flex items-center justify-between">
            <Label htmlFor="isConfirmed">Payment is confirmed</Label>
            <Switch
              id="isConfirmed"
              name="isConfirmed"
              defaultChecked={state.fieldValues?.isConfirmed}
            />
            {getFieldError("isConfirmed")}
          </div>

          <div>
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-gray-900 dark:text-gray-50">
                Type of payment
              </legend>
              <RadioGroup
                name="payment"
                defaultValue={state.fieldValues?.payment}
              >
                <div>
                  <Label htmlFor="cash">Cash</Label>
                  <RadioGroupItem value="CASH" id="cash" />
                </div>
                <div>
                  <Label htmlFor="card">Card</Label>
                  <RadioGroupItem value="CARD" id="card" />
                </div>
                <div>
                  <Label htmlFor="crypto">Crypto</Label>
                  <RadioGroupItem value="CRYPTO" id="crypto" />
                </div>
              </RadioGroup>
            </fieldset>
            {getFieldError("payment")}
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              variant="secondary"
              type="button"
              onClick={() => router.back()}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={pending}
              isLoading={pending}
            >
              {pending
                ? "Saving..."
                : isEditing
                  ? "Update Expense"
                  : "Create Expense"}
            </Button>
          </div>
        </div>
      </form>
      {state?.message && !state.success && (
        <p className="mx-auto w-full max-w-lg">{state.message}</p>
      )}
    </>
  );
}
