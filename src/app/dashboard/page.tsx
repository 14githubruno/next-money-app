import { Suspense } from "react";
import PendingExpenses from "@/components/expenses/pending-expenses";
import ConfirmedExpenses from "@/components/expenses/confirmed-expenses";
import ExpensesAmount from "@/components/expenses/expenses-amount";

export default async function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg">Dashboard</h1>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-start-1 col-end-5 grid grid-cols-1 gap-6">
          <Suspense fallback={<p>Loading...</p>}>
            <PendingExpenses />
          </Suspense>
          <Suspense fallback={<p>Loading...</p>}>
            <ConfirmedExpenses />
          </Suspense>
        </div>
        <div className="col-start-5 col-end-7 flex flex-col items-center justify-center gap-6 rounded-sm bg-green-50">
          <Suspense fallback={<p>Loading...</p>}>
            <ExpensesAmount />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
