import type { ReactNode } from "react";

export interface HowItWorksStep {
  id: string;

  step: number;

  title: string;

  description: string;

  icon: ReactNode;
}

export interface HowItWorksContent {
  badge: string;

  title: string;

  description: string;

  steps: HowItWorksStep[];
}