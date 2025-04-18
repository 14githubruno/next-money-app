import { grabUserId } from "@/lib/utils";
import { getExpenses, getTotalAmountExpenses } from "@/lib/queries/expense";
import { redirect } from "next/navigation";
import ConfirmedExpensesTable from "./confirmed-expenses-table";

const confirmedExpenses = {
  isConfirmed: true,
};

export default async function ConfirmedExpenses() {
  const userId = await grabUserId();

  if (!userId) {
    redirect("/sign-in");
  }

  const [expenses, amount] = await Promise.all([
    getExpenses<boolean>(userId, confirmedExpenses),
    getTotalAmountExpenses<boolean>(userId, confirmedExpenses),
  ]);

  return (
    <div className="">
      {!expenses ? (
        <p>You don&apos;t have any confirmed expenses</p>
      ) : (
        <div>
          <p className="mb-2 rounded-sm bg-emerald-50 p-3">
            You have{" "}
            <span className="font-bold text-emerald-700">
              {expenses.length}
            </span>{" "}
            confirmed {expenses.length === 1 ? "payment" : "payments"}
          </p>
          <p className="my-2 rounded-sm bg-emerald-100 p-3">
            Total Confirmed:{" "}
            <span className="font-medium text-emerald-700">
              ${amount?._sum.amount ? amount?._sum.amount?.toFixed(2) : 0}
            </span>
          </p>
          <ConfirmedExpensesTable expenses={expenses.slice(0, 3)} />
        </div>
      )}
    </div>
  );
}
