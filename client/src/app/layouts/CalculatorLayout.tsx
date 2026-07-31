import { Outlet } from "react-router-dom";
import Sidebar from "@/shared/components/nav/Sidebar";

/**
 * Layout principal de la calculadora.
 * Distribuye el Sidebar a la izquierda y aplica la imagen de fondo con Tailwind CSS.
 */
export default function CalculatorLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-background bg-layout bg-cover bg-center bg-no-repeat md:flex-row">
            <Sidebar />

            <div className="flex flex-1 flex-col">
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