import EdificioIcon from "@/assets/icons/edificio.svg?react";
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
  Icon = EdificioIcon,
  isSelected = false,
  onSelect,
}: RadioCardProps) {
  return (
    <div
      onClick={() => onSelect && onSelect(id)}
      className={`
        relative flex h-[220px] cursor-pointer flex-col
        items-center rounded-2xl border p-6 transition-colors
        ${
          isSelected
            ? "border-[#0E6A37] bg-[#F4FAF6]"
            : "border-[#E5E7EB] bg-white hover:border-gray-300"
        }
      `}
    >
     
      <div
        className={`
          absolute right-5 top-5 flex h-5 w-5
          items-center justify-center rounded-full border
          ${
            isSelected
              ? "border-[#0E6A37] bg-[#0E6A37] text-white"
              : "border-[#C1C7CD] bg-white"
          }
        `}
      >
        {isSelected && <CheckIcon />}
      </div>

      <div
        className={`
          mt-6 flex h-12 w-12 items-center justify-center rounded-full
          ${
            isSelected
              ? "bg-[#0E6A37] text-white"
              : "bg-[#E5E7EB] text-[#4B5563]"
          }
        `}
      >
        <Icon className="h-6 w-6" />
      </div>

      <h3
        className={`
          mt-8 font-heading text-lg font-semibold
          ${isSelected ? "text-[#0E6A37]" : "text-[#170F49]"}
        `}
      >
        {title}
      </h3>

      <p className="mt-2 font-body text-base text-[#4B5563] text-center">
        {description}
      </p>
    </div>
  );
}