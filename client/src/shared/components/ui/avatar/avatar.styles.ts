import type {
  AvatarColor,
  AvatarShape,
  AvatarSize,
} from "./avatar.types";

export const baseStyles = [
  "inline-flex",
  "items-center",
  "justify-center",
  "overflow-hidden",
  "shrink-0",
  "font-semibold",
  "select-none",
].join(" ");

export const sizeStyles: Record<
  AvatarSize,
  string
> = {
  xs: "h-8 w-8 text-xs",

  sm: "h-10 w-10 text-sm",

  md: "h-12 w-12 text-base",

  lg: "h-16 w-16 text-lg",

  xl: "h-20 w-20 text-xl",
};

export const shapeStyles: Record<
  AvatarShape,
  string
> = {
  circle: "rounded-full",

  rounded: "rounded-xl",

  square: "rounded-none",
};

export const colorStyles: Record<
  AvatarColor,
  string
> = {
  neutral: `
    bg-gray-100
    text-gray-600
  `,

  primary: `
    bg-brand-primary-100
    text-primary
  `,

  success: `
    bg-success-bg
    text-success
  `,

  warning: `
    bg-warning-bg
    text-warning
  `,

  error: `
    bg-error-bg
    text-error
  `,

  info: `
    bg-info-bg
    text-info
  `,
};

export const imageStyles = [
  "h-full",
  "w-full",
  "object-cover",
].join(" ");

export const iconStyles = [
  "flex",
  "items-center",
  "justify-center",
].join(" ");