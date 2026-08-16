export const CoolingType = {
  AIR: "AIR",
  LIQUID: "LIQUID",
  IMMERSION: "IMMERSION",
} as const;

export type CoolingType = typeof CoolingType[keyof typeof CoolingType];

export interface IAssessmentData {
    facilityMw: number;
    utilization: number;
    coolingType: CoolingType;
}

export interface IAssessmentRegisterData {
  email: string;
  assessmentId: string;
}
