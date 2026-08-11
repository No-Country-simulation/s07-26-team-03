import Sidebar from "@/shared/components/nav/Sidebar";
import CalculatorSidebarContent from "@/features/calculator/components/CalculatorSidebarContent";
import CalculatorResultsSidebarContent from "@/features/calculator/components/CalculatorResultsSidebarContent";
import { useCalculatorContext } from "@/app/contexts/CalculatorContext";

export default function CalculatorSideBar() {
    const { resultCard } = useCalculatorContext();

    return (
        <Sidebar>
            {!resultCard ? <CalculatorSidebarContent /> : <CalculatorResultsSidebarContent />}
        </Sidebar>
    );
}