import type { AdvancedAnalysisContent } from "./advanced-analysis.types";

export const advancedAnalysisContent: AdvancedAnalysisContent = {
  badge: "DEEPER INSIGHTS. SMARTER DECISION",

  title: "Go beyond the basics.\nUnlock full insights",

  description:
    "Create an account to access detailed breakdowns by layer, compare scenarios, get AI-powered recommendations and download a professional PDF report to share with your team.",

  illustrationAlt: "Advanced analysis dashboard",

  features: [
    {
      id: "layer-analysis",

      label:
        "Layer-by-layer analysis (Facility, IT Infrastructure, Workloads)",
    },

    {
      id: "scenario-comparison",

      label:
        "Scenario comparison and what-if modeling",
    },

    {
      id: "professional-report",

      label: "Export professional report",
    },

    {
      id: "save-assessment",

      label:
        "Save and track your assessment",
    },
  ],

  cta: {
    iconAlt: "Unlock full analysis",

    title: "Unlock Full Analysis",

    description:
      "Create your free account to access detailed insights and recommendations.",

    checklist: [
      {
        id: "credit-card",

        label: "No credit card required",
      },

      {
        id: "free-plan",

        label: "Free forever for basic results",
      },

      {
        id: "setup",

        label: "Setup in less than 60 seconds",
      },
    ],

    primaryAction: {
      label: "Create Free Account",

      href: "/register",
    },

    secondaryAction: {
      label: "Learn more about full analysis",

      href: "/features",
    },
  },
};