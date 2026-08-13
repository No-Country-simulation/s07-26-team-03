import { useState } from "react";
import {
    FACILITY_SIZE_GROUP,
    UTILIZATION_GROUP,
    COOLING_TYPE_GROUP,
    type CustomRadioCardItem,
} from "@/shared/constants/RadioCards.constants";

export const STEPS_CONFIG = [
    FACILITY_SIZE_GROUP,
    UTILIZATION_GROUP,
    COOLING_TYPE_GROUP,
];

export function useCalculator() {
    const [stepIndex, setStepIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [resultCard, setResultCard] = useState<boolean>(false);

    const [formData, setFormData] = useState<{ [key: number]: string }>({
        0: "medium",
        1: "healthy",
        2: "air",
    });

    // Inicializamos ambos pasos con sus valores por defecto correspondientes a las tarjetas iniciales:
    // Paso 0 ("medium"): default = 3
    // Paso 1 ("healthy"): default = 60
    const [fineTuneValues, setFineTuneValues] = useState<{ [key: number]: number }>({
        0: 3,
        1: 60,
    });

    const totalSteps = STEPS_CONFIG.length;
    const currentGroup = STEPS_CONFIG[stepIndex];

    const getCurrentCardConfig = (stepIdx: number): CustomRadioCardItem => {
        const group = STEPS_CONFIG[stepIdx];
        const selectedId = formData[stepIdx];
        const cards = group.cards as CustomRadioCardItem[];
        return cards.find((c) => c.id === selectedId) || cards[0];
    };

    const currentCard = getCurrentCardConfig(stepIndex);

    const handleNext = () => {
        if (stepIndex === totalSteps - 1) {
            setIsLoading((prev) => !prev);
            setTimeout(() => {
                setIsLoading((prev) => !prev);
                setResultCard((prev) => !prev)
            }, 1000)
        } 
        else setStepIndex((prev) => prev + 1);
    };

    const handleBack = () => {
        if (stepIndex > 0 && !resultCard) {
            setStepIndex((prev) => prev - 1);
        } else {
            setResultCard((prev) => !prev);
        }
    };

    const handleCardChange = (selectedId: string) => {
        setFormData((prev) => ({
            ...prev,
            [stepIndex]: selectedId,
        }));

        const group = STEPS_CONFIG[stepIndex];
        const cards = group.cards as CustomRadioCardItem[];
        const selectedCard = cards.find((c) => c.id === selectedId);

        if (selectedCard?.range) {
            setFineTuneValues((prev) => ({
                ...prev,
                [stepIndex]: selectedCard.range!.default,
            }));
        }
    };

    const handleSliderChange = (newValue: number) => {
        setFineTuneValues((prev) => ({
            ...prev,
            [stepIndex]: Number(newValue.toFixed(1)),
        }));
    };

    return {
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
    };
}