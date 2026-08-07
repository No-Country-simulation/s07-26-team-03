
import { cn } from "@/shared/lib/cn";

import { checklistStyles } from "./checklist.styles";
import type { ChecklistProps } from "./checklist.types";
import { IoCheckmark } from "react-icons/io5";

export function Checklist({
  items,
  orientation = "vertical",
  iconSize = 14,
  className,
  ...props
}: ChecklistProps) {
  return (
    <ul
      className={cn(
        checklistStyles.container[orientation],
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <li
          key={item.id}
          className={checklistStyles.item}
        >
          <span
            className={checklistStyles.iconWrapper}
            aria-hidden="true"
          >
            <IoCheckmark size={iconSize} strokeWidth={3} />
          </span>

          <span
            className={checklistStyles.label}
          >
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}