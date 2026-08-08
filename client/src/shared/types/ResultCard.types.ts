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

export interface ResultCardData {
  facilitySize: FacilitySizeData;
  utilization: UtilizationData;
  coolingType: CoolingTypeData;
}

export interface ResultCardProps {
  data?: ResultCardData;
}