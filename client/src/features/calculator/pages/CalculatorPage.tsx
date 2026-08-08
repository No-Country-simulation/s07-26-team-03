import ProgressStepper from "@/shared/components/stepper/ProgressStepper";
import RadioCards from "@/shared/components/stepper/RadioCards";
import ProgressBar from "@/shared/components/stepper/Progressbar";
import ResultCard from "@/shared/components/stepper/ResultCard";
import { useCalculator } from "@/shared/hooks/useCalculator";
import InfoCard from "@/shared/components/stepper/InfoCard";
import type { CoolingType, IDataForCalculation } from "@/shared/api";

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
          <ResultCard
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
            <ResultCard
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
            <InfoCard />
          </>
        )}
      </section>

      <footer className="flex items-center justify-between">
        <p className="font-body text-base text-placeholder">
          Step {stepIndex + 1} of {totalSteps}
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
              className="flex h-[40px] w-[165px] items-center justify-center rounded-[8px] bg-brand-primary text-base font-medium text-white transition-opacity hover:opacity-90"
            >
              Shared Report
            </button>
          }
        </div>
      </footer>
    </div>
  );
};

export default CalculatorPage;