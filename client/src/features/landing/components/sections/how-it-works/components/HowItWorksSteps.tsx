import { howItWorksContent } from "../how-it-works.data";
import { StepCard } from "./step-card/StepCard";

export function HowItWorksSteps() {
  return (
    <div
      className="
        relative
        grid
        gap-16
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {howItWorksContent.steps.map((step, index) => {
        return (
          <StepCard
            key={step.id}
            step={step.step}
            title={step.title}
            description={step.description}
            icon={step.icon}
            isLast={index === howItWorksContent.steps.length - 1}
          />
        );
      })}
    </div>
  );
}