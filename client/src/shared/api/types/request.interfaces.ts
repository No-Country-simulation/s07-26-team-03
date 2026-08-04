export const CoolingType = {
  AIR: "air",
  LIQUID: "liquid",
  IMMERSION: "immersion",
} as const;

export type CoolingType = typeof CoolingType[keyof typeof CoolingType];

export interface ICalculation {
    facilityMv: number;
    utilizationPct: number;
    coolingType: CoolingType;
}
