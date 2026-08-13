import { createContext, useContext, useState } from "react";
import { useCalculator } from "@/shared/hooks/calculator/useCalculator";

type CalculatorContextType = ReturnType<typeof useCalculator> & {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  shareUrl: string;
  setShareUrl: React.Dispatch<React.SetStateAction<string>>;
};
const CalculatorContext = createContext<CalculatorContextType | undefined>(
  undefined
);

export const CalculatorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string>("");
  const calculator = useCalculator();

  return (
    <CalculatorContext.Provider value={{ ...calculator, isModalOpen, setIsModalOpen, shareUrl, setShareUrl }}>
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
