import React from "react";
import BolsaIcon from "@/assets/icons/bolsa.svg?react";
import type {
  CapacityMetricCardData,
  LossCardProps,
} from "@/shared/interfaces/capacityLosses.interface";
import {
  CAPACITY_LOSSES_DATA,
  CAPACITY_METRICS_DATA,
} from "@/shared/constants/capacityLosses.constants";

const MetricCard: React.FC<
  CapacityMetricCardData & { alignmentClass: string }
> = ({ title, value, subtitle, bgColor, textColor, cardClasses, alignmentClass }) => {
  return (
    <div
      className={`rounded-none p-3 flex flex-col items-center text-center justify-between ${bgColor} ${cardClasses} ${alignmentClass}`}
    >
      <div className="flex flex-col items-center gap-0 w-full">
        <span
          className={`font-heading text-xs sm:text-sm font-normal uppercase tracking-wider leading-tight ${textColor}`}
        >
          {title}
        </span>
        <p className="font-body text-lg font-bold text-heading leading-none mt-1">
          {value}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-1 mt-1 w-full">
        <p className="font-body text-xs text-text-muted leading-tight">
          {subtitle}
        </p>
        <BolsaIcon className={`h-11 w-11 shrink-0 mt-1 ${textColor}`} />
      </div>
    </div>
  );
};

const LossCard: React.FC<LossCardProps> = ({
  title,
  value,
  bgColor,
  cardClasses = "",
  items,
}) => {
  return (
    <div
      className={`rounded-none p-3 flex flex-col justify-start gap-2 ${bgColor} ${cardClasses}`}
    >
      <div className="flex flex-col gap-0.5">
        <h3 className="font-heading text-xs font-normal text-text-muted leading-tight">
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

            <span className="font-body font-normal text-text-muted shrink-0 ml-1">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CapacityLossesCards: React.FC = () => {
  const metricAlignments = [
    "self-start mt-0",
    "self-start mt-4",
    "self-start mt-8",
    "self-start mt-12",
  ];

  const lossAlignments = [
    "self-start mt-0",
    "self-start mt-4",
    "self-start mt-8",
  ];

  return (
    <div className="flex flex-col gap-2 w-full min-w-0">
      <div className="grid grid-cols-4 gap-2.5 w-full items-start">
        {CAPACITY_METRICS_DATA.map((card, index) => (
          <MetricCard
            key={card.id}
            {...card}
            alignmentClass={metricAlignments[index] || ""}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 w-full items-start">
        {CAPACITY_LOSSES_DATA.map((card, index) => (
          <LossCard
            key={card.id}
            title={card.title}
            value={card.value}
            bgColor={card.bgColor}
            cardClasses={`${card.cardClasses} ${lossAlignments[index] || ""}`}
            items={card.items}
          />
        ))}
      </div>
    </div>
  );
};