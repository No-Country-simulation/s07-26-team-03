export interface ProgressBarProps {
  title?: string;
  startValue?: number;
  activeValue?: number;
  endValue?: number;
  unit?: string;
  onChange?: (value: number) => void;
}