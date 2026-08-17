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

export interface IAssessmentLayersAnalysis {
  assessmentId: string;
  layers: [
    {
      layer: string;
      inputMw: number;
      outputMw: number;
      lossMw: number;
      lossPercent: number;
      displayOrder: number;
      lossFactors: [
        {
          factor: string;
          impactPercent: number;
          impactMw: number;
        }
      ]
    }
  ],
  strandedMw: number;
  strandedPercent: number;
}