"use client";

import clsx from "clsx";
import { useActionState, useRef } from "react";
import { createExpense, updateExpense } from "@/lib/actions/expense";
import {
  type CategoryTypes,
  type ExpenseTypes,
} from "@/lib/validations/schemas";
import { EXPENSE_FORM_INITIAL_STATE as initState } from "@/lib/constants";
import { Plus, Pencil } from "lucide-react";
import { Button } from "../tremor-raw/ui/button";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../tremor-raw/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../tremor-raw/inputs/select";
import { Switch } from "../tremor-raw/inputs/switch";
import { RadioGroup, RadioGroupItem } from "../tremor-raw/inputs/radio-group";
import DatePickerYearNavigation from "../date-picker-year-navigation";
import { Input } from "../tremor-raw/inputs/input";
import { Label } from "../tremor-raw/inputs/label";
import { useFormToast } from "@/hooks/toast/use-form-toast";

type ExpenseFormProps = {
  categories: CategoryTypes[];
  expense?: ExpenseTypes;
  isEditing?: boolean;
};

export default function ExpenseForm({
  categories,
  expense,
  isEditing = false,
}: ExpenseFormProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Bind expenseID if editing expense
  const updateExpenseByPassingExpenseId = updateExpense.bind(
    null,
    isEditing && expense ? expense.id : undefined
  );

  // set action
  const action =
    expense && isEditing ? updateExpenseByPassingExpenseId : createExpense;

  // set initial state
  const initialState =
    expense && isEditing
      ? { ...initState, fieldValues: { ...expense } }
      : { ...initState };

  // use action state
  const [state, formAction, pending] = useActionState(action, initialState);

  // if action is successful, close drawer and toast success,
  // otherwise keep drawer open and toast errors
  useFormToast(state, closeButtonRef);

  // fire form
  const fireForm = () => {
    if (formRef.current !== null) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <div className="flex justify-center">
      <Drawer>
        <DrawerTrigger asChild>
          {isEditing ? (
            <button aria-label="edit category">
              <Pencil
                className="size-4 shrink-0 bg-transparent"
                aria-hidden="true"
              />
            </button>
          ) : (
            <Button variant="base" className={clsx("w-full", "lg:w-fit")}>
              <Plus className="mr-2 h-4 w-4" />
              Add expense
            </Button>
          )}
        </DrawerTrigger>
        <DrawerContent className="sm:max-w-lg">
          <DrawerHeader>
            <DrawerTitle>
              {isEditing ? "Edit expense" : "Add new expense"}
            </DrawerTitle>
          </DrawerHeader>
          <DrawerBody className="py-6">
            <form
              ref={formRef}
              action={formAction}
              className="mx-auto w-full max-w-lg"
            >
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Note</Label>
                  <Input
                    type="text"
                    id="note"
                    name="note"
                    placeholder="Expense details"
                    defaultValue={state.fieldValues?.note ?? ""}
                  />
                </div>

                <div className="space-y-2">
                  <DatePickerYearNavigation
                    nameAndId="expenseDate" // input name and id + htmlFor of label
                    defaultValue={state.fieldValues?.expenseDate}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="isConfirmed">Payment is confirmed</Label>
                  <Switch
                    id="isConfirmed"
                    name="isConfirmed"
                    defaultChecked={state.fieldValues?.isConfirmed}
                  />
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
                </div>
              </div>
            </form>
          </DrawerBody>
          <DrawerFooter className="mt-6">
            <DrawerClose asChild>
              <Button
                ref={closeButtonRef}
                className="mt-2 w-full sm:mt-0 sm:w-fit"
                variant="secondary"
              >
                Go back
              </Button>
            </DrawerClose>
            <Button
              variant="base"
              type="submit"
              disabled={pending}
              isLoading={pending}
              onClick={fireForm}
            >
              {pending
                ? "Saving..."
                : isEditing
                  ? "Update Expense"
                  : "Create Expense"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
