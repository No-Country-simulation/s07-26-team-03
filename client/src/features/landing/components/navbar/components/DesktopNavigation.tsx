import { NavigationItem } from "./NavigationItem";

import type { DesktopNavigationProps } from "../navbar.types";

export function DesktopNavigation({
  items,
}: DesktopNavigationProps) {
  return (
    <nav
      className="hidden items-center gap-8 lg:flex"
      aria-label="Main Navigation"
    >
      {items.map((item) => (
        <NavigationItem
          key={item.href}
          item={item}
        />
      ))}
    </nav>
  );
}