import type { HTMLAttributes } from "react";

export type ChecklistOrientation =
  | "vertical"
  | "horizontal";

export interface ChecklistItem {
  id: string;
  label: string;
}

export interface ChecklistProps
  extends HTMLAttributes<HTMLUListElement> {
  items: ChecklistItem[];
  orientation?: ChecklistOrientation;
  iconSize?: number;
}