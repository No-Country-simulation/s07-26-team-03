import { cn } from "@/shared/lib/cn";

import { callToActionCardStyles } from "./call-to-action-card.styles";
import type { CallToActionCardProps } from "./call-to-action-card.types";
import { Checklist } from "../../ui/checklist";
import { IconWrapper } from "../../ui/icon-wrapper/IconWrapper";

export function CallToActionCard({
  icon,
  title,
  description,
  checklist,
  primaryAction,
  secondaryAction,
  className,
  ...props
}: CallToActionCardProps) {
  return (
    <section
      className={cn(
        callToActionCardStyles.container,
        className
      )}
      {...props}
    >
      <div className={callToActionCardStyles.content}>
        <div className={callToActionCardStyles.header}>
          <div
            className={callToActionCardStyles.iconWrapper}
          >
            <IconWrapper size="md" color="gray">
                          {icon}
                      </IconWrapper>
          </div>

           

          <div
            className={callToActionCardStyles.text}
          >
            <h3
              className={callToActionCardStyles.title}
            >
              {title}
            </h3>

            <p
              className={
                callToActionCardStyles.description
              }
            >
              {description}
            </p>
          </div>
        </div>

        <Checklist
          {...checklist}
          className={cn(
            callToActionCardStyles.checklist,
            checklist.className
          )}
        />

        <div
          className={callToActionCardStyles.actions}
        >
          {primaryAction}

          {secondaryAction}
        </div>
      </div>
    </section>
  );
}