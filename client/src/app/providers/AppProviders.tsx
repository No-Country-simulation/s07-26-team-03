import { type PropsWithChildren } from "react";

import { QueryProvider } from "./QueryProvider";
import { ToastProvider } from "./ToastProvider";

export function AppProviders({
  children,
}: PropsWithChildren) {
  return (
    <QueryProvider>
      {children}

      <ToastProvider />
    </QueryProvider>
  );
}