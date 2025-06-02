import clsx from "clsx";
import { Suspense } from "react";
import { ComponentLoader } from "@/components/ui/loaders";
import ExpensesSlice from "@/components/expenses/expenses-slice";
import ExpensesChartWrapper from "@/components/expenses/expenses-chart-wrapper";
import Heading from "@/components/ui/heading";
import Paragraph from "@/components/ui/paragraph";
import { PAGES_TITLES } from "@/lib/constants";
import DateRangeSelect from "@/components/date-range-select";
import { getDateRange } from "@/lib/utils/server-only-utils";

export default async function Dashboard() {
  const dateRange = await getDateRange();

  return (
    <div className="flex flex-col gap-16">
      <DateRangeSelect dateRange={dateRange} />
      {/* first block */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Heading level={1} text={PAGES_TITLES.h1.dashboard} />
          <Paragraph text="Pending and confirmed expenses." />
        </div>
        <div className={clsx("flex flex-col gap-12", "lg:flex-row lg:gap-6")}>
          <div className={clsx("lg:w-1/2")}>
            <Suspense
              fallback={
                <ComponentLoader height="var(--height-expenses-slice)" />
              }
            >
              <ExpensesSlice expensesAreConfirmed={false} />
            </Suspense>
          </div>
          <div className={clsx("lg:w-1/2")}>
            <Suspense
              fallback={
                <ComponentLoader height="var(--height-expenses-slice)" />
              }
            >
              <ExpensesSlice expensesAreConfirmed={true} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* second block */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Heading level={2} text={PAGES_TITLES.h2.dashboard} />
          <Paragraph text="Year's expenses." />
        </div>
        <Suspense
          fallback={<ComponentLoader height="var(--height-expenses-chart)" />}
        >
          <ExpensesChartWrapper />
        </Suspense>
      </div>
    </div>
  );
}
