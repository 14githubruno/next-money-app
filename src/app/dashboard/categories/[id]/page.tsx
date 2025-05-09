import { getUser } from "@/lib/utils/server-only-utils";
import { notFound } from "next/navigation";
import { getSingleCategory } from "@/lib/queries/category";
import CategoryForm from "@/components/categories/category-form";

export default async function SingleCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { userId } = await getUser();

  const category = await getSingleCategory(id, userId);

  if (!category) {
    notFound();
  }

  return (
    <div className="p-6">
      <div>
        <p>{JSON.stringify(category)}</p>
      </div>

      {category && userId && (
        <CategoryForm userId={userId} category={category} isEditing={true} />
      )}
    </div>
  );
}
