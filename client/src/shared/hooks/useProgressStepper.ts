import { useState } from "react";

export function useProgressStepper(initialStep = 1) {
    const [currentStep, setCurrentStep] = useState(initialStep);

    return {
        currentStep,
        setCurrentStep,
    };
}
