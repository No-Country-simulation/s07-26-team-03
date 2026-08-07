import { cn } from "@/shared/lib/cn";

import { stepCardStyles } from "./step-card.styles";
import type { StepCardProps } from "./step-card.types";
import { IconWrapper } from "@/shared/components/ui/icon-wrapper/IconWrapper";

export function StepCard({
  step,
  title,
  description,
  icon,
  isLast = false,
  className,
  ...props
}: StepCardProps) {
  return (
    <article
      className={cn(
        stepCardStyles.container,
        className
      )}
      {...props}
    >
      <div className={stepCardStyles.timeline}>
        <div className={stepCardStyles.badge}>
          {step}
        </div>

        {!isLast && (
          <div className={stepCardStyles.line} />
        )}
      </div>

      <div className={stepCardStyles.header}>
        <h3
          className={stepCardStyles.title}
        >
          {title}
        </h3>

            <IconWrapper size="md" color="green">
                {icon}
            </IconWrapper>
    </div>

      <p
        className={stepCardStyles.description}
      >
        {description}
      </p>
    </article>
  );
}