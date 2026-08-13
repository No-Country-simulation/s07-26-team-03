import { useState, useRef } from "react";
import type { KeyboardEvent, ClipboardEvent } from "react";
import type { UseVerificationActionsReturn } from "../../interfaces/verification.interface";

export function useVerificationActions(): UseVerificationActionsReturn {
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (value: string, index: number): void => {
        const cleanValue = value.replace(/\D/g, "").slice(-1);
        const newCode = [...code];
        newCode[index] = cleanValue;
        setCode(newCode);

        if (cleanValue && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number): void => {
        if (e.key === "Backspace") {
            if (!code[index] && index > 0) {
                const newCode = [...code];
                newCode[index - 1] = "";
                setCode(newCode);
                inputRefs.current[index - 1]?.focus();
            } else if (code[index]) {
                const newCode = [...code];
                newCode[index] = "";
                setCode(newCode);
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        const newCode = Array(6).fill("");

        for (let i = 0; i < pastedData.length; i++) {
            newCode[i] = pastedData[i];
        }

        setCode(newCode);
        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    const handleVerify = (): void => {
        alert(`Verificando código: ${code.join("")}`);
    };

    return {
        code,
        inputRefs,
        handleChange,
        handleKeyDown,
        handlePaste,
        handleVerify,
    };
}