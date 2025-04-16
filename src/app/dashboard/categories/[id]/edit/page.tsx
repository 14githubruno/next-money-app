import { CategoryForm } from "@/components/categories/category-form";
import { grabUserId } from "@/lib/utils";
import { notFound } from "next/navigation";
import { getSingleCategory } from "@/lib/queries/category";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = await grabUserId();

  const category = await getSingleCategory(id, userId);

  if (!category) {
    notFound();
  }

  return (
    <div className="p-6">
      {category && userId && (
        <CategoryForm userId={userId} category={category} isEditing={true} />
      )}
    </div>
  );
}
