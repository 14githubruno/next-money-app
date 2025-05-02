import { getUser } from "@/lib/utils";
import { getExpenses, getTotalAmountExpenses } from "@/lib/queries/expense";
import { redirect } from "next/navigation";
import PendingExpensesTable from "./pending-expenses-table";

const pendingExpenses = {
  isConfirmed: false,
};

export default async function PendingExpenses() {
  const { userId } = await getUser();

  if (!userId) {
    redirect("/sign-in");
  }

  const [expenses, amount] = await Promise.all([
    getExpenses<boolean>(userId, pendingExpenses),
    getTotalAmountExpenses<boolean>(userId, pendingExpenses),
  ]);

  return (
    <div className="min-h-[26rem]">
      <p className="light:text-black mb-2 bg-purple-50 p-3 dark:text-black">
        You have{" "}
        <span className="font-bold text-[#8659c6]">{expenses.length}</span>{" "}
        pending {expenses.length === 1 ? "payment" : "payments"}
      </p>
      <p className="light:text-black my-2 bg-purple-200 p-3 dark:text-black">
        Total Pending:{" "}
        <span className="font-medium">
          ${amount?._sum.amount ? amount?._sum.amount?.toFixed(2) : 0}
        </span>
      </p>
      <PendingExpensesTable expenses={expenses.slice(0, 5)} />
    </div>
  );
}
