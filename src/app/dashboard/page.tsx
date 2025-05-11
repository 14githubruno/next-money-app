import clsx from "clsx";
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
        <div className={clsx("flex flex-col gap-6", "lg:flex-row")}>
          <div className="flex-[1]">
            <Suspense fallback={<Loader height="22rem" />}>
              <PendingExpenses />
            </Suspense>
          </div>
          <div className="flex-[1]">
            <Suspense fallback={<Loader height="22rem" />}>
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
