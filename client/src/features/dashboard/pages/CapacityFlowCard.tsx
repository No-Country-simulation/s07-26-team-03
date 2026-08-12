import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LuLayers, LuLayoutGrid } from "react-icons/lu";
import candadoIcon from "@/assets/icons/padlock.png";
import { useCapacityFlowActions } from "@/shared/hooks/dashboard/useCapacityFlowActions";
import { CapacityLossesCards } from "./CapacityLossesCards";

export const CapacityFlowCard: React.FC = () => {
  const { handleFlowView, handleBreakdownView, handleMoreOptions } =
    useCapacityFlowActions();

  return (
    <div className="w-full min-w-0 rounded-none bg-white p-4 md:p-6 shadow-[4px_4px_4px_rgba(177,177,177,0.15)] flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full mb-1">
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <h2 className="font-heading text-[17px] md:text-[18px] font-bold text-heading leading-tight">
            Capacity Flow: Where your Capacity Goes
          </h2>
          <p className="font-body text-xs md:text-sm text-text-muted">
            Deep dive into your capacity across all layers
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0 justify-end -mr-2 md:-mr-3">
          <button
            type="button"
            onClick={handleFlowView}
            className="flex items-center gap-1.5 rounded-[4px] border border-brand-primary bg-[#F4FAF6] px-2.5 py-1.5 font-body text-xs md:text-sm font-medium text-brand-primary transition-colors hover:bg-[#E2F2E9] whitespace-nowrap"
          >
            <LuLayers className="h-4 w-4 shrink-0" />
            <span>Flow View</span>
          </button>

          <button
            type="button"
            onClick={handleBreakdownView}
            className="flex items-center gap-1.5 rounded-[4px] border border-[#E5E7EB] bg-[#F8F9FA] px-2.5 py-1.5 font-body text-xs md:text-sm font-medium text-[#4B5563] transition-colors hover:bg-gray-200 whitespace-nowrap"
          >
            <LuLayoutGrid className="h-4 w-4 shrink-0 text-[#4B5563]" />
            <span>Breakdown View</span>
          </button>

          <button
            type="button"
            onClick={handleMoreOptions}
            className="flex h-8 w-8 items-center justify-center rounded-[4px] text-[#4B5563] shrink-0"
            aria-label="More options"
          >
            <HiDotsVertical className="h-5 w-5 shrink-0 text-[#4B5563]" />
          </button>
        </div>
      </div>

      <CapacityLossesCards />

      <div className="flex items-center gap-4 rounded-[10px] bg-[#F4FAF6] p-4 text-[#21272A] mt-2">
        <img
          src={candadoIcon}
          alt="Candado Insight"
          className="h-10 w-10 shrink-0 object-contain"
        />

        <p className="font-body text-sm leading-snug">
          <span className="font-bold">Key Insight:</span> Your biggest opportunity lies in IT inefficiencies. Right-sizing your infrastructure and optimizing server utilization could recover up to 3.0 MW capacity.
        </p>
      </div>
    </div>
  );
};