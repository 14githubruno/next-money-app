import {
  getUser,
  getDateRange,
  getExpensesOfSelectedYear,
} from "@/lib/utils/server-only-utils";
import { redirect, notFound } from "next/navigation";
import { getCategories } from "@/lib/queries/category";
import { CategoriesTable } from "@/components/categories/categories-table";
import CategoryForm from "@/components/categories/category-form";

export default async function CategoriesPage() {
  const { userId } = await getUser();

  if (!userId) {
    redirect("sign-in");
  }

  // make sure to also select the number of expenses per category based on selected year
  const dateRange = await getDateRange();
  const expensesWhereFilter = {
    expenseDate: getExpensesOfSelectedYear(dateRange),
  };

  const [categoriesWithSelectedYearExpenses, categoriesWithAllExpenses] =
    await Promise.all([
      getCategories(userId, {}, { ...expensesWhereFilter }),
      getCategories(userId),
    ]);

  if (!categoriesWithSelectedYearExpenses || !categoriesWithAllExpenses) {
    notFound();
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Categories</h1>
        <div className="flex items-center justify-between">
          <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
            Overview of all your categories.
          </p>
          <CategoryForm userId={userId} />
        </div>
      </div>
      <CategoriesTable
        categoriesForTable={categoriesWithSelectedYearExpenses}
        categoriesWithAllExpenses={categoriesWithAllExpenses}
      />
    </div>
  );
}
