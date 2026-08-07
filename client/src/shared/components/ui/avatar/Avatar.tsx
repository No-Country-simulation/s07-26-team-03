import { cn } from "@/shared/lib/cn";

import {
  baseStyles,
  colorStyles,
  iconStyles,
  imageStyles,
  shapeStyles,
  sizeStyles,
} from "./avatar.styles";

import type { AvatarProps } from "./avatar.types";

export function Avatar({
  src,
  alt,
  fallback,
  icon,
  size = "md",
  shape = "circle",
  color = "neutral",
  imageProps,
  className,
  ...props
}: AvatarProps) {
  const classes = cn(
    baseStyles,
    sizeStyles[size],
    shapeStyles[shape],
    colorStyles[color],
    className
  );

  return (
    <div
      className={classes}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={imageStyles}
          {...imageProps}
        />
      ) : icon ? (
        <span
          className={iconStyles}
          aria-hidden="true"
        >
          {icon}
        </span>
      ) : (
        <span aria-hidden="true">
          {fallback}
        </span>
      )}
    </div>
  );
}