import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LuLayers, LuLayoutGrid } from "react-icons/lu";
import candadoIcon from "@/assets/icons/padlock.png";
import { useCapacityFlowActions } from "@/shared/hooks/dashboard/useCapacityFlowActions";
import { CapacityLossesCards } from "./CapacityLossesCards";
import { CapacityBreakdown } from "./CapacityBreakdown";

export const CapacityFlowCard: React.FC = () => {
  const [activeView, setActiveView] = useState<"flow" | "breakdown">("flow");
  const { handleMoreOptions } = useCapacityFlowActions();

  return (
    <div className="flex w-full min-w-0 min-h-[580px] flex-col justify-between gap-5 rounded-lg bg-white py-6 px-0 shadow-[4px_4px_4px_rgba(177,177,177,0.15)]">
      <div className="flex w-full flex-col justify-between gap-3 sm:flex-row sm:items-center px-4">
        <div className="flex flex-col gap-0.5 min-w-0">
          <h2 className="font-heading text-[17px] font-bold text-heading leading-tight md:text-[18px]">
            Capacity Flow: Where your Capacity Goes
          </h2>
          <p className="font-body text-sm text-text-muted md:text-base">
            Deep dive into your capacity across all layers
          </p>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2 ml-auto">
          <button
            type="button"
            onClick={() => setActiveView("flow")}
            className={`flex items-center gap-1.5 rounded-[4px] border px-2.5 py-1.5 font-body text-xs font-medium transition-colors whitespace-nowrap md:text-sm ${
              activeView === "flow"
                ? "border-brand-primary bg-[#F4FAF6] text-brand-primary hover:bg-[#E2F2E9]"
                : "border-[#E5E7EB] bg-[#F8F9FA] text-[#4B5563] hover:bg-gray-200"
            }`}
          >
            <LuLayers className="h-4 w-4 shrink-0" />
            <span>Flow View</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView("breakdown")}
            className={`flex items-center gap-1.5 rounded-[4px] border px-2.5 py-1.5 font-body text-xs font-medium transition-colors whitespace-nowrap md:text-sm ${
              activeView === "breakdown"
                ? "border-brand-primary bg-[#F4FAF6] text-brand-primary hover:bg-[#E2F2E9]"
                : "border-[#E5E7EB] bg-[#F8F9FA] text-[#4B5563] hover:bg-gray-200"
            }`}
          >
            <LuLayoutGrid className="h-4 w-4 shrink-0" />
            <span>Breakdown View</span>
          </button>

          <button
            type="button"
            onClick={handleMoreOptions}
            className="flex items-center justify-center p-0 m-0 border-none bg-transparent cursor-pointer text-[#4B5563] shrink-0"
            aria-label="More options"
          >
            <HiDotsVertical className="h-5 w-5 shrink-0 text-[#4B5563]" />
          </button>
        </div>
      </div>

      <div className="px-4 w-full flex-1">
        {activeView === "flow" ? (
          <CapacityLossesCards />
        ) : (
          <CapacityBreakdown />
        )}
      </div>

      <div className="mx-4 flex items-center gap-3 rounded-[10px] bg-[#F4FAF6] p-4 text-[#21272A]">
        <img
          src={candadoIcon}
          alt="Candado Insight"
          className="h-9 w-9 shrink-0 object-contain"
        />

        <p className="font-body text-xs leading-snug md:text-sm">
          <span className="font-bold">Key Insight:</span> Your biggest opportunity lies in IT inefficiencies. Right-sizing your infrastructure and optimizing server utilization could recover up to 3.0 MW capacity.
        </p>
      </div>
    </div>
  );
};