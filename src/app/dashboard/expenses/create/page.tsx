import { ExpenseForm } from "@/components/expenses/expense-form";
import { auth } from "@/auth";
import { getCategories } from "@/lib/queries/category";
import { notFound } from "next/navigation";

export default async function NewExpensePage() {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id;

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
