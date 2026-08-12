import {
  LuGauge,
  LuLayers,
  LuDownload,
  LuShare2,
  LuSettings,
  LuFileText,
} from "react-icons/lu";
import {
  SidebarHeader,
  SidebarFooter,
  NavItem,
  SidebarGroup,
} from "./SidebarComponents";
import { SquareWithCircleIcon } from "./../icons/SquareWithCircleIcon";
import type { DashboardSidebarProps } from "@/shared/interfaces/sidebar.interface";

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
        <SidebarHeader />

        <main className="flex flex-col gap-5 px-4 pt-2">
          <div className="flex items-center justify-center gap-3 rounded-[12px] px-3 py-2 text-brand-primary">
            <LuGauge className="h-5 w-5 shrink-0 text-brand-primary" />
            <span className="font-heading text-sm font-bold uppercase tracking-wide">
              Overview
            </span>
          </div>

          <SidebarGroup title="ANALYSIS">
            <NavItem
              icon={LuLayers}
              label="Layer Breakdown"
              active={activeTab === "layer-breakdown"}
              onClick={() => onSelectTab?.("layer-breakdown")}
            />
            <NavItem
              icon={SquareWithCircleIcon}
              label="Compare Scenarios"
              active={activeTab === "compare-scenarios"}
              onClick={() => onSelectTab?.("compare-scenarios")}
            />
          </SidebarGroup>

          <SidebarGroup title="REPORTS">
            <NavItem
              icon={LuDownload}
              label="Export PDF"
              active={activeTab === "export-pdf"}
              onClick={() => onSelectTab?.("export-pdf")}
            />
            <NavItem
              icon={LuShare2}
              label="Shared Results"
              active={activeTab === "shared-results"}
              onClick={() => onSelectTab?.("shared-results")}
            />
          </SidebarGroup>

          <SidebarGroup title="HELP">
            <NavItem
              icon={LuSettings}
              label="Settings"
              active={activeTab === "settings"}
              onClick={() => onSelectTab?.("settings")}
            />
            <NavItem
              icon={LuFileText}
              label="Documentation"
              active={activeTab === "documentation"}
              onClick={() => onSelectTab?.("documentation")}
            />
          </SidebarGroup>
        </main>
      </div>

      <SidebarFooter onHelpClick={handleHelp} />
    </aside>
  );
}