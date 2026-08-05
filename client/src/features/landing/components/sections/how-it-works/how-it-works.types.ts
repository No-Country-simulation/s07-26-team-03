import type { SectionContent } from "@/shared/types/common.types";
import type { ReactNode } from "react";

export interface HowItWorksStep {
  id: string;

  step: number;

  title: string;

  description: string;

  icon: ReactNode;
}

export interface HowItWorksContent extends SectionContent {
    steps: HowItWorksStep[];
}