import { useNavigate } from "react-router-dom";
import { LuLayers3 } from "react-icons/lu";
import { LockIcon } from "@/shared/components/icons/LockIcon";
import { RightArrowIcon } from "@/shared/components/icons/RightArrowIcon";
import { useCalculatorContext } from "@/app/contexts/CalculatorContext";

/**
 * Componente Sidebar.
 */
export default function CalculatorResultsSidebarContent() {
    const navigate = useNavigate();
    const { setIsModalOpen, setShareUrl } = useCalculatorContext();

    const handleModal = () => {
        setIsModalOpen(true);
    }

    const handleExport = () => {
        setShareUrl("http://shrareurl.com")
    };

    return (
        <>
            <div>
                <h2 className="font-heading text-[32px] font-semibold leading-[110%] text-heading">
                    What’s Next?
                </h2>

                <p className="mt-5 font-body text-base leading-[140%] text-text">
                    This is a quick overview of your potential stranded capacity and
                    financial impact. Unlock the full analysis for deeper insights and
                    recommendations.
                </p>

                <button
                    type="button"
                    onClick={() => {
                        handleModal();
                        handleExport();
                    }}
                    className="inline-flex mt-4 items-center h-[40px] w-[165px] justify-between rounded-[8px] bg-brand-primary px-4 py-2 text-white transition-opacity hover:opacity-90 cursor-pointer"
                >
                    <span className="text-[15px]">Shared Report</span>
                    <LockIcon />
                </button>
            </div>

            <ul className="mt-[45px] flex flex-col gap-8 mb-6">
                <li className="flex items-start gap-4">
                    <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#E7F0EB] text-brand-primary shadow-[inset_0px_-1.17px_1.17px_rgba(14,106,55,0.25)]">
                        <LuLayers3 className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-heading text-base font-medium leading-[110%] text-text">
                            Deep dive into Capacity layers
                        </h3>
                        <p className="mt-2 font-body text-base leading-[140%] text-placeholder">
                            See detailed breakdown by facility, IT infraestructure and workloads.
                        </p>
                    </div>
                </li>
                <li className="flex items-start gap-4">
                    <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#E7F0EB] text-brand-primary shadow-[inset_0px_-1.17px_1.17px_rgba(14,106,55,0.25)]">
                        <LuLayers3 className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-heading text-base font-medium leading-[110%] text-text">
                            Compare scenarios
                        </h3>
                        <p className="mt-2 font-body text-base leading-[140%] text-placeholder">
                            See the impact of optimization strategies and future growth.
                        </p>
                    </div>
                </li>

                <li className="flex items-start gap-4">
                    <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#E7F0EB] text-brand-primary shadow-[inset_0px_-1.17px_1.17px_rgba(14,106,55,0.25)]">
                        <LuLayers3 className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-heading text-base font-medium leading-[110%] text-text">
                            Download your report
                        </h3>
                        <p className="mt-2 font-body text-base leading-[140%] text-placeholder">
                            Export a profesional PDF report with all insights and recommendations.
                        </p>
                    </div>
                </li>
                <li className="flex items-start gap-4">
                    <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#E7F0EB] text-brand-primary shadow-[inset_0px_-1.17px_1.17px_rgba(14,106,55,0.25)]">
                        <LuLayers3 className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-heading text-base font-medium leading-[110%] text-text">
                            Share your results
                        </h3>
                        <p className="mt-2 font-body text-base leading-[140%] text-placeholder">
                            Share a summary with your team or on Linkedin.
                        </p>
                    </div>
                </li>
            </ul>

            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="inline-flex items-center h-[40px] w-[250px] justify-between rounded-[8px] bg-brand-primary px-4 py-2 text-white transition-opacity hover:opacity-90 cursor-pointer"
                >
                    <LockIcon size={24} />
                    <span className="text-[15px]">Unlock Full Analysis</span>
                    <RightArrowIcon size={24} />
                </button>
            </div>
        </>
    );
}