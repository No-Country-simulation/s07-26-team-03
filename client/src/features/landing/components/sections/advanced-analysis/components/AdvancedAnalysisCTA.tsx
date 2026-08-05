
import { CallToActionCard } from "@/shared/components/card/call-to-action-card";
import { advancedAnalysisContent } from "../advanced-analysis.data";
import { IoArrowForwardOutline } from "react-icons/io5";
import { Button } from "@/shared/components/ui/button/Button";
import { LockSecurity } from "@/shared/icons/LockSecurity";

export function AdvancedAnalysisCTA() {
  const cta = advancedAnalysisContent.cta;

  return (
    <CallToActionCard
      icon={<LockSecurity />}

      title={cta.title}

      description={cta.description}

      checklist={{
        orientation: "vertical",
        items: cta.checklist,
      }}

      primaryAction={
        <Button
          size="lg"
          fullWidth
          rightIcon={<IoArrowForwardOutline size={18} />}
        >
          {cta.primaryAction.label}
        </Button>
      }

      secondaryAction={
        <Button
          variant="ghost"
          rightIcon={<IoArrowForwardOutline size={16} />}
        >
          {cta.secondaryAction.label}
        </Button>
      }
    />
  );
}