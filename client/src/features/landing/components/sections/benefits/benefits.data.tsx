import { ChartUpIcon } from "@/shared/icons/ChartUpIcon";
import { ClipboardDollarIcon } from "@/shared/icons/ClipboardDollarIcon";
import { ShieldLockIcon } from "@/shared/icons/ShieldLockIcon";
import { StatsIncreaseIcon } from "@/shared/icons/StatsIncreaseIcon";
import type { ReactNode } from "react";

export interface Benefit {
  id: string;

  icon: ReactNode;

  title: string;

  description: string;
}

export interface BenefitsContent {
  badge: string;

  title: string;

  description: string;

  items: Benefit[];
}

export const benefitsContent: BenefitsContent = {
  badge: "THE HIDDEN COST OF OVERPROVISIONING",

  title: "Wasted Capacity. Real impact.",

  description:
    "Data centers are built for peak demand, but rarely operate at full capacity. Unused infrastructure, idle workloads and overprovisioned resources silently increase operational costs every year.",

  items: [
    {
      id: "hidden-waste",

      icon: <ChartUpIcon />,

      title: "Identify Hidden Waste",

      description:
        "Uncover stranded capacity across compute, storage, networking and infrastructure layers.",
    },

    {
      id: "financial-impact",

      icon: <ClipboardDollarIcon />,

      title: "Quantify Financial Impact",

      description:
        "Estimate the annual cost of wasted resources with clear and actionable financial insights.",
    },

    {
      id: "optimization",

      icon: <StatsIncreaseIcon />,

      title: "Optimize with Confidence",

      description:
        "Receive practical recommendations to improve utilization and reduce unnecessary overprovisioning.",
    },

    {
      id: "security",

      icon:  <ShieldLockIcon />,

      title: "Private and Secure",

      description:
        "Your information remains private. No sign-up is required to perform a basic capacity assessment.",
    },
  ],
};