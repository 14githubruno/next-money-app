import ExpenseForm from "@/components/expenses/expense-form";
import { getUser } from "@/lib/utils/server-only-utils";
import { notFound } from "next/navigation";
import { getSingleExpense } from "@/lib/queries/expense";
import { getCategories } from "@/lib/queries/category";

export default async function SingleExpensePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { userId } = await getUser();

  const [expense, categories] = await Promise.all([
    getSingleExpense(id, userId),
    getCategories(userId),
  ]);

  if (!expense) {
    notFound();
  }

  return (
    <div className="p-6">
      <div>
        <p>{JSON.stringify(expense)}</p>
      </div>

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
