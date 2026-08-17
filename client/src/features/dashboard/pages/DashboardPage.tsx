import React, { useState } from "react";
import { data, useLocation, useOutletContext } from "react-router-dom";
import type { DashboardTab } from "../types/dashboard-sidebar.types";
import { CapacityFlowCard } from "../components/capacity/CapacityFlowCard";
import { CompareScenariosCard } from "../components/CompareScenariosCard";
import { CalculatorCards } from "../../calculator/components/CalculatorCards";
import useProtectedRoutes from "@/shared/hooks/useProtectedRoutes";
import type { IAssessmentLayersAnalysis } from "@/shared/api/types/response.interface";

const DashboardPage: React.FC = () => {
  const { activeTab } = useOutletContext<{
    activeTab: DashboardTab;
    setActiveTab: (tab: DashboardTab) => void;
  }>();

  const location = useLocation();

  const { protectedRoutes } = useProtectedRoutes();

  const assessmentId = location.state["assessmentId"] as string;


  const response = protectedRoutes.get<IAssessmentLayersAnalysis>(`assessments/${assessmentId}/layer-analysis`);

  response.then(({ data }) => console.log(data));


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

  return (
    <div className="w-full min-w-0">
      {activeTab === "layer-breakdown" && (
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center justify-between">
              <h1 className="font-heading text-2xl font-bold text-heading">
                Advanced Analysis
              </h1>

              <div className="flex items-center gap-4">
                <span className="font-body text-sm text-text-muted">
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

            <p className="font-body text-sm text-text-muted">
              Deep dive into your capacity across all layers
            </p>
          </div>

          <CalculatorCards />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] items-start gap-6 w-full min-w-0">
            <CapacityFlowCard />
            <CompareScenariosCard />
          </div>
        </div>
      )}

      {activeTab === "compare-scenarios" && (
        <div>
          <h1 className="font-heading text-2xl font-bold text-heading">
            Compare Scenarios
          </h1>
          <p className="mt-2 font-body text-text">Comparativa de escenarios...</p>
        </div>
      )}

      {activeTab === "export-pdf" && (
        <div>
          <h1 className="font-heading text-2xl font-bold text-heading">
            Export PDF
          </h1>
          <p className="mt-2 font-body text-text">Opciones de exportación...</p>
        </div>
      )}

      {activeTab === "shared-results" && (
        <div>
          <h1 className="font-heading text-2xl font-bold text-heading">
            Shared Results
          </h1>
          <p className="mt-2 font-body text-text">Resultados compartidos...</p>
        </div>
      )}

      {activeTab === "settings" && (
        <div>
          <h1 className="font-heading text-2xl font-bold text-heading">
            Settings
          </h1>
          <p className="mt-2 font-body text-text">Configuración de la cuenta...</p>
        </div>
      )}

      {activeTab === "documentation" && (
        <div>
          <h1 className="font-heading text-2xl font-bold text-heading">
            Documentation
          </h1>
          <p className="mt-2 font-body text-text">Documentación del sistema...</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;