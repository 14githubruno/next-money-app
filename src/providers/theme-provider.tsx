"use client";

import type { ReactNode } from "react";
import { ThemeProvider as Provider } from "next-themes";

type Props = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  return (
    <Provider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </Provider>
  );
}
