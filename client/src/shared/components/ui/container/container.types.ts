import type { HTMLAttributes } from "react";

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  fluid?: boolean;
}