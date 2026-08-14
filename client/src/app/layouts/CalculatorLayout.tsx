import { CalculatorProvider } from "../contexts/CalculatorContext";
import CalculatorLayoutContent from "@/app/layouts/CalculatorLayoutContent"

/**
 * Layout principal de la calculadora.
 * Distribuye el Sidebar a la izquierda y aplica la imagen de fondo con Tailwind CSS.
 */
export default function CalculatorLayout() {
    return (
        <CalculatorProvider>
            <CalculatorLayoutContent/>
        </CalculatorProvider>
    );
}