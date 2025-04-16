import { getSingleCategory } from "@/lib/queries/category";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function ViewCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const user = session?.user;
  const userId = user?.id;

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
