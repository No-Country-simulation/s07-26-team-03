import React from "react";
import { LuArrowRight, LuDownload, LuShare2 } from "react-icons/lu";
import graficoBarrasIcon from "@/assets/icons/graficoBarras.png";
import { useCompareScenariosActions } from "@/shared/hooks/dashboard/useCompareScenariosActions";

export const CompareScenariosCard: React.FC = () => {
  const { handleViewScenarios, handleDownloadPDF, handleShareResults } =
    useCompareScenariosActions();

  return (
    <div className="w-full lg:w-[302px] shrink-0 flex flex-col gap-6">
      <div className="flex flex-col justify-between rounded-none bg-white p-6 shadow-[0px_0.5px_1px_rgba(25,33,61,0.04)]">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-[16px] font-medium text-heading">
            Compare Scenarios
          </h2>
          <p className="font-body text-sm text-text-muted text-left">
            See the impact of different optimization strategies
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <div className="flex h-[67.33px] items-center justify-between rounded-xl border border-brand-primary bg-[#E7F0EB] px-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-primary" />
              <span className="font-body text-sm font-semibold text-brand-primary">
                62% wasted
              </span>
            </div>
            <span className="font-body text-sm font-medium text-text-muted">
              6.2MW
            </span>
          </div>

          <div className="flex h-[67.33px] items-center justify-between rounded-xl border border-[#9FDCFC] bg-[#E0F2FE] px-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0284C7]" />
              <span className="font-body text-sm font-semibold text-[#0284C7]">
                38% wasted
              </span>
            </div>
            <span className="font-body text-sm font-medium text-text-muted">
              3.8MW
            </span>
          </div>

          <div className="flex h-[67.33px] items-center justify-between rounded-xl border border-[#6FA587] bg-[#FEF3C7] px-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-primary" />
              <span className="font-body text-sm font-semibold text-brand-primary">
                22% wasted
              </span>
            </div>
            <span className="font-body text-sm font-medium text-text-muted">
              2.2MW
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleViewScenarios}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F8F9FA] py-2.5 font-body text-sm font-normal text-[#4B5563] transition-colors hover:bg-gray-100 active:bg-gray-200 whitespace-nowrap"
        >
          View Scenarios Comparison
          <LuArrowRight className="h-4 w-4 shrink-0 stroke-[2.5]" />
        </button>
      </div>

      <div className="flex flex-col items-center text-center gap-4 rounded-none bg-[#E7F0EB] p-6 shadow-[0px_0.5px_1px_rgba(25,33,61,0.04)]">
        <div className="flex items-center justify-center">
          <img
            src={graficoBarrasIcon}
            alt="Gráfico de Barras"
            className="h-12 w-12 object-contain"
          />
        </div>

        <div className="flex flex-col items-center gap-1">
          <h3 className="font-heading text-[16px] font-bold text-heading">
            Export &amp; Share your Report
          </h3>
          <p className="font-body text-sm text-text-muted leading-relaxed max-w-[240px]">
            Download or share a professional report with detailed insights.
          </p>
        </div>

        <div className="mt-2 flex flex-col w-full gap-2.5">
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-primary py-2.5 font-body text-sm font-medium text-white transition-opacity hover:opacity-90 active:opacity-100 shadow-sm"
          >
            <LuDownload className="h-4 w-4 shrink-0 stroke-[2]" />
            Download PDF
          </button>

          <button
            type="button"
            onClick={handleShareResults}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-brand-primary bg-transparent py-2.5 font-body text-sm font-medium text-brand-primary transition-colors hover:bg-brand-primary/10 active:bg-brand-primary/20"
          >
            <LuShare2 className="h-4 w-4 shrink-0 stroke-[2]" />
            Share Results
          </button>
        </div>
      </div>
    </div>
  );
};