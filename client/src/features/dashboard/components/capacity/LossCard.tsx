import React from "react";
import type { LossCardProps } from "@/shared/interfaces/capacityLosses.interface";

export const LossCard: React.FC<LossCardProps> = ({
  title,
  value,
  bgColor,
  cardClasses = "",
  items,
}) => {
  return (
    <div className={`loss-card ${bgColor} ${cardClasses}`}>
      <div className="flex flex-col gap-0.5">
        <h3 className="font-heading text-sm sm:text-base font-bold text-gray-500 leading-tight">
          {title}
        </h3>
        <p className="font-body text-base font-normal text-heading leading-tight">
          {value}
        </p>
      </div>

      <div className="flex flex-col gap-1.5 mt-1">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between text-xs leading-tight gap-1"
          >
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <span className="h-1.5 w-1.5 rounded-full bg-text-muted shrink-0" />
              <span className="font-body font-normal text-text-muted whitespace-nowrap">
                {item.label}
              </span>
            </div>

            <span className="font-body text-[10px] font-bold text-text-muted shrink-0 ml-1">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};