export interface IAssessmentResponse {
  id: string;
  configurationId: string;
  assessmentId: string;
  facilityMw: number;
  utilization: number;
  coolingType: string;
  strandedPercent: number;
  strandedMw: number;
  annualCostMin: number;
  annualCostMax: number;
  capacityScore: string;
  recommendationSummary: string;
  algorithmVersion: string;
  calculatedAt: string;
}

export interface IAssessmentRegisterResponse {
  message: string;
  expiresInSeconds: number;
}

export interface IVerifyResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}