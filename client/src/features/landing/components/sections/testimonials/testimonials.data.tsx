import zoomer from "@/assets/images/companies/zoomer.svg";

import type { TestimonialsSectionData } from "./testimonials.types";

export const testimonialsData: TestimonialsSectionData = {
  content: {
    badge: "Trusted by Data Center Professionals",

    title: "Real Results.\nReal Impact.",

    description:
      "See how operations are using CapacityIQ to identify hidden waste and drive millions in savings every year.",
  },

  testimonials: [
    {
      id: "1",

      name: "Sophia R.",

      role: "Data Center Operations Director",

      quote:
        "CapacityIQ helped us uncover over 6MW of stranded capacity across our facilities. The financial impact was eye-opening.",

      avatar: {
        alt: "Sophia Rodriguez",
        fallback: "SR",
      },

      company: {
        name: "Zoomerr",
        logo: zoomer,
      },
    },

    {
      id: "2",

      name: "Michael T.",

      role: "Infrastructure Manager",

      quote:
        "The platform gave us immediate visibility into wasted capacity and helped justify our optimization initiatives.",

      avatar: {
        alt: "Michael Taylor",
        fallback: "MT",
      },

      company: {
        name: "Zoomerr",
        logo: zoomer,
      },
    },

    {
      id: "3",

      name: "Emily C.",

      role: "Facilities Engineer",

      quote:
        "The assessment was incredibly fast and the generated report made it easy to communicate opportunities to leadership.",

      avatar: {
        alt: "Emily Clark",
        fallback: "EC",
      },

      company: {
        name: "Zoomerr",
        logo: zoomer,
      },
    },

    {
      id: "4",

      name: "Alfonso C.",

      role: "Facilities Engineer",

      quote:
        "The assessment was incredibly fast and the generated report made it easy to communicate opportunities to leadership.",

      avatar: {
        alt: "Alfonso Clark",
        fallback: "EC",
      },

      company: {
        name: "Zoomerr",
        logo: zoomer,
      },
    },
  ],
};