import { useState, type MouseEvent } from "react";
import { assessmentRegister } from '@/shared/api/public-endpoints';
import type { IAssessmentRegisterData } from "@/shared/api";
import type { AxiosError } from "axios";
import type { IAssessmentRegisterResponse } from "@/shared/api/types/response.interface";
import { useNavigate } from "react-router-dom";
import { HTTP_ERROR_MESSAGES } from "@/shared/api/types/api.types";

export interface UseRegisterActionsReturn {
    handleGoogleAuth: () => void;
    handleFacebookAuth: () => void;
    handleContinue: (data: IAssessmentRegisterData, assessmentId: string) => void;
    handleLoginNavigation: (e: MouseEvent<HTMLAnchorElement>) => void;
    isLoading: boolean;
    errorMessage: string | null;
    data?: IAssessmentRegisterResponse;
}

export function useRegisterActions(): UseRegisterActionsReturn {
    const [data, setData] = useState<IAssessmentRegisterResponse>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleGoogleAuth = (): void => {
        alert("Cargando autenticación con Google...");
    };

    const handleFacebookAuth = (): void => {
        alert("Cargando autenticación con Facebook...");
    };

    const handleContinue = (data: IAssessmentRegisterData, assessmentId: string) => {
        setIsLoading((prev) => !prev)
        assessmentRegister(data)
            .then(({ data: response }) => {
                setData(response);
                navigate("/verify", { state: { email: data.email, assessmentId }})
            })
            .catch((err: AxiosError) => {
                setErrorMessage(HTTP_ERROR_MESSAGES[err.response?.status ?? 500]);
            })
            .finally(() => {
                setIsLoading((prev) => !prev);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000);
            });

    };

    const handleLoginNavigation = (e: MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();
        alert("Cargando login...");
    };

    return {
        handleGoogleAuth,
        handleFacebookAuth,
        handleContinue,
        handleLoginNavigation,
        data,
        isLoading,
        errorMessage
    };
}