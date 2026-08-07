import { FeatureItem } from "@/shared/components/contents/feature-items";
import { IoHourglassOutline, IoLocateOutline, IoStopwatchOutline } from "react-icons/io5";


export function HeroFeatureList() {
  return (
    <div
      className="
        grid
        gap-6
        grid-cols-1
        sm:grid-cols-3
        lg:grid-cols-3
      "
    >
      <FeatureItem
        icon={<IoStopwatchOutline  />}
        title="Done in under"
        description="3 minutes"
      />

      <FeatureItem
        icon={<IoLocateOutline />}
        title="No sign-up"
        description="required"
      />

      <FeatureItem
        icon={<IoHourglassOutline />}
        title="Actionable"
        description="capacity insights"
      />
    </div>
  );
}