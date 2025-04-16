import { ExpenseForm } from "@/components/expenses/expense-form";
import { grabUserId } from "@/lib/utils";
import { getCategories } from "@/lib/queries/category";
import { notFound } from "next/navigation";

export default async function NewExpensePage() {
  const userId = await grabUserId();

  const categories = await getCategories(userId);

  if (!categories) {
    notFound();
  }

  return (
    <div className="p-6">
      {userId && categories && (
        <ExpenseForm userId={userId} categories={categories} />
      )}
    </div>
  );
}
