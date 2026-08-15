import React from "react";
import type { CapacityMetricCardData } from "@/shared/interfaces/capacityLosses.interface";
import { LockIconSvg } from "@/shared/icons/CapacityIcons";
import { getMetricCardTheme } from "../../utils/capacityTheme";

interface MetricCardProps extends CapacityMetricCardData {
  isLast: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  id,
  title,
  value,
  subtitle,
  textColor,
  isLast,
}) => {
  const { bgClass, hexColor } = getMetricCardTheme(id);
  const isThirdOrFourth = id === "workloads-layer-capacity" || id === "stranded-capacity";

  return (
    <div
      className={`metric-card rounded-l-[6px] ${
        isLast ? "rounded-r-[6px]" : "rounded-r-none"
      } ${bgClass}`}
    >
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <div className="flex flex-col items-center justify-center w-full gap-0.5">
          <span
            className={`font-heading text-[10px] sm:text-xs font-medium uppercase tracking-wider leading-snug whitespace-nowrap ${textColor}`}
          >
            {title}
          </span>

          <p className="font-body text-base sm:text-lg font-bold text-heading leading-tight">
            {value}
          </p>
        </div>

        {subtitle && (
          <p
            className={`font-body text-xs sm:text-sm font-normal text-text-muted px-0.5 flex items-center justify-center text-center ${
              isThirdOrFourth ? "leading-snug" : "leading-tight"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center justify-center w-full mt-auto">
        <LockIconSvg hexColor={hexColor} textColor={textColor} />
      </div>
    </div>
  );
};