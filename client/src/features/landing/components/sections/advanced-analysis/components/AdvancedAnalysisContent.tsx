

import { SectionHeader } from "@/shared/components/headers/section-header";
import { advancedAnalysisContent } from "../advanced-analysis.data";
import { Checklist } from "@/shared/components/ui/checklist";

export function AdvancedAnalysisContent() {
  return (
    <div className="space-y-8">
      <SectionHeader
        badge={advancedAnalysisContent.badge}
        title={advancedAnalysisContent.title}
        description={advancedAnalysisContent.description}
        align="left"
      />

      <Checklist
        items={advancedAnalysisContent.features}
      />
    </div>
  );
}