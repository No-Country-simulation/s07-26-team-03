<<<<<<< HEAD
import { Outlet } from "react-router-dom";
import Sidebar from "@/shared/components/nav/Sidebar";
import Toggle from "@/shared/components/buttons/Toggle";
import { useDarkMode } from "@/shared/hooks/useDarkMode";
=======
import { CalculatorProvider } from "../contexts/CalculatorContext";
import CalculatorLayoutContent from "@/app/layouts/CalculatorLayoutContent"
>>>>>>> client-dev

/**
 * Layout principal de la calculadora.
 * Distribuye el Sidebar a la izquierda y aplica la imagen de fondo con Tailwind CSS.
 */
export default function CalculatorLayout() {
    const { isDark, toggleDarkMode} = useDarkMode();

    return (
<<<<<<< HEAD
        <div className="flex min-h-screen flex-col bg-background bg-layout bg-cover bg-center bg-no-repeat dark:bg-black dark:bg-none md:flex-row">
            <Sidebar />

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
=======
        <CalculatorProvider>
            <CalculatorLayoutContent/>
        </CalculatorProvider>
>>>>>>> client-dev
    );
}