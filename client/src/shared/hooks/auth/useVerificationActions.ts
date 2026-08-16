import { useState, useRef, useContext } from "react";
import type { KeyboardEvent, ClipboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { UseVerificationActionsReturn } from "../../interfaces/verification.interface";
import { verify } from "@/shared/api";
import type { AxiosError } from "axios";
import AuthContext from "@/shared/context/AuthContext";

export function useVerificationActions(): UseVerificationActionsReturn {
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const { setAccessToken } = useContext(AuthContext);

    const navigate = useNavigate();

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

    const handleVerify = (email: string): void => {
        const response = verify({ email, code: code.join("") });
        setIsLoading((prev) => !prev);
        response
            .then(({ data }) => {
                setAccessToken(data.accessToken);
                navigate("/dashboard");
            }).catch((err: AxiosError) => {
                console.log(err.message)
            }).finally(() => {
                setIsLoading((prev) => !prev)
            })
    };

    return {
        code,
        inputRefs,
        isLoading,
        handleChange,
        handleKeyDown,
        handlePaste,
        handleVerify,
    };
}