import { NavigationItem } from "./NavigationItem";

import { cn } from "@/shared/lib/cn";

import type { MobileNavigationProps } from "../navbar.types";

export function MobileNavigation({
  items,
  isOpen,
  onClose,
}: MobileNavigationProps) {
  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden",

          isOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        )}
      />

      <div
        className={cn(
          "absolute left-0 top-full z-50 w-full border-t border-border bg-surface transition-all duration-300 lg:hidden",

          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-5 pointer-events-none opacity-0"
        )}
      >
        <nav className="flex flex-col p-6">
          {items.map((item) => (
            <NavigationItem
              key={item.href}
              item={item}
              mobile
              onClick={onClose}
            />
          ))}
        </nav>
      </div>
    </>
  );
}