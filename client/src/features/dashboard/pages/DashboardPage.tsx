import { useState } from "react";
import ProgressStepper from "@/shared/components/stepper/ProgressStepper";
import RadioCards from "@/shared/components/stepper/radioCards";
import Progressbar from "@/shared/components/stepper/Progressbar";
import ResultCard from "@/shared/components/stepper/ResultCard";

import {
  FACILITY_SIZE_GROUP,
  UTILIZATION_GROUP,
  COOLING_TYPE_GROUP,
} from "@/shared/constants/RadioCards.constants";

const STEPS_CONFIG = [
  FACILITY_SIZE_GROUP,
  UTILIZATION_GROUP,
  COOLING_TYPE_GROUP,
];

const DashboardPage = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<{ [key: number]: string }>({
    0: "medium", // Facility Size por defecto
    1: "healthy", // Utilization por defecto
    2: "air",     // Cooling Type por defecto
  });

  const totalSteps = STEPS_CONFIG.length;
  const currentGroup = STEPS_CONFIG[stepIndex];

  const handleNext = () => {
    // Si estamos en el último paso (paso 3 / índice 2), ejecutamos el cálculo
    if (stepIndex === totalSteps - 1) {
      alert("Calculando...");
      return;
    }

    setStepIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
    }
  };

  const handleCardChange = (selectedId: string) => {
    setFormData((prev) => ({
      ...prev,
      [stepIndex]: selectedId,
    }));
  };

  const getSelectedCardData = (groupIndex: number) => {
    const group = STEPS_CONFIG[groupIndex];
    const selectedId = formData[groupIndex];
    const card = group.cards.find((c) => c.id === selectedId) || group.cards[0];
    return {
      value: card.description,
      label: card.title,
    };
  };

  return (
    <div
      className="
        flex
        min-h-[600px]
        flex-col
        gap-10
        rounded-[32px]
        bg-white
        p-8
        shadow-[0_2px_15px_rgba(25,33,61,0.1)]
      "
    >
      <ProgressStepper currentStep={stepIndex + 1} />

      <section className="flex flex-1 flex-col justify-between gap-6">
        {/* Radio Cards del grupo actual */}
        <RadioCards
          group={currentGroup}
          selectedId={formData[stepIndex]}
          onChange={handleCardChange}
        />

        {/* Paso 1: Muestra Barra en MW */}
        {stepIndex === 0 && (
          <Progressbar
            title="Fine tune your capacity(MW)"
            startValue={5}
            activeValue={7.5}
            endValue={10}
            unit="MW"
          />
        )}

        {/* Paso 2: Muestra Barra en % */}
        {stepIndex === 1 && (
          <Progressbar
            title="Fine tune your utilization(%)"
            startValue={50}
            activeValue={60}
            endValue={70}
            unit="%"
          />
        )}

        {/* Paso 3: Muestra ResultCard debajo de las cards de Cooling Type */}
        {stepIndex === 2 && (
          <ResultCard
            data={{
              facilitySize: getSelectedCardData(0),
              utilization: getSelectedCardData(1),
              coolingType: {
                value: getSelectedCardData(2).label.toUpperCase(),
              },
            }}
          />
        )}
      </section>

      <footer className="flex items-center justify-between">
        <p className="font-body text-base text-[#9CA3AF]">
          Step {stepIndex + 1} of {totalSteps}
        </p>

        <div className="flex gap-4">
          {stepIndex > 0 && (
            <button
              onClick={handleBack}
              className="
                flex h-[40px] w-[120px] items-center justify-center
                rounded-[8px] border border-[#0E6A37] text-base
                font-medium text-[#0E6A37] transition-colors hover:bg-gray-50
              "
            >
              Back
            </button>
          )}

          <button
            onClick={handleNext}
            className="
              flex h-[40px] w-[165px] items-center justify-center
              rounded-[8px] bg-[#0E6A37] text-base font-medium
              text-white transition-opacity hover:opacity-90
            "
          >
            {stepIndex === totalSteps - 1 ? "Calculate" : "Next"}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;