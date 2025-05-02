import { getUser } from "@/lib/utils";
import { getExpenses, getTotalAmountExpenses } from "@/lib/queries/expense";
import { redirect } from "next/navigation";

const confirmedExpenses = {
  isConfirmed: true,
};

export default async function ConfirmedExpenses() {
  const { userId } = await getUser();

  if (!userId) {
    redirect("/sign-in");
  }

  const [expenses, amount] = await Promise.all([
    getExpenses<boolean>(userId, confirmedExpenses),
    getTotalAmountExpenses<boolean>(userId, confirmedExpenses),
  ]);

  return (
    <div>
      <p className="light:text-black mb-2 bg-emerald-50 p-3 dark:text-black">
        You have{" "}
        <span className="font-bold text-emerald-700">{expenses.length}</span>{" "}
        confirmed {expenses.length === 1 ? "payment" : "payments"}
      </p>
      <p className="light:text-black my-2 bg-emerald-100 p-3 dark:text-black">
        Total Confirmed:{" "}
        <span className="font-medium text-emerald-700">
          ${amount?._sum.amount ? amount?._sum.amount?.toFixed(2) : 0}
        </span>
      </p>
    </div>
  );
}
