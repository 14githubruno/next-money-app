"use client";

import { createContext, useTransition, type ReactNode } from "react";

export const TableFilteringContext = createContext({
  isFiltering: false,
  startTransition: (cb: () => void) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
});

type TableFilteringProviderProps = {
  children: ReactNode;
};

export default function TableFilteringProvider(
  props: TableFilteringProviderProps
) {
  const [isFiltering, startTransition] = useTransition();

  return (
    <TableFilteringContext.Provider value={{ isFiltering, startTransition }}>
      {props.children}
    </TableFilteringContext.Provider>
  );
}
