import { useLocation } from "react-router-dom";
import { useVerificationActions } from "../../../shared/hooks/auth/useVerificationActions";
import { LuTriangleAlert } from "react-icons/lu";

export default function VerifyPage() {
    const { code, inputRefs, errorMessage, handleChange, handleKeyDown, handlePaste, handleVerify } = useVerificationActions();

    const location = useLocation();

    const email = location.state["email"] as string;
    const assessmentId = location.state["assessmentId"] as string;

    const verify = () => {
        handleVerify(email, assessmentId);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
            {errorMessage && (
                <div className="fixed inline-flex justify-center space-x-1 items-center left-1/2 top-6 z-50 -translate-x-1/2 animate-bounce rounded-lg bg-red-200 px-4 py-2 font-poppins text-xs font-medium text-[16px] text-red-900 shadow-lg">
                    <LuTriangleAlert />
                    <p>{errorMessage}</p>
                </div>
            )}
            <div className="register-card-border flex h-[358px] w-[540px] flex-col items-center justify-center rounded-[20px] bg-surface p-8 text-center shadow-card-figma border border-[#E5E7EB]">
                <h2 className="mb-4 font-poppins text-[22px] font-bold leading-tight text-[#171819]">
                    Verify your code
                </h2>

                <p className="mb-6 font-roboto text-[14px] font-normal leading-relaxed text-black/60 text-justify">
                    Please enter the 6-digit verification code sent to your email address to continue.
                </p>

                <div className="mb-6 flex justify-center gap-3">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                if (inputRefs.current) {
                                    inputRefs.current[index] = el;
                                }
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            className={`flex h-[52.11px] w-[63px] items-center justify-center rounded-lg border bg-transparent text-center font-poppins text-[20px] font-semibold outline-none transition-colors ${
                                digit 
                                    ? "border-brand-primary text-brand-primary" 
                                    : "border-black text-text focus:border-[#4B5563]"
                            }`}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={verify}
                    className="flex h-[48px] w-[438px] items-center justify-center rounded-[8px] bg-brand-primary font-poppins font-semibold text-white transition-colors hover:bg-brand-primary-hover active:bg-brand-primary-active"
                >
                    Verify
                </button>
            </div>
        </div>
    );
}