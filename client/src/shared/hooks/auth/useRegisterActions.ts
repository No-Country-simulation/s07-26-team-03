import type { MouseEvent } from "react";

export interface UseRegisterActionsReturn {
    handleGoogleAuth: () => void;
    handleFacebookAuth: () => void;
    handleContinue: () => void;
    handleLoginNavigation: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export function useRegisterActions(): UseRegisterActionsReturn {
    const handleGoogleAuth = (): void => {
        alert("Cargando autenticación con Google...");
    };

    const handleFacebookAuth = (): void => {
        alert("Cargando autenticación con Facebook...");
    };

    const handleContinue = (): void => {
        alert("Cargando dashboard...");
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
    };
}