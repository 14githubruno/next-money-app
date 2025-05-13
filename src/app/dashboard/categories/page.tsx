import {
  getUser,
  getDateRange,
  getExpensesOfSelectedYear,
} from "@/lib/utils/server-only-utils";
import { redirect, notFound } from "next/navigation";
import { getCategories } from "@/lib/queries/category";
import Heading from "@/components/ui/heading";
import { CategoriesTable } from "@/components/categories/categories-table";
import CategoryForm from "@/components/categories/category-form";
import { PAGES_TITLES } from "@/lib/constants";

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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <Heading level={1} text={PAGES_TITLES.h1.dashboardCategories} />
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
