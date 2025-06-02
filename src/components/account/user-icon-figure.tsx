import clsx from "clsx";
import { UserRound } from "lucide-react";

/**
 * @note This component is used in the dashboard account page to display a user icon.
 * It is a simple figure with a user icon that is styled to match the design of the dashboard.
 */
export default function UserIconFigure() {
  return (
    // give this container the same height of date-range-select for symmetry with other dashboard pages
    <div className="h-[var(--height-date-range-select)]">
      <UserRound
        className={clsx(
          "size-5",
          "bg-white text-gray-600 dark:bg-gray-950 dark:text-gray-400",
          "lg:size-6"
        )}
      />
    </div>
  );
}
