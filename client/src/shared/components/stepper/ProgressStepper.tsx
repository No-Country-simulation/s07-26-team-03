import { PROGRESS_STEPS } from "../../constants/ProgressStepper.constants";
import type { ProgressStepperProps } from "../../types/ProgressStepper.types";
import { useProgressStepper } from "../../hooks/useProgressStepper";

export default function ProgressStepper({
  currentStep,
}: ProgressStepperProps) {
  const { currentStep: defaultStep } = useProgressStepper();

  const activeStep = currentStep ?? defaultStep;

  return (
    <div className="flex w-full items-start justify-between">
      {PROGRESS_STEPS.map((step, index) => {
        const completed = step.id <= activeStep;
        const isLast = index === PROGRESS_STEPS.length - 1;

        return (
          <div
            key={step.id}
            className={`relative flex items-start ${isLast ? "flex-none" : "flex-1"}`}
          >
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`
                  flex h-10 w-10 flex-shrink-0 items-center justify-center
                  rounded-full border-2 text-sm font-semibold transition-colors
                  ${
                    completed
                      ? "border-[#0E6A37] bg-[#0E6A37] text-white"
                      : "border-[#E5E7EB] bg-[#E5E7EB] text-[#C1C7CD]"
                  }
                `}
              >
                {completed ? "✓" : step.id}
              </div>

              <span
                className={`
                  mt-3 whitespace-nowrap text-sm
                  ${
                    completed
                      ? "font-medium text-[#0E6A37]"
                      : "text-[#C1C7CD]"
                  }
                `}
              >
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div
                className={`
                  absolute left-[48px] right-[8px] top-[18px] z-0 h-1 transition-colors
                  ${
                    step.id <= activeStep
                      ? "bg-[#0E6A37]"
                      : "bg-[#E5E7EB]"
                  }
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}