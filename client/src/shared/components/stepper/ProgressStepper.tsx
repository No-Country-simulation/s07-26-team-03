import { PROGRESS_STEPS } from "../../constants/ProgressStepper.constants";
import type { ProgressStepperProps } from "../../types/ProgressStepper.types";
import { useProgressStepper } from "../../hooks/useProgressStepper";

export default function ProgressStepper({
  currentStep,
}: ProgressStepperProps) {
  const { currentStep: defaultStep } = useProgressStepper();
  const activeStep = currentStep ?? defaultStep;

  const totalSteps = PROGRESS_STEPS.length;
  const progressPercent =
    totalSteps > 1
      ? Math.min(Math.max((activeStep - 1) / (totalSteps - 1), 0), 1) * 100
      : 0;

  return (
    <div className="relative w-full">
      <div className="absolute left-5 right-5 top-5 z-0 h-1 -translate-y-1/2 bg-[#E5E7EB] dark:bg-[#252525]">
        <div
          className="h-full bg-[#0E6A37] transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="relative z-10 flex w-full justify-between">
        {PROGRESS_STEPS.map((step) => {
          const completed = step.id <= activeStep;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`
                  flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-full border text-sm font-semibold transition-all duration-200
                  ${completed
                    ? "border-[#0E6A37] bg-[#0E6A37] text-white shadow-[inset_0px_-1.17px_1.17px_rgba(14,106,55,0.25)]"
                    : "border-[#E5E7EB] bg-[#E5E7EB] dark:border-[#252525] dark:bg-[#252525] text-[#4B5563] dark:text-white"
                  }
                `}
              >
                {step.id}
              </div>

              <span
                className={`
                  mt-3 text-sm transition-colors duration-200
                  ${completed
                    ? "font-semibold text-[#0E6A37]"
                    : "font-normal text-[#9CA3AF] dark:text-gray-300"
                  }
                `}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}