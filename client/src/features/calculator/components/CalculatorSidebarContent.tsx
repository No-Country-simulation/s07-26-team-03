import { LuClock, LuLockKeyholeOpen, LuChartColumn } from "react-icons/lu";

/**
 * Componente Sidebar.
 */
export default function CalculatorSidebarContent() {
    return (
        <>
            <div>
                <h2 className="font-heading text-[32px] font-semibold leading-[110%] text-heading">
                    Here are your basic results
                </h2>

                <p className="mt-5 font-body text-base leading-[140%] text-text">
                    This is a quick overview of your potential stranded capacity and
                    financial impact. Unlock the full analysis for deeper insights and
                    recommendations.
                </p>
            </div>

            <ul className="mt-[45px] flex flex-col gap-8 mb-6">
                <li className="flex items-start gap-4">
                    <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#E7F0EB] text-brand-primary shadow-[inset_0px_-1.17px_1.17px_rgba(14,106,55,0.25)]">
                        <LuClock className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-heading text-base font-medium leading-[110%] text-text">
                            Takes less than 3 minutes
                        </h3>
                        <p className="mt-2 font-body text-base leading-[140%] text-placeholder">
                            Quick and easy assessment
                        </p>
                    </div>
                </li>
                <li className="flex items-start gap-4">
                    <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#E7F0EB] text-brand-primary shadow-[inset_0px_-1.17px_1.17px_rgba(14,106,55,0.25)]">
                        <LuLockKeyholeOpen className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-heading text-base font-medium leading-[110%] text-text">
                            No sign-up required
                        </h3>
                        <p className="mt-2 font-body text-base leading-[140%] text-placeholder">
                            Get instant basic results
                        </p>
                    </div>
                </li>

                <li className="flex items-start gap-4">
                    <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#E7F0EB] text-brand-primary shadow-[inset_0px_-1.17px_1.17px_rgba(14,106,55,0.25)]">
                        <LuChartColumn className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-heading text-base font-medium leading-[110%] text-text">
                            Actionable Insights
                        </h3>
                        <p className="mt-2 font-body text-base leading-[140%] text-placeholder">
                            Understand your efficiency potential
                        </p>
                    </div>
                </li>
            </ul>        
        </>
    );
}