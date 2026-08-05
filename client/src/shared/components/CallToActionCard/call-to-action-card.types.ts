import type {
  HTMLAttributes,
  ReactNode,
} from "react";
import type { ChecklistProps } from "../ui/checklist";


export interface CallToActionCardProps
  extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;

  title: string;

  description: string;

  checklist: ChecklistProps;

  primaryAction: ReactNode;

  secondaryAction?: ReactNode;
}