export interface FacilitySizeData {
  value: number;
  label: string;
}

export interface UtilizationData {
  value: number;
  label: string;
}

export interface CoolingTypeData {
  value: string;
}

export interface AssessmentCardData {
  facilitySize: FacilitySizeData;
  utilization: UtilizationData;
  coolingType: CoolingTypeData;
}

export interface AssessmentCardProps {
  data?: AssessmentCardData;
}