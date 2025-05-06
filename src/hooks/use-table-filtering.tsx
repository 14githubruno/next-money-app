"use client";

import { TableFilteringContext } from "@/providers/table-filtering-provider";
import { useContext } from "react";

export function useTableFiltering() {
  return useContext(TableFilteringContext);
}
