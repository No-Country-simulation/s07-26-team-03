import type { HTMLAttributes, ReactNode } from "react";

export interface Baseprops {
    children? : ReactNode;
    className? : string;
}

export interface BaseComponentProps
    extends Baseprops,
    HTMLAttributes<HTMLElement> {}


