import { CategoryForm } from "@/components/categories/category-form";
import { auth } from "@/auth";

export default async function NewCategoryPage() {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id;

  return (
    <div className="p-6">{userId && <CategoryForm userId={userId} />}</div>
  );
}
