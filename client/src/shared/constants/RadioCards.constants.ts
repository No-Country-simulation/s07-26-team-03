import type { RadioCardItem, RadioGroupConfig } from "../types/RadioCards.types";

export const UTILIZATION_GROUP: RadioGroupConfig = {
    title: "Average Utilization",
    description: "What is your approximate average utilization today?",
    subDescription: "This refers to the average utilization of your IT infrastructure",
    cards: [
        { id: "low", title: "Low", description: "< 30%" },
        { id: "moderate", title: "Moderate", description: "30 - 50%" },
        { id: "healthy", title: "Healthy", description: "50 - 70%" },
        { id: "high", title: "High", description: "> 70%" },
    ],
};

export const FACILITY_SIZE_GROUP: RadioGroupConfig = {
    title: "Facility Size",
    description: "What is your total IT power Capacity?",
    subDescription: "Select the option that best represents your facility",
    cards: [
        { id: "small", title: "Small", description: "<1MW" },
        { id: "medium", title: "Medium", description: "1 - 5MW" },
        { id: "large", title: "Large", description: "5 - 10MW" },
        { id: "enterprise", title: "Enterprise", description: ">10MW" },
        { id: "custom", title: "Custom", description: "Enter exact value" },
    ],
};

export const COOLING_TYPE_GROUP: RadioGroupConfig = {
    title: "Cooling Type",
    description: "What is your primary cooling type?",
    cards: [
        { id: "air", title: "Air Cooling", description: "Traditional CRAC / CRAH based cooling" },
        { id: "hybrid", title: "Hybrid Cooling", description: "Combination of air and liquid cooling" },
        { id: "liquid", title: "Liquid Cooling", description: "Direct-to-chip or immersion cooling" },
    ],
};

export const RADIO_CARDS: RadioCardItem[] = UTILIZATION_GROUP.cards;