import type { ReactNode } from "react";


export interface FooterLink {
  label: string;

  href: string;

  external?: boolean;
}

export interface FooterSocialLink {
  label: string;

  href: string;

  icon: ReactNode;
}

export interface FooterContent {
  navigation: FooterLink[];

  legal: FooterLink[];

  social: FooterSocialLink[];

  copyright: string;
}