import { LuBuilding2 } from "react-icons/lu";
import CheckIcon from "@/shared/components/icons/CheckIcon";
import type { RadioCardItem } from "../../types/RadioCards.types";

interface RadioCardProps extends RadioCardItem {
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export default function RadioCard({
  id,
  title,
  description,
  Icon = LuBuilding2,
  isSelected = false,
  onSelect,
}: RadioCardProps) {
  return (
    <div
      onClick={() => onSelect && onSelect(id)}
      className={`
        relative flex h-[120px] w-full max-w-[130px] cursor-pointer flex-col
        items-center justify-center rounded-2xl border p-2.5 transition-all duration-200
        ${isSelected
          ? "border-brand-primary bg-[#F4FAF6] dark:bg-[#f4faf60d] shadow-[0px_2px_8px_rgba(14,106,55,0.12)]"
          : "border-[#E5E7EB] dark:border-[#252525] bg-white dark:bg-black hover:border-gray-300 shadow-[0px_1px_3px_rgba(0,0,0,0.05)]"
        }
      `}
    >

      <div
        className={`
          absolute right-2.5 top-2.5 flex h-4 w-4
          items-center justify-center rounded-full border transition-colors
          ${isSelected
            ? "border-brand-primary bg-brand-primary text-white"
            : "border-[#C1C7CD] dark:border-[#252525] bg-white dark:bg-[#252525]"
          }
        `}
      >
        {isSelected && <CheckIcon />}
      </div>

      <div
        className={`
          flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors
          ${isSelected
            ? "bg-brand-primary text-white shadow-[inset_0px_-1.17px_1.17px_rgba(14,106,55,0.25)]"
            : "bg-[#E5E7EB] dark:bg-[#252525] text-[#4B5563] dark:text-[#E5E7EB]"
          }
        `}
      >
        <Icon className="h-4.5 w-4.5 stroke-current" />
      </div>

      <h3
        className={`
          mt-2 font-heading text-xs font-semibold text-center leading-tight
          ${isSelected ? "text-brand-primary" : "text-heading dark:text-gray-300"}
        `}
      >
        {title}
      </h3>

      <p className="mt-0.5 font-body text-[11px] text-placeholder text-center leading-tight">
        {description}
      </p>
    </div>
  );
}