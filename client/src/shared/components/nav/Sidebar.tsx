import { Outlet } from "react-router-dom";
import { LuHeadphones } from "react-icons/lu";
import icon from "@/assets/icons/icon.svg";


interface SidebarProps {
    children?: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
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
                    {children}
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