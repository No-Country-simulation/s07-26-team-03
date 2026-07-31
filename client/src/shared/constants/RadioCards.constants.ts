import type { RadioCardItem, RadioGroupConfig } from "../types/RadioCards.types";

export interface CustomRadioCardItem extends RadioCardItem {
  range?: {
    min: number;
    max: number;
    default: number;
  };
}

export interface CustomRadioGroupConfig extends Omit<RadioGroupConfig, "cards"> {
  cards: CustomRadioCardItem[];
}

export const FACILITY_SIZE_GROUP: CustomRadioGroupConfig = {
  title: "Facility Size",
  description: "What is your total IT power Capacity?",
  subDescription: "Select the option that best represents your facility",
  cards: [
    { id: "small", title: "Small", description: "< 1MW", range: { min: 0.1, max: 1, default: 0.5 } },
    { id: "medium", title: "Medium", description: "1 - 5MW", range: { min: 1, max: 5, default: 3 } },
    { id: "large", title: "Large", description: "5 - 10MW", range: { min: 5, max: 10, default: 7.5 } },
    { id: "enterprise", title: "Enterprise", description: "> 10MW", range: { min: 10, max: 50, default: 25 } },
    { id: "custom", title: "Custom", description: "Enter exact value", range: { min: 0, max: 100, default: 10 } },
  ],
};

export const UTILIZATION_GROUP: CustomRadioGroupConfig = {
  title: "Average Utilization",
  description: "What is your approximate average utilization today?",
  subDescription: "This refers to the average utilization of your IT infrastructure",
  cards: [
    { id: "low", title: "Low", description: "< 30%", range: { min: 0, max: 30, default: 15 } },
    { id: "moderate", title: "Moderate", description: "30 - 50%", range: { min: 30, max: 50, default: 40 } },
    { id: "healthy", title: "Healthy", description: "50 - 70%", range: { min: 50, max: 70, default: 60 } },
    { id: "high", title: "High", description: "> 70%", range: { min: 70, max: 100, default: 85 } },
  ],
};

export const COOLING_TYPE_GROUP: CustomRadioGroupConfig = {
  title: "Cooling Type",
  description: "What is your primary cooling type?",
  cards: [
    { id: "air", title: "Air Cooling", description: "Traditional CRAC / CRAH based cooling" },
    { id: "hybrid", title: "Hybrid Cooling", description: "Combination of air and liquid cooling" },
    { id: "liquid", title: "Liquid Cooling", description: "Direct-to-chip or immersion cooling" },
  ],
};