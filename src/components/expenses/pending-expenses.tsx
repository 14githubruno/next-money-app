import { grabUserId } from "@/lib/utils";
import { getExpenses, getTotalAmountExpenses } from "@/lib/queries/expense";
import { redirect } from "next/navigation";
import PendingExpensesTable from "./pending-expenses-table";

const pendingExpenses = {
  isConfirmed: false,
};

export default async function PendingExpenses() {
  const userId = await grabUserId();

  if (!userId) {
    redirect("/sign-in");
  }

  const [expenses, amount] = await Promise.all([
    getExpenses<boolean>(userId, pendingExpenses),
    getTotalAmountExpenses<boolean>(userId, pendingExpenses),
  ]);

  return (
    <div className="">
      {!expenses ? (
        <p>You don&apos;t have any pending payment</p>
      ) : (
        <div>
          <p className="mb-2 rounded-sm bg-purple-50 p-3">
            You have{" "}
            <span className="font-bold text-[#8659c6]">{expenses.length}</span>{" "}
            pending {expenses.length === 1 ? "payment" : "payments"}
          </p>
          <p className="my-2 rounded-sm bg-purple-200 p-3">
            Total Pending:{" "}
            <span className="font-medium">
              ${amount?._sum.amount ? amount?._sum.amount?.toFixed(2) : 0}
            </span>
          </p>
          <PendingExpensesTable expenses={expenses.slice(0, 3)} />
        </div>
      )}
    </div>
  );
}
