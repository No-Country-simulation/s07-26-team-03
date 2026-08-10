import { HiOutlineDocumentDuplicate, HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { useShareResult } from "../../../shared/hooks/calculator/useShareResult";

export default function ShareResultCard() {
    const { link, copied, alertMessage, handleCopy } = useShareResult();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
            {alertMessage && (
                <div className="absolute top-6 z-50 animate-bounce rounded-lg bg-[#171819] px-4 py-2 font-poppins text-xs font-medium text-white shadow-lg">
                    {alertMessage}
                </div>
            )}

            <div className="register-card-border flex h-[358px] w-[540px] flex-col items-center justify-center rounded-[20px] bg-surface p-8 text-center shadow-card-figma border border-[#E5E7EB]">
                <h2 className="mb-4 font-poppins text-[22px] font-bold leading-tight text-[#171819]">
                    Share your Basic Result
                </h2>

                <p className="mb-6 font-poppins text-justify text-xs leading-relaxed text-black/60">
                    Copy the link below to share your CapacityIQ Basic Results with colleagues, clients, or stakeholders. Anyone with this link will be able to view the shared report.
                </p>
                
                <div className="mb-4 flex h-[48px] w-full items-center overflow-hidden rounded-lg border border-[#E5E7EB] bg-transparent transition-colors focus-within:border-[#4B5563]">
                    <input
                        type="text"
                        readOnly
                        value={link}
                        className="h-full flex-1 bg-transparent px-3 font-roboto text-[14px] font-normal text-text outline-none placeholder:font-roboto placeholder:text-[14px] placeholder:font-normal"
                    />
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="flex h-full w-[48px] shrink-0 items-center justify-center bg-white text-[#171819] transition-colors hover:bg-gray-50 active:bg-gray-100"
                        title={copied ? "Copied!" : "Copy link"}
                    >
                        <HiOutlineDocumentDuplicate className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex w-full items-center justify-start gap-1.5 font-poppins text-xs font-medium text-[#70707B]">
                    <HiOutlineQuestionMarkCircle className="h-4 w-4 shrink-0 text-[#70707B]" />
                    <span>This link expires in 30 days.</span>
                </div>
            </div>
        </div>
    );
}