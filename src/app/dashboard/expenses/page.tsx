import { ExpensesList } from "@/components/expenses/expenses-list";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { auth } from "@/auth";
import { getExpenses } from "@/lib/queries/expense";

export default async function ExpensesPage() {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id;

  if (!userId) {
    redirect("/sign-in");
  }

  // Fetch data directly in the server component
  const expenses = await getExpenses(userId);

  if (!expenses) {
    notFound();
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <div className="flex items-center gap-2">
          <Link
            className="flex items-center rounded-md bg-[#8659c6] px-4 py-2 text-white focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
            href="/dashboard/categories/create"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Link>
          <Link
            className="flex items-center rounded-md bg-[#8659c6] px-4 py-2 text-white focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
            href="/dashboard/expenses/create"
          >
            Add Expense &rarr;
          </Link>
        </div>
      </div>

      <ExpensesList expenses={expenses} />
    </div>
  );
}
