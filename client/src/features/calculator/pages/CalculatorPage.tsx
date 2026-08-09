import ProgressStepper from "@/shared/components/stepper/ProgressStepper";
import RadioCards from "@/shared/components/stepper/RadioCards";
import ProgressBar from "@/shared/components/stepper/Progressbar";
import AssessmentCard from "@/shared/components/stepper/AssessmentCard";
import ResultCard from "@/shared/components/stepper/ResultCard";
import type { CoolingType, IDataForCalculation } from "@/shared/api";

import { useCalculator } from "@/shared/hooks/useCalculator";

const CalculatorPage = () => {
  const {
    stepIndex,
    resultCard,
    isLoading,
    totalSteps,
    currentGroup,
    currentCard,
    formData,
    fineTuneValues,
    handleNext,
    handleBack,
    handleCardChange,
    handleSliderChange,
    getCurrentCardConfig,
  } = useCalculator();

  const currentFineTuneValue =
    fineTuneValues[stepIndex] ?? currentCard.range?.default ?? 0;

  const currentStep = resultCard  ? 4 : stepIndex + 1;

  const handleExport = () => {
    const data: IDataForCalculation = {
      facilityMv: formData[0],
      utilizationPct: formData[1],
      coolingType: formData[2] as CoolingType,
    };
    console.log(data);
  };

  return (
    <div className="mx-auto my-30 flex min-h-[600px] w-full max-w-[800px] flex-col gap-10 rounded-[32px] bg-white p-8 shadow-[0_2px_15px_rgba(25,33,61,0.1)]">
      <ProgressStepper currentStep={currentStep} />

      <section className="flex flex-1 flex-col justify-between gap-6">
        {!resultCard && (
          <RadioCards
            group={currentGroup}
            selectedId={formData[stepIndex]}
            onChange={handleCardChange}
          />
        )}
        

        {stepIndex === 0 && currentCard.range && (
          <ProgressBar
            key={`step-0-${formData[0]}`} 
            title="Fine tune your capacity (MW)"
            startValue={currentCard.range.min}
            activeValue={currentFineTuneValue}
            endValue={currentCard.range.max}
            unit="MW"
            onChange={handleSliderChange}
          />
        )}

        {stepIndex === 1 && currentCard.range && (
          <ProgressBar
            key={`step-1-${formData[1]}`} 
            title="Fine tune your utilization (%)"
            startValue={currentCard.range.min}
            activeValue={currentFineTuneValue}
            endValue={currentCard.range.max}
            unit="%"
            onChange={handleSliderChange}
          />
        )}

        {stepIndex === 2 && !resultCard && (
          <AssessmentCard
            data={{
              facilitySize: {
                label: getCurrentCardConfig(0).title,
                value: fineTuneValues[0],
              },
              utilization: {
                label: getCurrentCardConfig(1).title,
                value: fineTuneValues[1],
              },
              coolingType: {
                value: getCurrentCardConfig(2).title.toUpperCase(),
              },
            }}
          />
        )}

        {resultCard && (
          <>
            <AssessmentCard
              data={{
                facilitySize: {
                  label: getCurrentCardConfig(0).title,
                  value: fineTuneValues[0],
                },
                utilization: {
                  label: getCurrentCardConfig(1).title,
                  value: fineTuneValues[1],
                },
                coolingType: {
                  value: getCurrentCardConfig(2).title.toUpperCase(),
                },
              }}
            />
            <ResultCard />
            <ProgressBar
              key={`step-0-${formData[0]}`} 
              title="Anual financial impact range"
              startValue={1.24}
              activeValue={1.46}
              endValue={1.68}
              unit="M"
              dolarSign={true}
              toggle={resultCard}
            />
          </>
        )}
      </section>

      <footer className="flex items-center justify-between">
        <p className="font-body text-base text-placeholder">
          Step {resultCard ? totalSteps + 1 : stepIndex + 1} of {totalSteps + 1}
        </p>

        <div className="flex gap-4">
          {stepIndex > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex h-[40px] w-[120px] items-center justify-center rounded-[8px] border border-brand-primary text-base font-medium text-brand-primary transition-colors hover:bg-gray-50"
            >
              Back
            </button>
          )}

          {isLoading &&
            <button
              type="button"
              onClick={handleExport}
              className="flex h-[40px] w-[165px] items-center justify-center rounded-[8px] bg-brand-primary text-base font-medium text-white transition-opacity hover:opacity-90"
            >
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </button>
          }

          {!isLoading && !resultCard &&
            <button
              type="button"
              onClick={handleNext}
              className="flex h-[40px] w-[165px] items-center justify-center rounded-[8px] bg-brand-primary text-base font-medium text-white transition-opacity hover:opacity-90"
            >
              {stepIndex === totalSteps - 1 ? "Calculate" : "Next"}
            </button>
          }

          {resultCard &&
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center h-[40px] w-[165px] justify-between rounded-[8px] bg-brand-primary px-4 py-2 text-white transition-opacity hover:opacity-90"
            >
              <span className="text-[15px]">Shared Report</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M8 10V7.5C8 5.29 9.79 3.5 12 3.5C14.21 3.5 16 5.29 16 7.5V10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle
                  cx="12"
                  cy="15"
                  r="1"
                  fill="currentColor"
                />
              </svg>
            </button>
          }
        </div>
      </footer>
    </div>
  );
};

export default CalculatorPage;