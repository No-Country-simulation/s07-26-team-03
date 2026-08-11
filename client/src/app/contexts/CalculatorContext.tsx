import { createContext, useContext } from "react";
import { useCalculator } from "@/shared/hooks/calculator/useCalculator";

type CalculatorContextType = ReturnType<typeof useCalculator>;

const CalculatorContext = createContext<CalculatorContextType | undefined>(
  undefined
);

export const CalculatorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const calculator = useCalculator();

  return (
    <CalculatorContext.Provider value={calculator}>
      {children}
    </CalculatorContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCalculatorContext = () => {
  const context = useContext(CalculatorContext);

  if (context === undefined) {
    throw new Error(
      "useCalculatorContext must be used within CalculatorProvider"
    );
  }

  return context;
};
