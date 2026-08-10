import { useState } from "react";
import RadioCard from "./RadioCard";
import { UTILIZATION_GROUP } from "@/shared/constants/RadioCards.constants";
import type { RadioCardsProps } from "@/shared/types/RadioCards.types";

export default function RadioCards({
  group,
  title = group?.title || UTILIZATION_GROUP.title,
  description = group?.description || UTILIZATION_GROUP.description,
  subDescription = group?.subDescription || UTILIZATION_GROUP.subDescription,
  cards = group?.cards || UTILIZATION_GROUP.cards,
  selectedId,
  onChange,
}: RadioCardsProps) {
  const [internalSelected, setInternalSelected] = useState<string>(
    cards[0]?.id || ""
  );

  const activeSelected =
    selectedId !== undefined ? selectedId : internalSelected;

  const handleSelect = (id: string) => {
    if (onChange) {
      onChange(id);
    } else {
      setInternalSelected(id);
    }
  };

  const gridColsClass =
    cards.length === 5
      ? "grid-cols-5"
      : cards.length === 4
        ? "grid-cols-4"
        : "grid-cols-3";

  return (
    <div className="w-full">
      <h1 className="font-heading text-[32px] font-bold leading-[110%] text-heading dark:text-white">
        {title}
      </h1>

      <p className="mt-2 font-body text-base leading-[150%] text-text dark:text-[#f4faf6d1]">
        {description}
        {subDescription && (
          <>
            <br />
            {subDescription}
          </>
        )}
      </p>

      <div className={`mt-8 grid ${gridColsClass} gap-3 sm:gap-4 justify-items-center`}>
        {cards.map((card) => (
          <RadioCard
            key={card.id}
            {...card}
            isSelected={card.id === activeSelected}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}