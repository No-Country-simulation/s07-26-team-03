import React from "react";
import {
  CAPACITY_LOSSES_DATA,
  CAPACITY_METRICS_DATA,
} from "@/shared/constants/capacityLosses.constants";
import { MetricConnectorSvg } from "@/shared/icons/CapacityIcons";
import { getMetricCardTheme } from "../../utils/capacityTheme";
import { MetricCard } from "./MetricCard";
import { LossCard } from "./LossCard";

export const CapacityLossesCards: React.FC = () => {
  return (
    <div className="flex flex-col w-full max-w-none mx-auto items-center justify-center px-1">
      <div className="grid grid-cols-[1fr_14px_1fr_14px_1fr_14px_1fr] w-full items-start metric-stagger-container">
        {CAPACITY_METRICS_DATA.map((card, index) => {
          const isLast = index === CAPACITY_METRICS_DATA.length - 1;
          const { hexColor } = getMetricCardTheme(card.id);

          return (
            <React.Fragment key={card.id}>
              <MetricCard {...card} isLast={isLast} />
              {!isLast && (
                <MetricConnectorSvg color={hexColor} idSuffix={card.id} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-3 w-full items-start mt-10 loss-stagger-container">
        {CAPACITY_LOSSES_DATA.map((card) => (
          <LossCard
            key={card.id}
            title={card.title}
            value={card.value}
            bgColor={card.bgColor}
            cardClasses={card.cardClasses}
            items={card.items}
          />
        ))}
      </div>
    </div>
  );
};