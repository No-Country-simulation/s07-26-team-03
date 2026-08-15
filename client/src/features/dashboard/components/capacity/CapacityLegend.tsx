import React from "react";
import { BREAKDOWN_LEGEND_DATA } from "@/shared/constants/capacityBreakdown.constants";

export const CapacityLegend: React.FC = () => {
  return (
    <div className="flex flex-col gap-2.5 w-full justify-center">
      {BREAKDOWN_LEGEND_DATA.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2 text-xs">
          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.dotColor}`} />
          <span className="font-medium text-text-muted">{item.label}</span>
          <span className="font-bold text-heading ml-auto">{item.value}</span>
          <span className="font-bold text-heading">{item.percentage}</span>
        </div>
      ))}
    </div>
  );
};