import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useRegisterActions } from "../../../shared/hooks/auth/useRegisterActions";

export default function RegisterPage() {
    const navigate = useNavigate();
    const {
        handleGoogleAuth,
        handleFacebookAuth,
        handleContinue,
    } = useRegisterActions();

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="register-card-border flex h-[546px] w-[540px] flex-col items-center justify-center rounded-[20px] bg-surface p-8 text-center shadow-card-figma">
                <h2 className="mb-6 text-[22px] font-bold leading-tight text-[#171819]">
                    Register your Email
                </h2>

                <div className="mb-4 flex w-full gap-3">
                    <button
                        type="button"
                        onClick={handleGoogleAuth}
                        className="flex h-[48px] flex-1 items-center justify-center gap-2 rounded-[8px] bg-brand-primary font-poppins text-[16px] font-semibold text-[#A0A0AB] transition-opacity hover:opacity-95 cursor-pointer"
                    >
                        <FcGoogle className="h-5 w-5" />
                        Google
                    </button>

                    <button
                        type="button"
                        onClick={handleFacebookAuth}
                        className="flex h-[48px] flex-1 items-center justify-center gap-2 rounded-[8px] bg-brand-primary font-poppins text-[16px] font-semibold text-[#A0A0AB] transition-opacity hover:opacity-95 cursor-pointer"
                    >
                        <FaFacebook className="h-5 w-5 text-[#1877F2]" />
                        Facebook
                    </button>
                </div>

                <p className="mb-4 font-poppins text-[16px] font-semibold text-[#70707B]">
                    Or
                </p>

                <div className="mb-4 w-full text-left">
                    <label htmlFor="email" className="mb-1 block font-poppins text-[16px] font-normal text-text">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="balamia@gmail.com"
                        className="w-full rounded-lg border-[3px] border-[#E5E7EB] bg-transparent px-3 py-2 font-poppins text-[16px] font-normal text-text outline-none transition-colors placeholder:font-poppins placeholder:text-[16px] placeholder:font-normal placeholder:text-text focus:border-[#4B5563]"
                    />
                </div>

                <p className="mb-6 text-justify text-xs leading-relaxed text-black/60">
                    By continuing, you agree that we create an account for you (unless already created), and accept our Terms and Conditions and Privacy Policy.
                </p>

                <button
                    type="button"
                    onClick={handleContinue}
                    className="mb-6 flex h-[48px] w-full items-center justify-center rounded-[8px] bg-brand-primary font-poppins font-normal text-white transition-colors hover:bg-brand-primary-hover active:bg-brand-primary-active cursor-pointer"
                >
                    Continue
                </button>

                <p className="font-poppins text-[16px] font-normal text-[#70707B]">
                    Already Register your Email ?{" "}
                    <a
                        onClick={() => navigate("/login")}
                        className="font-poppins text-[16px] font-normal text-[#A0A0AB] underline underline-offset-2 hover:text-brand-primary"
                    >
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}