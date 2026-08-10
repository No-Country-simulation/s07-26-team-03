import { useState } from "react";

export function useShareResult(defaultLink: string = "https://example.com/article/social-share-modal") {
    const [copied, setCopied] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    const handleCopy = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(defaultLink);
            setCopied(true);
            setAlertMessage("Link copied to clipboard successfully!");
            setTimeout(() => {
                setCopied(false);
                setAlertMessage(null);
            }, 3000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
            setAlertMessage("Failed to copy link.");
            setTimeout(() => setAlertMessage(null), 3000);
        }
    };

    return {
        link: defaultLink,
        copied,
        alertMessage,
        handleCopy,
    };
}