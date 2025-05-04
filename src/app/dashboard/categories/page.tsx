import { getUser } from "@/lib/utils";
import { redirect, notFound } from "next/navigation";
import { getCategories } from "@/lib/queries/category";
import { CategoriesTable } from "@/components/categories/categories-table";
import CategoryForm from "@/components/categories/category-form";

export default async function CategoriesPage() {
  const { userId } = await getUser();

  if (!userId) {
    redirect("sign-in");
  }

  const categories = await getCategories(userId);

  if (!categories) {
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
      <CategoriesTable categories={categories} />
    </div>
  );
}
