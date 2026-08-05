import type {
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactNode,
} from "react";

export type AvatarSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl";

export type AvatarShape =
  | "circle"
  | "rounded"
  | "square";

export type AvatarColor =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info";

export interface AvatarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {

  src?: string;

  alt?: string;

  fallback?: string;

  icon?: ReactNode;

  size?: AvatarSize;

  shape?: AvatarShape;

  color?: AvatarColor;

  imageProps?: Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    "src" | "alt"
  >;
}