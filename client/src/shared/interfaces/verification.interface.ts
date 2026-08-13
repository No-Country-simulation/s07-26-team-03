import type { KeyboardEvent, ClipboardEvent, RefObject } from "react";

export interface UseVerificationActionsReturn {
    code: string[];
    inputRefs: RefObject<(HTMLInputElement | null)[]>;
    handleChange: (value: string, index: number) => void;
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>, index: number) => void;
    handlePaste: (e: ClipboardEvent<HTMLInputElement>) => void;
    handleVerify: () => void;
}