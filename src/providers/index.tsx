import type { ReactNode } from "react";
import ThemeProvider from "@/providers/theme-provider";
import Toaster from "@/providers/toaster";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import TableFilteringProvider from "@/providers/table-filtering-provider";

type ProvidersProps = {
  children: ReactNode;
};

/**
 * @note Centralize App Providers. This component will wrap Root Layout children
 */
export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <NuqsAdapter>
        <TableFilteringProvider>{children}</TableFilteringProvider>
      </NuqsAdapter>
      <Toaster />
    </ThemeProvider>
  );
}
