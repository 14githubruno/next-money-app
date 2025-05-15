import clsx from "clsx";
import { Suspense } from "react";
import { ComponentLoader } from "@/components/ui/loaders";
import ExpensesSlice from "@/components/expenses/expenses-slice";
import ExpensesChartWrapper from "@/components/expenses/expenses-chart-wrapper";
import Heading from "@/components/ui/heading";
import { PAGES_TITLES } from "@/lib/constants";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <Heading level={1} text={PAGES_TITLES.h1.dashboard} />
      <div className="flex flex-col gap-12">
        <div className={clsx("flex flex-col gap-6", "lg:flex-row")}>
          <div className="flex-[1]">
            <Suspense
              fallback={
                <ComponentLoader height="var(--height-expenses-slice)" />
              }
            >
              <ExpensesSlice expensesAreConfirmed={false} />
            </Suspense>
          </div>
          <div className="flex-[1]">
            <Suspense
              fallback={
                <ComponentLoader height="var(--height-expenses-slice)" />
              }
            >
              <ExpensesSlice expensesAreConfirmed={true} />
            </Suspense>
          </div>
        </div>
        <div>
          <Suspense
            fallback={<ComponentLoader height="var(--height-expenses-chart)" />}
          >
            <ExpensesChartWrapper />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
