import { cn } from "@/shared/lib/cn";

import type { NavigationItemProps } from "../navbar.types";

export function NavigationItem({
  item,
  mobile = false,
  onClick,
}: NavigationItemProps) {
  const className = cn(
    "font-medium transition-colors duration-200",
    mobile ? "block py-3 text-lg text-text hover:text-brand-primary" : "text-md text-surface hover:text-white/80"
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={className}
      >
        {item.label}
      </a>
    );
  }

  return (
    <a
      href="#how-it-works"
      onClick={onClick}
      className={className}
    >
      {item.label}
    </a>
    // <Link
    //   to={item.href}
    //   onClick={onClick}
    //   className={className}
    // >
    //   {item.label}
    // </Link>
  );
}