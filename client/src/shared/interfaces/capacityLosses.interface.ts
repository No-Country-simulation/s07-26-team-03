export interface LossItem {
  label: string;
  value: string;
}

export interface LossCardData {
  id: string;
  title: string;
  value: string;
  bgColor: string;
  cardClasses: string;
  items: LossItem[];
}

export interface LossCardProps {
  title: string;
  value: string;
  bgColor: string;
  cardClasses?: string;
  items: LossItem[];
}

export interface CapacityMetricCardData {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
  cardClasses: string;
}