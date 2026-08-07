

import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoTwitter, IoLogoYoutube } from "react-icons/io5";
import type { FooterContent } from "./footer.types";

export const footerContent: FooterContent = {
  navigation: [
    {
      label: "How it Works",
      href: "#how-it-works",
    },
    {
      label: "Features",
      href: "#features",
    },
    {
      label: "Pricing",
      href: "#pricing",
    },
    {
      label: "Resources",
      href: "#resources",
    },
    {
      label: "Testimonials",
      href: "#testimonials",
    },
  ],

  legal: [
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      label: "Terms of Service",
      href: "/terms",
    },
    {
      label: "Cookies Settings",
      href: "/cookies",
    },
  ],

  social: [
    {
      label: "YouTube",
      href: "https://youtube.com",
      icon: <IoLogoYoutube />,
    },
    {
      label: "Facebook",
      href: "https://facebook.com",
      icon: <IoLogoFacebook />,
    },
    {
      label: "Twitter",
      href: "https://twitter.com",
      icon: <IoLogoTwitter />,
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: <IoLogoInstagram />,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: <IoLogoLinkedin />,
    },
  ],

  copyright: "© 2026 CapacityIQ. All rights reserved.",
};