import { Outlet } from "react-router-dom";
import CalculatorSidebar from "@/features/calculator/components/CalculatorSidebar";

export default function CalculatorLayoutContent() {
    return (
        <div className="flex min-h-screen flex-col bg-background bg-layout bg-cover bg-center bg-no-repeat md:flex-row">
            <CalculatorSidebar />

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