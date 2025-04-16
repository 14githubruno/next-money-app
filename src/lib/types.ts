import { type CategorySchema, type ExpenseSchema } from "./validations/schemas";

export type CategoryFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  fieldValues?: CategorySchema;
};

export type ExpenseFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  fieldValues?: ExpenseSchema;
};
