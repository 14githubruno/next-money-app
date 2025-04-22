import { grabUserId } from "@/lib/utils";
import { redirect, notFound } from "next/navigation";
import { getCategories } from "@/lib/queries/category";
import { CategoriesTable } from "@/components/categories/categories-table";
import CategoryForm from "@/components/categories/category-form";

export default async function CategoriesPage() {
  const userId = await grabUserId();

  if (!userId) {
    redirect("sign-in");
  }

  const categories = await getCategories(userId);

  if (!categories) {
    notFound();
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <CategoryForm userId={userId} />
      </div>
      <CategoriesTable categories={categories} />
    </div>
  );
}
