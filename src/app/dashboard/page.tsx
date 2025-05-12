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
            <Suspense
              fallback={<Loader height="var(--height-expenses-slice)" />}
            >
              <ExpensesSlice expensesAreConfirmed={false} />
            </Suspense>
          </div>
          <div className="flex-[1]">
            <Suspense
              fallback={<Loader height="var(--height-expenses-slice)" />}
            >
              <ExpensesSlice expensesAreConfirmed={true} />
            </Suspense>
          </div>
        </div>
        <div>
          <Suspense fallback={<Loader height="var(--height-expenses-chart)" />}>
            <ExpensesChartWrapper />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
