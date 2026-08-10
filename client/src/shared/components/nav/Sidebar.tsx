import { LuClock, LuLockKeyholeOpen, LuChartColumn, LuHeadphones } from "react-icons/lu";
import icon from "@/assets/icons/icon.svg";

/**
 * Componente Sidebar.
 */
export default function Sidebar() {
    const handleHelp = () => {
        alert("Sección en proceso...");
    };

    return (
        <aside className="flex w-full flex-col justify-between bg-surface dark:bg-black shadow-[0px_0.5px_8px_rgba(25,33,61,0.06)] md:min-h-screen md:w-[380px] md:min-w-[380px]">
            <div>
                <header className="flex h-[88px] w-full items-center justify-center">
                    <div className="flex items-center gap-3">
                        <img
                            src={icon}
                            alt="Capacity IQ"
                            className="h-12 w-12 object-contain"
                        />
                        <div className="flex items-baseline text-[24px]">
                            <span className="font-logo font-bold text-brand-primary dark:text-brand-primary-400">
                                Capacity
                            </span>
                            <span className="ml-1 font-logo font-bold text-[#C5922C]">
                                IQ
                            </span>
                            <span className="ml-2 font-body text-sm font-normal text-text dark:text-gray-300">
                                by Datacenter
                            </span>
                        </div>
                    </div>
                </header>

                <main className="mx-auto flex h-[438px] w-[302px] flex-col justify-between pt-6">
                    <div>
                        <h2 className="font-heading text-[32px] font-semibold leading-[110%] text-heading dark:text-[#f4faf6d1]">
                            Here are your basic results
                        </h2>

                        <p className="mt-5 font-body text-base leading-[140%] text-text dark:text-gray-300">
                            This is a quick overview of your potential stranded capacity and
                            financial impact. Unlock the full analysis for deeper insights and
                            recommendations.
                        </p>
                    </div>

                    <ul className="mt-[45px] flex flex-col gap-8">
                        <li className="flex items-start gap-4">
                            <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#E7F0EB] text-brand-primary shadow-[inset_0px_-1.17px_1.17px_rgba(14,106,55,0.25)]">
                                <LuClock className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-heading text-base font-medium leading-[110%] text-text dark:text-gray-300">
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
                                <h3 className="font-heading text-base font-medium leading-[110%] text-text dark:text-gray-300">
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
                                <h3 className="font-heading text-base font-medium leading-[110%] text-text dark:text-gray-300">
                                    Actionable Insights
                                </h3>
                                <p className="mt-2 font-body text-base leading-[140%] text-placeholder">
                                    Understand your efficiency potential
                                </p>
                            </div>
                        </li>
                    </ul>
                </main>
            </div>

            <footer className="px-[38px] pb-10 pt-6">
                <button
                    type="button"
                    onClick={handleHelp}
                    className="flex w-full items-center justify-between text-left transition-opacity hover:opacity-80"
                >
                    <div>
                        <h4 className="font-heading text-base font-bold leading-[115%] text-brand-primary dark:text-brand-primary-400">
                            Need a help?
                        </h4>
                        <p className="mt-2 font-body text-sm text-[#6F6C8F] dark:text-gray-300">
                            Chat with live support
                        </p>
                    </div>

                    <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#E5E7EB] text-[#4B5563] dark:bg-[#e5e7eb1a] dark:text-[#b4cbec] ">
                        <LuHeadphones className="h-5 w-5" />
                    </div>
                </button>
            </footer>
        </aside>
    );
}