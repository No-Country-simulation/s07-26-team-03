import type { ComponentType, SVGProps } from "react";

export interface RadioCardItem {
  id: string;
  title: string;
  description: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface RadioGroupConfig {
  title: string;
  description: string;
  subDescription?: string;
  cards: RadioCardItem[];
}

export interface RadioCardsProps {
  group?: RadioGroupConfig;
  title?: string;
  description?: string;
  subDescription?: string;
  cards?: RadioCardItem[];
  selectedId?: string;
  onChange?: (id: string) => void;
}