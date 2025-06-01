import clsx from "clsx";
import { UserRound } from "lucide-react";
import Heading from "@/components/ui/heading";
import { PAGES_TITLES } from "@/lib/constants";

export default function Account() {
  return (
    <div className="flex flex-col gap-16">
      {/* give this cointainer the same height of date-range-select for symmetry with other dashboard pages */}
      <div className="h-[var(--height-date-range-select)]">
        <UserRound
          className={clsx(
            "size-5",
            "bg-white text-gray-600 dark:bg-gray-950 dark:text-gray-400",
            "lg:size-6"
          )}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Heading level={1} text={PAGES_TITLES.h1.dashboardAccount} />
        </div>
      </div>
    </div>
  );
}
