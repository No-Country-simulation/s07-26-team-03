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
        " w-full mx-auto max-w-none px-4 sm:px-6 lg:px-8",
        !fluid && "max-w-none 2xl:max-w-screen-2xl ",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}