import { Outlet } from "react-router-dom";
import Sidebar from "@/shared/components/nav/Sidebar";
import { useCalculatorContext } from "../contexts/CalculatorContext";

export default function CalculatorLayoutContent() {
    const { resultCard } = useCalculatorContext();

    return (
        <div className="flex min-h-screen flex-col bg-background bg-layout bg-cover bg-center bg-no-repeat md:flex-row">
            <Sidebar resultCard={resultCard} />

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