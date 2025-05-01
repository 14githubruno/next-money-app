"use client";

import { ArrowRight, ArrowLeft } from "lucide-react";
import { cx } from "@/lib/utils";
import Link from "next/link";
import { generatePagination } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment } from "react";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Fragment>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-[0.1rem]">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            return (
              <PaginationNumber
                key={`${page}-${index}`}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <PaginationArrow
            direction="left"
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />
          <PaginationArrow
            direction="right"
            href={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= totalPages}
          />
        </div>
      </div>
    </Fragment>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = cx(
    "flex h-10 w-10 items-center justify-center text-sm",
    position === "middle" && "opacity-50",
    isActive ? "bg-black text-gray-100" : "bg-gray-100 text-black",
    !isActive && position !== "middle" && "hover:bg-gray-200"
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const classNames =
    "bg-black text-gray-100 h-10 w-10 flex items-center justify-center";

  const icon =
    direction === "left" ? (
      <ArrowLeft className="h-4 w-4" />
    ) : (
      <ArrowRight className="h-4 w-4" />
    );

  return isDisabled ? (
    <div className={cx("cursor-not-allowed opacity-50", classNames)}>
      {icon}
    </div>
  ) : (
    <Link className={classNames} href={href}>
      {icon}
    </Link>
  );
}
