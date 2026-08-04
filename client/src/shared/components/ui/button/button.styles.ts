import type {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from "./button.types";

export const baseStyles = [
  "inline-flex",
  "items-center",
  "justify-center",
  "gap-2",
  "rounded-lg",
  "font-semibold",
  "transition-all",
  "duration-200",
  "select-none",
  "whitespace-nowrap",
  "cursor-pointer",

  "disabled:pointer-events-none",
  "disabled:opacity-50",

  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-offset-2",
].join(" ");

export const sizeStyles: Record<ButtonSize, string> = {
  sm: "py-2 px-3 text-sm",
  md: "py-2 px-4 text-md",
  lg: "py-4 px-5 text-lg",
};

export const variantStyles: Record<
  ButtonVariant,
  Record<ButtonColor, string>
> = {
  filled: {
    primary: [
      "bg-brand-primary",
      "text-white",
      "hover:bg-brand-primary-hover",
      "active:bg-brand-primary-active",
      "focus-visible:ring-brand-primary",
    ].join(" "),

    success: [
      "bg-success",
      "text-white",
      "hover:brightness-95",
      "focus-visible:ring-success",
    ].join(" "),

    warning: [
      "bg-warning",
      "text-white",
      "hover:brightness-95",
      "focus-visible:ring-warning",
    ].join(" "),

    error: [
      "bg-error",
      "text-white",
      "hover:brightness-95",
      "focus-visible:ring-error",
    ].join(" "),

    surface: [
      "bg-surface",
      "text-text",
      "hover:brightness-95",
      "focus-visible:ring-surface",
    ].join(" "),
  },

  outline: {
    primary: [
      "border",
      "border-brand-primary",
      "text-brand-primary",
      "hover:bg-brand-primary-200",
      "focus-visible:ring-brand-primary",
    ].join(" "),

    success: [
      "border",
      "border-success",
      "text-success",
      "hover:bg-success-bg",
      "focus-visible:ring-success",
    ].join(" "),

    warning: [
      "border",
      "border-warning",
      "text-warning",
      "hover:bg-warning-bg",
      "focus-visible:ring-warning",
    ].join(" "),

    error: [
      "border",
      "border-error",
      "text-error",
      "hover:bg-error-bg",
      "focus-visible:ring-error",
    ].join(" "),

    surface: [
     "border",
      "border-surface",
      "text-surface",
      "hover:bg-bg",
      "focus-visible:ring-surface",
    ].join(" "),
  },

  ghost: {
    primary: [
      "text-brand-primary",
      "hover:bg-brand-primary-200",
    ].join(" "),

    success: [
      "text-success",
      "hover:bg-success-bg",
    ].join(" "),

    warning: [
      "text-warning",
      "hover:bg-warning-bg",
    ].join(" "),

    error: [
      "text-error",
      "hover:bg-error-bg",
    ].join(" "),

    surface: [
      "text-surface",
      "hover:bg-brand-primary-100",
    ].join(" "),
  },
};