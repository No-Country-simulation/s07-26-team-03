import { useState } from "react";
import RadioCard from "./RadioCard";
import { UTILIZATION_GROUP } from "../../constants/RadioCards.constants";
import type { RadioCardItem, RadioGroupConfig } from "../../types/RadioCards.types";

interface RadioCardsProps {
  group?: RadioGroupConfig;
  title?: string;
  description?: string;
  subDescription?: string;
  cards?: RadioCardItem[];
  selectedId?: string;
  onChange?: (id: string) => void;
}

export default function RadioCards({
  group,
  title = group?.title || UTILIZATION_GROUP.title,
  description = group?.description || UTILIZATION_GROUP.description,
  subDescription = group?.subDescription || UTILIZATION_GROUP.subDescription,
  cards = group?.cards || UTILIZATION_GROUP.cards,
  selectedId,
  onChange,
}: RadioCardsProps) {
  const [internalSelected, setInternalSelected] = useState<string>(cards[0]?.id || "");

  const activeSelected = selectedId !== undefined ? selectedId : internalSelected;

  const handleSelect = (id: string) => {
    if (onChange) {
      onChange(id);
    } else {
      setInternalSelected(id);
    }
  };

  const gridColsClass =
    {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
    }[cards.length] || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div>
      <h1 className="font-heading text-[32px] leading-[110%] font-bold text-[#170F49]">
        {title}
      </h1>

      <p className="mt-2 font-body text-base leading-[150%] text-[#6F6C8F]">
        {description}
        {subDescription && (
          <>
            <br />
            {subDescription}
          </>
        )}
      </p>

      <div className={`mt-8 grid gap-6 ${gridColsClass}`}>
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