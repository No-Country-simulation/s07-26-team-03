export interface EstimatedStrandedCapacity {
  percentage: string;
  result: string;
  label: string;
}

export interface EstimatedAnnualCost {
  result: string;
}

export interface CapacityScore {
  result: string;
  label: string;
}

export interface InfoCardData {
  strandedCapacity: EstimatedStrandedCapacity;
  annualCost: EstimatedAnnualCost;
  capacityScore: CapacityScore;
}

export interface InfoCardProps {
  data?: InfoCardData;
}