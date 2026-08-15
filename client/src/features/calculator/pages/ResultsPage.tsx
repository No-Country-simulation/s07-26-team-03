import { useParams } from "react-router-dom";
import ProgressBar from "@/shared/components/stepper/Progressbar";
import AssessmentCard from "@/shared/components/stepper/AssessmentCard";
import ResultCard from "@/shared/components/stepper/ResultCard";
import { CopyIcon } from "@/shared/components/icons/CopyIcon";
import { LockIcon } from "@/shared/components/icons/LockIcon";

import { Modal } from "@/shared/components/ui/modal/Modal";
import { useShareResult } from "@/shared/hooks/calculator/useShareResult";
import { useCalculatorContext } from "@/app/contexts/CalculatorContext";
import { useEffect } from "react";

const CalculatorPage = () => {
  const {
    stepIndex,
    results,
    resultCard,
    formData,
    fineTuneValues,
    getCurrentCardConfig,
    isModalOpen,
    setIsModalOpen,
    shareUrl,
    handleSavedResults,
    setResultCard,
  } = useCalculatorContext();

  const { id } = useParams<{ id: string }>();


  const { alertMessage, handleCopy } = useShareResult();

  const handleModal = () => {
    setIsModalOpen(true);
  }

  useEffect(() => {
    if (!id) return;
    setResultCard((prev) => {
        if (prev) return prev;
        return true;
    });
    handleSavedResults(id);
  }, [id])

  return (
    <>
      <div className="mx-auto my-30 flex min-h-[600px] w-full max-w-[800px] flex-col gap-10 rounded-[32px] bg-white p-8 shadow-[0_2px_15px_rgba(25,33,61,0.1)]">

        <section className="flex flex-1 flex-col justify-between gap-6">

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
              <ResultCard data={results} />
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
          <div className="flex gap-4">
            {/* Botón para compartir link */}
            {resultCard &&
              <button
                type="button"
                onClick={() => {
                  handleModal();
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