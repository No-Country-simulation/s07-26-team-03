import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LuLayers, LuLayoutGrid } from "react-icons/lu";
import candadoIcon from "@/assets/icons/candado.png";
import { useCapacityFlowActions } from "@/shared/hooks/dashboard/useCapacityFlowActions";

export const CapacityFlowCard: React.FC = () => {
  const { handleFlowView, handleBreakdownView, handleMoreOptions } =
    useCapacityFlowActions();

  return (
    <div className="w-full min-w-0 rounded-none bg-white p-6 shadow-[0px_0.5px_1px_rgba(25,33,61,0.04)] flex flex-col justify-between gap-6">
      <div className="relative flex flex-col gap-1 w-full min-w-0">
        <h2 className="font-heading text-[18px] font-bold text-heading pr-72 leading-snug">
          Capacity Flow: Where your Capacity Goes
        </h2>

        <p className="font-body text-sm text-text-muted">
          Deep dive into your capacity across all layers
        </p>

        <div className="absolute top-1/2 -translate-y-1/2 -right-3 z-10 flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleFlowView}
            className="flex items-center gap-2 rounded-lg border border-brand-primary bg-[#F4FAF6] px-3 py-1.5 font-body text-sm font-medium text-brand-primary transition-colors hover:bg-[#E2F2E9] whitespace-nowrap"
          >
            <LuLayers className="h-4.5 w-4.5 shrink-0" />
            <span>Flow View</span>
          </button>

          <button
            type="button"
            onClick={handleBreakdownView}
            className="flex items-center gap-2 rounded-lg border border-[#4B5563] bg-[#4B5563] px-3 py-1.5 font-body text-sm font-medium text-white transition-colors hover:bg-[#374151] whitespace-nowrap"
          >
            <LuLayoutGrid className="h-4.5 w-4.5 shrink-0" />
            <span>Breakdown View</span>
          </button>

          <button
            type="button"
            onClick={handleMoreOptions}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-heading transition-colors hover:bg-gray-100 shrink-0"
            aria-label="More options"
          >
            <HiDotsVertical className="h-5 w-5 shrink-0 stroke-[1.5]" />
          </button>
        </div>
      </div>

      <div className="font-body text-sm text-text-muted py-8">
        cargando metricas...
      </div>

      <div className="flex items-center gap-4 rounded-[10px] bg-[#F4FAF6] p-4 text-[#21272A]">
        <img
          src={candadoIcon}
          alt="Candado Insight"
          className="h-10 w-10 shrink-0 object-contain"
        />

        <p className="font-body text-sm leading-snug">
          <span className="font-bold">Key Insight:</span> Your biggest opportunity lies in IT inneficiencies. Right-sizing your infraestruture and optimizing server utilization could recover up to 3.0 MV capacity.
        </p>
      </div>
    </div>
  );
};