import React, { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import type { DashboardTab } from "../types/dashboard-sidebar.types";
import { CapacityFlowCard } from "../components/capacity/CapacityFlowCard";
import { ScenarioComparisonCard } from "../components/compare/ScenarioComparisonCard";
import { CompareScenariosCard } from "../components/compare/CompareScenariosCard";
import { CalculatorCards } from "../../calculator/components/CalculatorCards";
import useProtectedRoutes from "@/shared/hooks/useProtectedRoutes";
import type { IAssessmentLayersAnalysis } from "@/shared/api/types/response.interface";
import { ScenarioCards } from "../components/compare/ScenarioCards";
import { LuDownload, LuShare2 } from "react-icons/lu";
import graficoBarrasIcon from "@/assets/icons/barChart.png";

const DashboardPage: React.FC = () => {
  const [data, setData] = useState<IAssessmentLayersAnalysis | null>();
  const { activeTab, setActiveTab } = useOutletContext<{
    activeTab: DashboardTab;
    setActiveTab: (tab: DashboardTab) => void;
  }>();

  console.log(data);

  const location = useLocation();

  const { protectedRoutes } = useProtectedRoutes();

  const assessmentId = location.state["assessmentId"] as string;

  useEffect(() => {
    protectedRoutes.get<IAssessmentLayersAnalysis>(`api/v1/assessments/${assessmentId}/layer-analysis`)
      .then(({ data }) => setData(data))
  }, [])

  const [lastAnalysisDate, setLastAnalysisDate] = useState<string>(
    "May 12, 2025 at 10:25"
  );

  const handleRecalculate = () => {
    const now = new Date();
    const formattedDate = `${now.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })} at ${now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}`;
    setLastAnalysisDate(formattedDate);
  };

  const handleCompareClick = () => {
    setActiveTab?.("compare-scenarios");
  };

  return (
    <div className="w-full min-w-0">
      {activeTab === "layer-breakdown" && (
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center justify-between">
              <h1 className="font-heading text-2xl font-medium text-heading">
                Advanced Analysis
              </h1>

              <div className="flex items-center gap-4">
                <span className="font-body text-sm text-text-muted font-normal">
                  Analysis completed on {lastAnalysisDate}
                </span>

                <button
                  type="button"
                  onClick={handleRecalculate}
                  className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F8F9FA] px-3 py-1.5 font-body text-sm font-medium text-[#4B5563] transition-colors hover:bg-gray-100 active:bg-gray-200 whitespace-nowrap"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0"
                  >
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                    <path d="M16 16h5v5" />
                  </svg>
                  Recalculate
                </button>
              </div>
            </div>

            <p className="font-body text-sm text-text-muted font-normal">
              Deep dive into your capacity across all layers
            </p>
          </div>

          <CalculatorCards />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] items-start gap-6 w-full min-w-0">
            <CapacityFlowCard />
            <div onClick={handleCompareClick} className="cursor-pointer w-full">
              <CompareScenariosCard />
            </div>
          </div>
        </div>
      )}

      {activeTab === "compare-scenarios" && (
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center justify-between">
              <h1 className="font-heading text-2xl font-medium text-heading">
                Compare Scenarios
              </h1>

              <div className="flex items-center gap-4">
                <span className="font-body text-sm text-text-muted font-normal">
                  Analysis completed on {lastAnalysisDate}
                </span>

                <button
                  type="button"
                  onClick={handleRecalculate}
                  className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F8F9FA] px-3 py-1.5 font-body text-sm font-medium text-[#4B5563] transition-colors hover:bg-gray-100 active:bg-gray-200 whitespace-nowrap"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0"
                  >
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                    <path d="M16 16h5v5" />
                  </svg>
                  Recalculate
                </button>
              </div>
            </div>

            <p className="font-body text-sm text-text-muted font-normal">
              Deep dive into your capacity across all layers
            </p>
          </div>

          <ScenarioCards />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] items-start gap-6 w-full min-w-0">
            <ScenarioComparisonCard />

            <div className="w-full shrink-0 flex flex-col gap-4">
              <div className="flex flex-col justify-between rounded-none bg-white p-4 shadow-[4px_4px_4px_rgba(177,177,177,0.15)]">
                <div className="flex flex-col gap-1">
                  <h2 className="font-heading text-base font-medium text-heading">
                    Scenario Impact Overview
                  </h2>
                  <p className="font-body text-xs leading-tight text-text-muted text-left font-normal">
                    See the impact of different optimization strategies
                  </p>
                </div>

                <div className="mt-3.5 flex flex-col gap-2.5">
                  <span className="font-body text-sm font-medium text-text">
                    grafico de barras...
                  </span>
                </div>
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
                  <h3 className="font-heading text-base font-medium text-heading leading-tight">
                    Export &amp; Share your Report
                  </h3>
                  <p className="font-body text-xs text-text-muted leading-tight font-normal">
                    Download or share a professional report with detailed insights.
                  </p>
                </div>

                <div className="mt-1 flex flex-col w-full gap-2">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-primary py-2.5 font-body text-sm font-medium text-white transition-opacity hover:opacity-90 active:opacity-100 shadow-sm"
                  >
                    <LuDownload className="h-4 w-4 shrink-0 stroke-[2]" />
                    Download PDF
                  </button>

                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg border-2 border-brand-primary bg-transparent py-2.5 font-body text-sm font-medium text-brand-primary transition-colors hover:bg-brand-primary/10 active:bg-brand-primary/20"
                  >
                    <LuShare2 className="h-4 w-4 shrink-0 stroke-[2]" />
                    Share Results
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "export-pdf" && (
        <div>
          <h1 className="font-heading text-2xl font-medium text-heading">
            Export PDF
          </h1>
          <p className="mt-2 font-body text-text font-normal">Opciones de exportación...</p>
        </div>
      )}

      {activeTab === "shared-results" && (
        <div>
          <h1 className="font-heading text-2xl font-medium text-heading">
            Shared Results
          </h1>
          <p className="mt-2 font-body text-text font-normal">Resultados compartidos...</p>
        </div>
      )}

      {activeTab === "settings" && (
        <div>
          <h1 className="font-heading text-2xl font-medium text-heading">
            Settings
          </h1>
          <p className="mt-2 font-body text-text font-normal">Configuración de la cuenta...</p>
        </div>
      )}

      {activeTab === "documentation" && (
        <div>
          <h1 className="font-heading text-2xl font-medium text-heading">
            Documentation
          </h1>
          <p className="mt-2 font-body text-text font-normal">Documentación del sistema...</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;