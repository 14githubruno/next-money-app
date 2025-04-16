import { CategoryForm } from "@/components/categories/category-form";
import { grabUserId } from "@/lib/utils";

export default async function NewCategoryPage() {
  const userId = await grabUserId();

  return (
    <div className="p-6">{userId && <CategoryForm userId={userId} />}</div>
  );
}
