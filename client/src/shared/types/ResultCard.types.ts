export interface FacilitySizeData {
  value: string;
  label: string;
}

export interface UtilizationData {
  value: string;
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