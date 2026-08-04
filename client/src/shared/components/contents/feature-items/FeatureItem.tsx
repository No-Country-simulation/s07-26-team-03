import { cn } from "@/shared/lib/cn";

import { featureItemStyles } from "./feature-item.styles";
import type { FeatureItemProps } from "./feature-item.types";

export function FeatureItem({
  icon,
  title,
  description,
  iconClassName,
  className,
  ...props
}: FeatureItemProps) {
  return (
    <div
      className={cn(
        featureItemStyles.container,
        className
      )}
      {...props}
    >
      <div
        className={cn(
          featureItemStyles.icon,
          iconClassName
        )}
      >
        {icon}
      </div>

      <div className={featureItemStyles.content}>
        <span className={featureItemStyles.title}>
          {title}
        </span>

        <span className={featureItemStyles.description}>
          {description}
        </span>
      </div>
    </div>
  );
}