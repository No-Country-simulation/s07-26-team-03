

import { Container } from "@/shared/components/ui/container/Container";
import { AdvancedAnalysisContent } from "./components/AdvancedAnalysisContent";
import { AdvancedAnalysisCTA } from "./components/AdvancedAnalysisCTA";
import { AdvancedAnalysisIllustration } from "./components/AdvancedAnalysisIllustration";

export function AdvancedAnalysis() {
  return (
    <section
      id="advanced-analysis"
      className="py-16 md:py-20 lg:py-24 px-4 md:px-8 bg-surface"
    >
      <Container>
        <div className="space-y-20">
          <div
            className="
              grid
              gap-16
              lg:grid-cols-2
              lg:items-center
            "
          >
            <AdvancedAnalysisContent />

            <AdvancedAnalysisIllustration />
          </div>

          <AdvancedAnalysisCTA />
        </div>
      </Container>
    </section>
  );
}