import { useState } from "react";
import {
    FACILITY_SIZE_GROUP,
    UTILIZATION_GROUP,
    COOLING_TYPE_GROUP,
    type CustomRadioCardItem,
} from "@/shared/constants/RadioCards.constants";
import { sendAssessmentRequest, getAssessmentSavedResults } from '@/shared/api/public-endpoints';
import type { IAssessmentData } from "@/shared/api";
import type { IAssessmentResponse } from "@/shared/api/types/response.interface";
import type { AxiosError } from "axios";

export const STEPS_CONFIG = [
    FACILITY_SIZE_GROUP,
    UTILIZATION_GROUP,
    COOLING_TYPE_GROUP,
];


export function useCalculator() {
    const [stepIndex, setStepIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [resultCard, setResultCard] = useState<boolean>(false);
    const [results, setResults] = useState<IAssessmentResponse>()
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

    const handleSavedResults = async (id: string) => {
        const response = getAssessmentSavedResults(id);
        response.then(({ data }) => {
            setResults(data);
            setResultCard((prev) => !prev);
        })
        .catch((err: AxiosError) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading((prev) => !prev);
        })
    }

    const handleRequest = async (data: IAssessmentData) => {
        setIsLoading((prev) => !prev);
        const response = sendAssessmentRequest(data);
        response.then(({ data }) => {
            setResults(data);
            setResultCard((prev) => !prev);
        })
        .catch((err: AxiosError) => {
            setErrorMessage(`Error: ${err.message}`);
        })
        .finally(() => {
            setIsLoading((prev) => !prev);
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        })
    }

    const handleNext = () => {
        setStepIndex((prev) => prev + 1);
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
        results,
        resultCard,
        isLoading,
        totalSteps,
        currentGroup,
        currentCard,
        formData,
        fineTuneValues,
        errorMessage,
        handleNext,
        handleBack,
        handleCardChange,
        handleSliderChange,
        handleRequest,
        handleSavedResults,
        getCurrentCardConfig,
        setResultCard,
    };
}