import React from "react";
import { LuArrowRight, LuDownload, LuShare2 } from "react-icons/lu";
import graficoBarrasIcon from "@/assets/icons/barChart.png";
import { useCompareScenariosActions } from "@/shared/hooks/dashboard/useCompareScenariosActions";

export const CompareScenariosCard: React.FC = () => {
  const { handleViewScenarios, handleDownloadPDF, handleShareResults } =
    useCompareScenariosActions();

  return (
    <div className="w-full lg:w-[250px] shrink-0 flex flex-col gap-4">
      <div className="flex flex-col justify-between rounded-none bg-white p-4 shadow-[4px_4px_4px_rgba(177,177,177,0.15)]">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-lg font-bold text-heading">
            Compare Scenarios
          </h2>
          <p className="font-body text-sm leading-tight text-text-muted text-left">
            See the impact of different optimization strategies
          </p>
        </div>

        <div className="mt-3.5 flex flex-col gap-2.5">
          {/* Current State */}
          <div className="flex flex-col justify-center rounded-lg border border-brand-primary bg-[#E7F0EB] px-3 py-2.5">
            <span className="font-heading text-sm font-semibold text-heading text-left">
              Current State
            </span>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-primary shrink-0" />
                <span className="font-body text-sm font-bold text-brand-primary">
                  62% wasted
                </span>
              </div>
              <span className="font-body text-sm font-medium text-text-muted">
                6.2MW
              </span>
            </div>
          </div>

          {/* Moderate Optimization */}
          <div className="flex flex-col justify-center rounded-lg border border-[#9FDCFC] bg-[#E0F2FE] px-3 py-2.5">
            <span className="font-heading text-sm font-semibold text-heading text-left">
              Moderate Optimization
            </span>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#0284C7] shrink-0" />
                <span className="font-body text-sm font-bold text-[#0284C7]">
                  38% wasted
                </span>
              </div>
              <span className="font-body text-sm font-medium text-text-muted">
                3.8MW
              </span>
            </div>
          </div>

          {/* Max Optimization */}
          <div className="flex flex-col justify-center rounded-lg border border-[#6FA587] bg-[#FEF3C7] px-3 py-2.5">
            <span className="font-heading text-sm font-semibold text-heading text-left">
              Max Optimization
            </span>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-primary shrink-0" />
                <span className="font-body text-sm font-bold text-brand-primary">
                  22% wasted
                </span>
              </div>
              <span className="font-body text-sm font-medium text-text-muted">
                2.2MW
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleViewScenarios}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-[#F8F9FA] py-2 font-body text-xs font-medium text-[#4B5563] transition-colors hover:bg-gray-100 active:bg-gray-200 whitespace-nowrap"
        >
          <span>View Scenarios Comparation</span>
          <LuArrowRight className="h-3.5 w-3.5 shrink-0 stroke-[2.5]" />
        </button>
      </div>

      <div className="flex flex-col items-center text-center gap-3 rounded-none bg-[#E7F0EB] p-4 shadow-[4px_4px_4px_rgba(177,177,177,0.15)]">
        <div className="flex items-center justify-center">
          <img
            src={graficoBarrasIcon}
            alt="Gráfico de Barras"
            className="h-10 w-10 object-contain"
          />
        </div>

        <div className="flex flex-col items-center gap-1">
          <h3 className="font-heading text-base font-bold text-heading leading-tight">
            Export &amp; Share your Report
          </h3>
          <p className="font-body text-xs text-text-muted leading-tight">
            Download or share a professional report with detailed insights.
          </p>
        </div>

        <div className="mt-1 flex flex-col w-full gap-2">
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-primary py-2.5 font-body text-sm font-medium text-white transition-opacity hover:opacity-90 active:opacity-100 shadow-sm"
          >
            <LuDownload className="h-4 w-4 shrink-0 stroke-[2]" />
            Download PDF
          </button>

          <button
            type="button"
            onClick={handleShareResults}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border-2 border-brand-primary bg-transparent py-2.5 font-body text-sm font-medium text-brand-primary transition-colors hover:bg-brand-primary/10 active:bg-brand-primary/20"
          >
            <LuShare2 className="h-4 w-4 shrink-0 stroke-[2]" />
            Share Results
          </button>
        </div>
      </div>
    </div>
  );
};