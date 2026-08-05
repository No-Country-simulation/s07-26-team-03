
import type { ChecklistItem } from "@/shared/components/ui/checklist";
import type { SectionContent } from "@/shared/types/common.types";

export interface AdvancedAnalysisCta {
  iconAlt: string;
  title: string;
  description: string;
  checklist: ChecklistItem[];
  primaryAction: {
    label: string;
    href: string;
  };

  secondaryAction: {
    label: string;
    href: string;
  };
}

export interface AdvancedAnalysisContent extends SectionContent {
    features: ChecklistItem[];
    illustrationAlt: string;
    cta: AdvancedAnalysisCta;
}