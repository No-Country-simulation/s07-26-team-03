import React from "react";
import { SCENARIO_CARDS_DATA } from "@/shared/constants/scenario-cards.constants";

export const ScenarioCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
      {SCENARIO_CARDS_DATA.map((card) => (
        <div
          key={card.id}
          className={`bg-white rounded-b-[6px] border-t-2 ${card.topBorderColor} shadow-[4px_4px_4px_rgba(177,177,177,0.15)] p-6 flex flex-col justify-between gap-5 h-full w-full min-w-0`}
        >
          <div className="flex flex-col gap-2">
            <span
              className={`inline-block w-max px-4 py-1.5 rounded-[6px] text-xs font-medium ${card.badgeBg} ${card.badgeTextColor}`}
            >
              {card.badgeText}
            </span>

            <h3 className="text-lg font-medium text-heading leading-tight">
              {card.title}
            </h3>

            <p className="text-sm font-normal text-text-muted leading-tight">
              {card.subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className={`text-lg font-normal ${card.metricsColor}`}>
                {card.metrics.stranded}
              </span>
              <span className={`text-lg font-normal ${card.metricsColor}`}>
                {card.metrics.wasted}
              </span>
              <span className={`text-lg font-normal ${card.metricsColor}`}>
                {card.metrics.financial}
              </span>
            </div>

            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-normal text-text-muted leading-snug">
                Stranded Capacity
              </span>
              <span className="text-xs font-normal text-text-muted leading-snug">
                Wasted Capacity
              </span>
              <span className="text-xs font-normal text-text-muted leading-snug">
                Annual Financial Loss
              </span>
            </div>
          </div>

          <div className="border-t-2 border-[#E4E6E8] pt-4 flex items-center justify-between w-full">
            <span className="text-base font-medium text-heading">
              Capacity Score
            </span>

            <div className="flex items-center gap-2.5">
              <span className="text-base font-medium text-heading">
                {card.score}
              </span>

              <span
                className={`px-3.5 py-1.5 rounded-[6px] text-xs font-medium ${card.scoreBadgeBg} ${card.scoreBadgeTextColor}`}
              >
                {card.scoreStatus}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScenarioCards;