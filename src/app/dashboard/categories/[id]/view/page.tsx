import { getSingleCategory } from "@/lib/queries/category";
import { grabUserId } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function ViewCategoryPage({
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
      {category && userId && <p>{JSON.stringify(category)}</p>}
    </div>
  );
}
