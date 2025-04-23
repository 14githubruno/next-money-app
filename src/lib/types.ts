import { type CategorySchema, type ExpenseSchema } from "./validations/schemas";

export type FormState<T> = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  fieldValues?: T;
};

export type CategoryFormState = FormState<CategorySchema>;
export type ExpenseFormState = FormState<ExpenseSchema>;
