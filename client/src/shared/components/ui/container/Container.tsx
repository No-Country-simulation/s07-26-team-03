import { cn } from "@/shared/lib/cn";

import type { ContainerProps } from "./container.types";

export function Container({
  className,
  fluid = false,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        !fluid && "max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}