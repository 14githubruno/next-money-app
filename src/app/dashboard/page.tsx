import { Suspense } from "react";
import Loader from "@/components/ui/loader";
import PendingExpenses from "@/components/expenses/pending-expenses";
import ConfirmedExpenses from "@/components/expenses/confirmed-expenses";
import ExpensesChartWrapper from "@/components/expenses/expenses-chart-wrapper";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg">Dashboard</h1>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-start-1 col-end-4">
            <Suspense fallback={<Loader height="26rem" />}>
              <PendingExpenses />
            </Suspense>
          </div>
          <div className="col-start-4 col-end-7">
            <Suspense fallback={<Loader height="6.9rem" />}>
              <ConfirmedExpenses />
            </Suspense>
          </div>
        </div>
        <div>
          <Suspense fallback={<Loader height="20rem" />}>
            <ExpensesChartWrapper />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
