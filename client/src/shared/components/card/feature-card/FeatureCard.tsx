import { cn } from "@/shared/lib/cn";
import { alignmentStyles, benefitCardStyles } from "./feature-card.styles";
import type { FeatureCardProps } from "./feature-card.types";
import { IconWrapper } from "../../ui/icon-wrapper/IconWrapper";


export function FeatureCard({
    icon,
    title,
    description,
    align = "left",
    hover = false,
    className,
    ...props
}: FeatureCardProps) {

    return (
        <article
            className={cn(
                benefitCardStyles.container,
                alignmentStyles[align],
                hover && benefitCardStyles.hover,
                className
            )}
            {...props}
        >
             <IconWrapper size="lg" color="green">
                {icon}
            </IconWrapper>

            <h3
                className={benefitCardStyles.title}
            >
                {title}
            </h3>

            <p
                className={benefitCardStyles.description}
            >
                {description}
            </p>
        </article>
    );
}