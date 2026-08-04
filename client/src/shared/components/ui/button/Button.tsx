import { forwardRef } from "react";

import { cn } from "@/shared/lib/cn";
import { IoReload } from "react-icons/io5";

import {
  baseStyles,
  sizeStyles,
  variantStyles,
} from "./button.styles";

import type { ButtonProps } from "./button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,

      variant = "filled",
      color = "primary",
      size = "md",

      fullWidth = false,

      loading = false,

      disabled = false,

      leftIcon,
      rightIcon,

      className,

      type = "button",

      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          baseStyles,

          sizeStyles[size],

          variantStyles[variant][color],

          fullWidth && "w-full",

          className
        )}
        {...props}
      >
        {loading ? (
          <IoReload  className="size-4 animate-spin" />
        ) : (
          leftIcon
        )}

        <span>{children}</span>

        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";