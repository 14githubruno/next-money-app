"use client";

import clsx from "clsx";
import Link from "next/link";
import { deleteCategory } from "@/lib/actions/category";
import { Search, Pencil, Lock, Trash } from "lucide-react";
import { CategoryTypes } from "@/lib/validations/schemas";
import { useTransition } from "react";

const categoriesHeadings = ["Name", "Expenses", "Default", "Actions"];

type CategoriesListProps = {
  categories: CategoryTypes[];
};

export function CategoriesList({ categories }: CategoriesListProps) {
  const [isPending, startTransition] = useTransition();

  const deleteCurrentCategory = (category: CategoryTypes) => {
    const { id, expenses, isDefault } = category;

    if (expenses && expenses.length) {
      alert("This category has expenses. It can't be deleted.");
      return;
    } else if (isDefault) {
      alert("This category is a default one. It can't be deleted");
      return;
    }

    startTransition(async () => {
      await deleteCategory(id);
    });
  };

  return (
    <div>
      {categories.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          No categories found
        </div>
      ) : (
        <div className="relative h-[30rem] overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="ticky top-0 z-10 bg-gray-50">
              <tr>
                {categoriesHeadings.map((heading) => {
                  return (
                    <th
                      key={heading}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      {heading}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className={clsx(
                    "hover:bg-gray-50",
                    isPending && "opacity-25"
                  )}
                >
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                    {category.name}
                  </td>

                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {category?.expenses ? category.expenses.length : 0}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {category.isDefault && <Lock className="h-4 w-4" />}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                    <div className="flex space-x-4">
                      <Link href={`/dashboard/categories/${category.id}/view`}>
                        <Search className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                      <Link href={`/dashboard/categories/${category.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                      <button
                        className="cursor-pointer"
                        onClick={() => deleteCurrentCategory(category)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
