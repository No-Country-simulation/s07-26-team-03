import { Outlet } from "react-router-dom";
import CalculatorSidebar from "@/features/calculator/components/CalculatorSidebar";
import Toggle from "@/shared/components/buttons/Toggle";
import { useDarkMode } from "@/shared/hooks/useDarkMode";

export default function CalculatorLayoutContent() {
    const { isDark, toggleDarkMode} = useDarkMode();

    return (
        <div className="flex min-h-screen flex-col bg-background dark:bg-black light:bg-layout light:bg-cover bg-center bg-no-repeat md:flex-row">
            <CalculatorSidebar />

            <div className="flex flex-1 flex-col">
                <div className="flex justify-end items-center gap-2 px-6 py-3 text-[20px]">
                    <span>☀️</span>
                    <Toggle isActive={isDark} onClick={toggleDarkMode} />
                    <span>🌙</span>
                </div>

                <main className="flex-1">
                    <Outlet />
                </main>

                <footer>
                    Calculator Footer
                </footer>
            </div>
        </div>
    );
}