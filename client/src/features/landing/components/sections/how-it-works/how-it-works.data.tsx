import { IoBarChartOutline, IoEnterOutline, IoLockClosedOutline } from "react-icons/io5";
import type { HowItWorksContent } from "./how-it-works.types";

export const howItWorksContent: HowItWorksContent = {
  badge: "HOW IT WORKS",

  title: "Three simple steps.\nInsights in minutes",

  description:
    "Get a quick estimate of your stranded capacity and financial impact in just a few minutes.",

  steps: [
    {
      id: "inputs",

      step: 1,

      icon: <IoEnterOutline />,

      title: "Enter your inputs",

      description:
        "Provide your facility size (MW), average utilization and cooling type.",
    },

    {
      id: "results",

      step: 2,

      icon: <IoBarChartOutline />,

      title: "Get Basic Results",

      description:
        "Instantly see your stranded capacity, financial impact and capacity score.",
    },

    {
      id: "analysis",

      step: 3,

      icon: <IoLockClosedOutline />,

      title: "Unlock Full Analysis",

      description:
        "Explore detailed breakdowns, compare scenarios and download your report.",
    },
  ],
};