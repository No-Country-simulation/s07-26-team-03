

import { FeatureCard } from "@/shared/components/card/feature-card/FeatureCard";
import { benefitsContent } from "../benefits.data";

export function BenefitsGrid() {
  return (
    <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
      {benefitsContent.items.map((benefit) => {
    
        return (
          <FeatureCard
            key={benefit.id}
            align="center"
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
          />
        );
      })}
    </div>
  );
}