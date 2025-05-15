"use client";

import { ArrowRight, ArrowLeft } from "lucide-react";
import { cx } from "@/lib/utils/tremor-raw/utils";
import { generatePagination } from "@/lib/utils";
import { Fragment } from "react";
import { useQueryState, parseAsInteger } from "nuqs";
import { useTableFiltering } from "@/hooks/use-table-filtering";

type PaginationProps = {
  totalPages: number;
};

export default function Pagination({ totalPages }: PaginationProps) {
  const { startTransition } = useTableFiltering();
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger
      .withDefault(1)
      .withOptions({ startTransition, shallow: false })
  );

  const allPages = generatePagination(page, totalPages);

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {allPages.map((pageNum, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (pageNum === "...") position = "middle";

            return (
              <PaginationNumber
                key={`${page}-${index}`}
                onClick={() => setPage(pageNum as number)}
                page={pageNum}
                position={position}
                isActive={page === pageNum}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <PaginationArrow
            direction="left"
            onClick={() => setPage((p) => p - 1)}
            isDisabled={page <= 1}
          />
          <PaginationArrow
            direction="right"
            onClick={() => setPage((p) => p + 1)}
            isDisabled={page >= totalPages}
          />
        </div>
      </div>
    </Fragment>
  );
}

function PaginationNumber({
  page,
  onClick,
  isActive,
  position,
}: {
  page: number | string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = cx(
    "hidden",
    "lg:flex lg:h-10 lg:w-10 lg:items-center lg:justify-center lg:text-sm lg:cursor-pointer lg:rounded-lg",
    position === "middle" && "lg:opacity-50",
    isActive
      ? "lg:bg-gray-950 lg:text-gray-100 lg:dark:border lg:dark:border-gray-800"
      : "lg:bg-gray-100 lg:dark:bg-gray-800 lg:text-gray-950 lg:dark:text-gray-100",
    !isActive &&
      position !== "middle" &&
      "lg:hover:bg-gray-200 lg:dark:hover:opacity-50 lg:dark:hover:bg-gray-800"
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <button onClick={onClick} className={className}>
      {page}
    </button>
  );
}

function PaginationArrow({
  onClick,
  direction,
  isDisabled,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const classNames =
    "bg-gray-950 text-gray-100 h-10 w-10 flex items-center justify-center cursor-pointer rounded-lg dark:bg-gray-800 hover:opacity-75";

  const icon =
    direction === "left" ? (
      <ArrowLeft className="h-4 w-4" />
    ) : (
      <ArrowRight className="h-4 w-4" />
    );

  return isDisabled ? (
    <div
      className={cx(
        classNames,
        "cursor-not-allowed opacity-50 hover:opacity-50"
      )}
    >
      {icon}
    </div>
  ) : (
    <button onClick={onClick} className={classNames}>
      {icon}
    </button>
  );
}
