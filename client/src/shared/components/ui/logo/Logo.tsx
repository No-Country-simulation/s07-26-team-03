import { cn } from "@/shared/lib/cn";

import icon from "@/assets/icons/icon.svg";

import type { LogoProps } from "./logo.types";

export function Logo({
  className,
  showSubtitle = true,
  iconClassName,
}: LogoProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        className
      )}
    >
      <img
        src={icon}
        alt="Capacity IQ"
        className={cn(
          "h-12 w-12 object-contain",
          iconClassName
        )}
      />

      <div className="flex items-baseline">
        <span className="font-logo text-2xl font-bold text-surface">
          Capacity
        </span>

        <span className="ml-1 font-logo text-2xl font-bold text-brand-accent">
          IQ
        </span>

        {showSubtitle && (
          <span className="ml-2 font-body text-sm font-light text-surface">
            by Datacenter
          </span>
        )}
      </div>
    </div>
  );
}