import type { HTMLAttributes, ReactNode } from "react";

export interface StepCardProps
  extends HTMLAttributes<HTMLDivElement> {
  step: number;

  title: string;

  description: ReactNode;

  icon: ReactNode;

  isLast?: boolean;
}