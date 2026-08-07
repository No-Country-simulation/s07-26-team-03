import illustration from "@/assets/images/advanced-analysis.webp";

import { advancedAnalysisContent } from "../advanced-analysis.data";

export function AdvancedAnalysisIllustration() {
  return (
    <div
      className="
        flex
        items-center
        justify-center
      "
    >
      <img
        src={illustration}
        alt={advancedAnalysisContent.illustrationAlt}
        className="
          h-auto
          w-full
          max-w-155
          object-contain
        "
      />
    </div>
  );
}