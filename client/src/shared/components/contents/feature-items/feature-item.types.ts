import type { HTMLAttributes, ReactNode } from "react";

export interface FeatureItemProps
  extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;

  title: string;

  description: string;

  iconClassName?: string;
}