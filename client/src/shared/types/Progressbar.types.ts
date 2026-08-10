export interface ProgressBarProps {
  title?: string;
  startValue?: number;
  activeValue?: number;
  endValue?: number;
  dolarSign?: boolean;
  toggle?: boolean;
  unit?: string;
  onChange?: (value: number) => void;
}