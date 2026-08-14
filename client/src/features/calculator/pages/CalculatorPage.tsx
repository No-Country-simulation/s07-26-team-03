import ProgressStepper from "@/shared/components/stepper/ProgressStepper";
import RadioCards from "@/shared/components/stepper/RadioCards";
import ProgressBar from "@/shared/components/stepper/Progressbar";
import AssessmentCard from "@/shared/components/stepper/AssessmentCard";
import ResultCard from "@/shared/components/stepper/ResultCard";
import { CopyIcon } from "@/shared/components/icons/CopyIcon";
import { LockIcon } from "@/shared/components/icons/LockIcon";
// import type { CoolingType, IDataForCalculation } from "@/shared/api";

import { Modal } from "@/shared/components/ui/modal/Modal";
import { useShareResult } from "@/shared/hooks/calculator/useShareResult";
import { useCalculatorContext } from "@/app/contexts/CalculatorContext";

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
    isModalOpen,
    setIsModalOpen,
    shareUrl,
    setShareUrl
  } = useCalculatorContext();

  const { alertMessage, handleCopy } = useShareResult();

  const currentFineTuneValue =
    fineTuneValues[stepIndex] ?? currentCard.range?.default ?? 0;

  const currentStep = resultCard  ? 4 : stepIndex + 1;

  const handleModal = () => {
    setIsModalOpen(true);
  }

  const handleExport = () => {
    setShareUrl("http://shrareurl.com")
  };

  return (
    <>
      <div className="mx-auto my-30 flex min-h-[600px] w-full max-w-[800px] flex-col gap-10 rounded-[32px] bg-white dark:bg-black border dark:border-gray-600 p-8 shadow-[0_2px_15px_rgba(25,33,61,0.1)]">
        {/* Barra de pasos */}
        <ProgressStepper currentStep={currentStep} />

        <section className="flex flex-1 flex-col justify-between gap-6">
          {!resultCard && (
            <RadioCards
              group={currentGroup}
              selectedId={formData[stepIndex]}
              onChange={handleCardChange}
            />
          )}

          {/* Barra de ajuste */}
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

          {/* Barra de ajuste */}
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

          {/* Tarjeta de datos a enviar */}
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

          {/* Tarjeta de resultados */}
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
                className={isModalOpen ? "cursor-default" : "cursor-pointer"}
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
                className="flex h-[40px] w-[120px] items-center justify-center rounded-[8px] border border-brand-primary text-base font-medium text-brand-primary hover:bg-gray-50 transition-colors dark:border-green-600 dark:text-green-600 dark:hover:bg-gray-900 dark:hover:border-white dark:hover:text-white cursor-pointer"
              >
                Back
              </button>
            )}

            {/* Botón de carga deshabilitado */}
            {isLoading &&
              <button
                type="button"
                disabled={true}
                className="flex h-[40px] w-[165px] items-center justify-center rounded-[8px] bg-brand-primary text-base font-medium text-white transition-opacity opacity-50"
              >
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </button>
            }

            {/* Botón de siguiente o de calcular */}
            {!isLoading && !resultCard &&
              <button
                type="button"
                onClick={handleNext}
                className="flex h-[40px] w-[165px] items-center justify-center rounded-[8px] bg-brand-primary text-base font-medium text-white transition-opacity hover:opacity-90 cursor-pointer"
              >
                {stepIndex === totalSteps - 1 ? "Calculate" : "Next"}
              </button>
            }

            {/* Botón para compartir link */}
            {resultCard &&
              <button
                type="button"
                onClick={() => {
                  handleModal();
                  handleExport();
                }}
                className="inline-flex items-center h-[40px] w-[165px] justify-between rounded-[8px] bg-brand-primary px-4 py-2 text-white transition-opacity hover:opacity-90 cursor-pointer"
              >
                <span className="text-[15px]">Shared Report</span>
                <LockIcon />
              </button>
            }
          </div>
        </footer>
      </div>
      <Modal 
        showModal={isModalOpen} 
        onCloseModal={() => setIsModalOpen(false)}
        className="fixed inset-0 flex items-center justify-center"
      >
        <>
          {alertMessage && (
            <span className="absolute left-1/2 top-6 z-50 -translate-x-1/2 animate-bounce rounded-lg bg-[#171819] px-4 py-2 font-poppins text-xs font-medium text-white shadow-lg">
              {alertMessage}
            </span>
          )}

          <div className="bg-white w-[100%] max-w-[460px] px-[32px] py-[48px] rounded-[12px] space-y-6">
            <h1 className="text-[20px] font-bold text-center">
              Share your Basic Result
            </h1>

            <p className="text-[14px] text-center text-justify">
              Copy the link below to share your CapacityIQ Basic Results
              with colleagues, clients, or stakeholders. Anyone with this
              link will be able to view the shared report.
            </p>

            <div className="flex h-8 w-full items-center box-border rounded-[3px] border border-[#d8d8d8] bg-white px-2 pl-3">
              <span className="flex-1 min-w-0 overflow-hidden whitespace-nowrap text-ellipsis text-[14px] text-[#9b9b9b]">
                {shareUrl}
              </span>

              <button
                type="button"
                aria-label="Copy link"
                onClick={handleCopy}
              >
                <CopyIcon className="cursor-pointer"/>
              </button>
            </div>

            <div className="mt-[14px] flex items-center gap-[3px] text-[10px] leading-none text-[#555555]">
              <span className="text-[20px] leading-none">◷</span>
              <span className="text-[14px]">
                This link expires in 30 days.
              </span>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default CalculatorPage;