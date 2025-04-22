import { redirect, notFound } from "next/navigation";
import { grabUserId } from "@/lib/utils";
import { getExpenses } from "@/lib/queries/expense";
import { getCategories } from "@/lib/queries/category";
import { ExpensesTable } from "@/components/expenses/expenses-table";
import ExpenseForm from "@/components/expenses/expense-form";

export default async function ExpensesPage() {
  const userId = await grabUserId();

  if (!userId) {
    redirect("/sign-in");
  }

  const [expenses, categories] = await Promise.all([
    getExpenses(userId),
    getCategories(userId),
  ]);

  if (!expenses || !categories) {
    notFound();
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <ExpenseForm userId={userId} categories={categories} />
      </div>
      <ExpensesTable expenses={expenses} />
    </div>
  );
}
