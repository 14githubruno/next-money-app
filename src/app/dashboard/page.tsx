import clsx from "clsx";
import { Suspense } from "react";
import Loader from "@/components/ui/loader";
import ExpensesSlice from "@/components/expenses/expenses-slice";
import ExpensesChartWrapper from "@/components/expenses/expenses-chart-wrapper";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg">Dashboard</h1>
      <div className="flex flex-col gap-6">
        <div className={clsx("flex flex-col gap-6", "lg:flex-row")}>
          <div className="flex-[1]">
            <Suspense fallback={<Loader height="22rem" />}>
              <ExpensesSlice expensesAreConfirmed={false} />
            </Suspense>
          </div>
          <div className="flex-[1]">
            <Suspense fallback={<Loader height="22rem" />}>
              <ExpensesSlice expensesAreConfirmed={true} />
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
