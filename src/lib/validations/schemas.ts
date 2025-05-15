import { z } from "zod";
import { Payment, Category, Expense } from "@prisma/client";

/**
 * CATEGORY VALIDATION SCHEMA
 * ========================================================
 */
export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Name is required")
    .max(15, "Category name cannot exceed 15 characters"),
});

/**
 * CATEGORY TYPES:
 * - CategorySchema (Inferred by Zod)
 * - CategoryTypes (Inferred by Prisma)
 * ========================================================
 */
export type CategorySchema = z.infer<typeof categorySchema>;
type TCategory = Omit<Category, "userId">;
export type CategoryTypes = TCategory & {
  expenses?: number;
};

/**
 * EXPENSE VALIDATION SCHEMA
 * ========================================================
 */
export const expenseSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  categoryId: z.string().min(1, "Category is required"),
  note: z
    .string()
    .trim()
    .max(500, "Note cannot exceed 500 characters")
    .optional()
    .nullable(),
  expenseDate: z.coerce.date(),
  isConfirmed: z.coerce.boolean(),
  payment: z.nativeEnum(Payment),
});

/**
 * EXPENSE TYPES:
 * - ExpenseSchema (Inferred by Zod)
 * - ExpenseTypes (Inferred by Prisma)
 * ========================================================
 */
export type ExpenseSchema = z.infer<typeof expenseSchema>;
type TExpense = Omit<Expense, "userId">;
export type ExpenseTypes = TExpense & {
  category: Partial<TCategory>;
};
