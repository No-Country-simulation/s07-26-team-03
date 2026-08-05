import type { HTMLAttributes, ReactNode } from "react";

export interface Baseprops {
    children? : ReactNode;
    className? : string;
}

export interface BaseComponentProps
    extends Baseprops,
    HTMLAttributes<HTMLElement> {}

export type AlignmentVariant =
    | "left"
    | "right"
    | "center";


export interface SectionContent {
  badge: string;
  title: string;
  description: string;
}