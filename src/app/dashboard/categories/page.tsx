import {
  getUser,
  getDateRange,
  getExpensesOfSelectedYear,
} from "@/lib/utils/server-only-utils";
import { redirect, notFound } from "next/navigation";
import { getCategories } from "@/lib/queries/category";
import DateRangeSelect from "@/components/date-range-select";
import Heading from "@/components/ui/heading";
import CategoriesTable from "@/components/categories/categories-table";
import CategoryForm from "@/components/categories/category-form";
import CategoriesBarList from "@/components/categories/categories-bar-list";
import Paragraph from "@/components/ui/paragraph";
import { PAGES_TITLES, MOCK_CATEGORIES_BAR_LIST } from "@/lib/constants";

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

  // build categories bar list data
  const categoriesBarListData = categoriesWithSelectedYearExpenses.map(
    (category) => ({
      name: category.name,
      value: category.expenses,
    })
  );

  return (
    <div className="flex flex-col gap-16">
      <DateRangeSelect dateRange={dateRange} />
      {/* first block */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Heading level={1} text={PAGES_TITLES.h1.dashboardCategories} />
          <div className="flex justify-between">
            <Paragraph text="Overview of all your categories." />
            <CategoryForm />
          </div>
        </div>
        <CategoriesTable
          categoriesForTable={categoriesWithSelectedYearExpenses}
          categoriesWithAllExpenses={categoriesWithAllExpenses}
        />
      </div>

      {/* second block */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Heading level={2} text={PAGES_TITLES.h2.dashboardCategories} />
          {categoriesBarListData.length > 0 ? (
            <Paragraph text="Impact of your categories." />
          ) : (
            <Paragraph text="Example with mock categories." />
          )}
        </div>
        {categoriesBarListData.length > 0 ? (
          <CategoriesBarList data={categoriesBarListData} />
        ) : (
          <CategoriesBarList isMock={true} data={MOCK_CATEGORIES_BAR_LIST} />
        )}
      </div>
    </div>
  );
}
