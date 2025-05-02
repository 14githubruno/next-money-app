import { Suspense } from "react";
import Loader from "@/components/ui/loader";
import PendingExpenses from "@/components/expenses/pending-expenses";
import ConfirmedExpenses from "@/components/expenses/confirmed-expenses";
import ExpensesChartWrapper from "@/components/expenses/expenses-chart-wrapper";
import ExpensesAmount from "@/components/expenses/expenses-amount";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg">Dashboard</h1>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-start-1 col-end-5 flex flex-col gap-6">
          <Suspense fallback={<Loader height="26rem" />}>
            <PendingExpenses />
          </Suspense>
          <Suspense fallback={<Loader height="6.9rem" />}>
            <ConfirmedExpenses />
          </Suspense>
          <Suspense fallback={<Loader height="20rem" />}>
            <ExpensesChartWrapper />
          </Suspense>
        </div>
        <div className="col-start-5 col-end-7">
          <Suspense fallback={<Loader height="6.8rem" />}>
            <ExpensesAmount />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
