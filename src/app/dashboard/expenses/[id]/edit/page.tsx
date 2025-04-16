import { ExpenseForm } from "@/components/expenses/expense-form";
import { grabUserId } from "@/lib/utils";
import { notFound } from "next/navigation";
import { getSingleExpense } from "@/lib/queries/expense";
import { getCategories } from "@/lib/queries/category";

export default async function EditExpensePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = await grabUserId();

  const [expense, categories] = await Promise.all([
    getSingleExpense(id, userId),
    getCategories(userId),
  ]);

  if (!expense) {
    notFound();
  }

  return (
    <div className="p-6">
      {expense && userId && categories && (
        <ExpenseForm
          userId={userId}
          categories={categories}
          expense={expense}
          isEditing={true}
        />
      )}
    </div>
  );
}
