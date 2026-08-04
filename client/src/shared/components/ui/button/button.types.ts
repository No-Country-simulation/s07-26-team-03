import type { ButtonHTMLAttributes, ReactNode } from "react";


export type ButtonVariant =
  | "filled"
  | "outline"
  | "ghost"

export type ButtonColor =
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "surface";

export type ButtonSize =
  | "sm"
  | "md"
  | "lg";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;

  variant?: ButtonVariant;

  color?: ButtonColor;

  size?: ButtonSize;

  fullWidth?: boolean;

  loading?: boolean;

  disabled?: boolean;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;
}