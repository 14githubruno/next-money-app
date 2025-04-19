import { grabUserId } from "@/lib/utils";
import { redirect, notFound } from "next/navigation";
import { getCategories } from "@/lib/queries/category";
import Link from "next/link";
import { Plus } from "lucide-react";
import { CategoriesTable } from "@/components/categories/categories-table";

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

      {categories && <CategoriesTable categories={categories} />}
    </div>
  );
}
