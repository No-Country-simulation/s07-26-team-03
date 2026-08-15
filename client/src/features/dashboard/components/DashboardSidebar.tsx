import {
  LuGauge,
  LuLayers,
  LuDownload,
  LuShare2,
  LuSettings,
  LuFileText,
  LuHeadphones,
} from "react-icons/lu";
import icon from "@/assets/icons/icon.svg";
import { SquareWithCircleIcon } from "@/shared/icons/SquareWithCircleIcon";
import type { DashboardSidebarProps } from "../types/dashboard-sidebar.types";

export default function DashboardSidebar({
  activeTab = "layer-breakdown",
  onSelectTab,
}: DashboardSidebarProps) {
  const handleHelp = () => {
    alert("Sección de soporte...");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex h-screen w-[233px] min-w-[233px] max-w-[233px] flex-col justify-between border-r border-gray-100 bg-surface shadow-[0px_0.5px_8px_rgba(25,33,61,0.06)] shrink-0">
      <div className="flex flex-col overflow-y-auto">
        <header className="flex h-[88px] w-full items-center justify-center px-2">
          <div className="flex items-center gap-1.5">
            <img
              src={icon}
              alt="Capacity IQ"
              className="h-8 w-8 shrink-0 object-contain"
            />
            <div className="flex items-baseline whitespace-nowrap text-lg">
              <span className="font-logo font-bold text-brand-primary">
                Capacity
              </span>
              <span className="ml-0.5 font-logo font-bold text-[#C5922C]">
                IQ
              </span>
              <span className="ml-1 font-body text-[11px] font-normal text-text">
                by Datacenter
              </span>
            </div>
          </div>
        </header>

        <main className="flex flex-col gap-5 px-4 pt-2">
          <div className="flex items-center justify-center gap-3 rounded-[12px] px-3 py-2 text-brand-primary">
            <LuGauge className="h-5 w-5 shrink-0 text-brand-primary" />
            <span className="font-heading text-sm font-bold uppercase tracking-wide">
              Overview
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="px-4 font-heading text-xs font-semibold tracking-wider text-placeholder uppercase">
              ANALYSIS
            </span>
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => onSelectTab?.("layer-breakdown")}
                className={`flex w-full items-center justify-center gap-3 rounded-[12px] px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === "layer-breakdown"
                    ? "border border-brand-primary/20 bg-[#E7F0EB] font-semibold text-brand-primary"
                    : "text-[#6B7280] hover:bg-gray-100 hover:text-heading"
                }`}
              >
                <LuLayers
                  className={`h-5 w-5 shrink-0 ${
                    activeTab === "layer-breakdown"
                      ? "text-brand-primary"
                      : "text-[#6B7280]"
                  }`}
                />
                <span className="truncate">Layer Breakdown</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab?.("compare-scenarios")}
                className={`flex w-full items-center justify-center gap-3 rounded-[12px] px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === "compare-scenarios"
                    ? "border border-brand-primary/20 bg-[#E7F0EB] font-semibold text-brand-primary"
                    : "text-[#6B7280] hover:bg-gray-100 hover:text-heading"
                }`}
              >
                <SquareWithCircleIcon
                  className={`h-5 w-5 shrink-0 ${
                    activeTab === "compare-scenarios"
                      ? "text-brand-primary"
                      : "text-[#6B7280]"
                  }`}
                />
                <span className="truncate">Compare Scenarios</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="px-4 font-heading text-xs font-semibold tracking-wider text-placeholder uppercase">
              REPORTS
            </span>
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => onSelectTab?.("export-pdf")}
                className={`flex w-full items-center justify-center gap-3 rounded-[12px] px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === "export-pdf"
                    ? "border border-brand-primary/20 bg-[#E7F0EB] font-semibold text-brand-primary"
                    : "text-[#6B7280] hover:bg-gray-100 hover:text-heading"
                }`}
              >
                <LuDownload
                  className={`h-5 w-5 shrink-0 ${
                    activeTab === "export-pdf"
                      ? "text-brand-primary"
                      : "text-[#6B7280]"
                  }`}
                />
                <span className="truncate">Export PDF</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab?.("shared-results")}
                className={`flex w-full items-center justify-center gap-3 rounded-[12px] px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === "shared-results"
                    ? "border border-brand-primary/20 bg-[#E7F0EB] font-semibold text-brand-primary"
                    : "text-[#6B7280] hover:bg-gray-100 hover:text-heading"
                }`}
              >
                <LuShare2
                  className={`h-5 w-5 shrink-0 ${
                    activeTab === "shared-results"
                      ? "text-brand-primary"
                      : "text-[#6B7280]"
                  }`}
                />
                <span className="truncate">Shared Results</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="px-4 font-heading text-xs font-semibold tracking-wider text-placeholder uppercase">
              HELP
            </span>
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => onSelectTab?.("settings")}
                className={`flex w-full items-center justify-center gap-3 rounded-[12px] px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === "settings"
                    ? "border border-brand-primary/20 bg-[#E7F0EB] font-semibold text-brand-primary"
                    : "text-[#6B7280] hover:bg-gray-100 hover:text-heading"
                }`}
              >
                <LuSettings
                  className={`h-5 w-5 shrink-0 ${
                    activeTab === "settings"
                      ? "text-brand-primary"
                      : "text-[#6B7280]"
                  }`}
                />
                <span className="truncate">Settings</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTab?.("documentation")}
                className={`flex w-full items-center justify-center gap-3 rounded-[12px] px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === "documentation"
                    ? "border border-brand-primary/20 bg-[#E7F0EB] font-semibold text-brand-primary"
                    : "text-[#6B7280] hover:bg-gray-100 hover:text-heading"
                }`}
              >
                <LuFileText
                  className={`h-5 w-5 shrink-0 ${
                    activeTab === "documentation"
                      ? "text-brand-primary"
                      : "text-[#6B7280]"
                  }`}
                />
                <span className="truncate">Documentation</span>
              </button>
            </div>
          </div>
        </main>
      </div>

      <footer className="px-4 pb-10 pt-6">
        <button
          type="button"
          onClick={handleHelp}
          className="flex w-full items-center justify-between text-left transition-opacity hover:opacity-80 gap-2"
        >
          <div className="flex-1 min-w-0">
            <h4 className="font-heading text-sm font-bold leading-[115%] text-brand-primary">
              Need a help?
            </h4>
            <p className="mt-1 font-body text-xs text-[#6F6C8F] whitespace-nowrap">
              Chat with live support
            </p>
          </div>

          <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#E5E7EB] text-[#4B5563]">
            <LuHeadphones className="h-5 w-5" />
          </div>
        </button>
      </footer>
    </aside>
  );
}