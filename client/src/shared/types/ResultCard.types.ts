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

export interface ResultCardData {
  strandedCapacity: EstimatedStrandedCapacity;
  annualCost: EstimatedAnnualCost;
  capacityScore: CapacityScore;
}

export interface ResultCardProps {
  data?: ResultCardData;
}