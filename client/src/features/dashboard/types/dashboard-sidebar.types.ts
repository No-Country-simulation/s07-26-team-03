import type { ComponentType, ReactNode } from "react";

export type DashboardTab =
  | "layer-breakdown"
  | "compare-scenarios"
  | "export-pdf"
  | "shared-results"
  | "settings"
  | "documentation";

export interface SidebarFooterProps {
  onHelpClick?: () => void;
}

export interface NavItemProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export interface SidebarGroupProps {
  title?: string;
  children: ReactNode;
}

export interface DashboardSidebarProps {
  activeTab?: DashboardTab;
  onSelectTab?: (tab: DashboardTab) => void;
}