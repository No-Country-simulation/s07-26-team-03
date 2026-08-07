import { cn } from "@/shared/lib/cn";

import {
    containerStyles,
    sectionHeaderStyles,
} from "./section-header.styles";

import type { SectionHeaderProps } from "./section-header.types";

export function SectionHeader({
    badge,
    title,
    description,
    align = "center",
    className,
    ...props
}: SectionHeaderProps) {

    return (
        <div
            className={cn(
                sectionHeaderStyles.container,
                containerStyles[align],
                className
            )}
            {...props}
        >
            {badge && (
                <span
                    className={sectionHeaderStyles.badge}
                >
                    {badge}
                </span>
            )}

            <h2
                className={sectionHeaderStyles.title}
            >
                {title}
            </h2>

            {description && (
                <p
                    className={sectionHeaderStyles.description}
                >
                    {description}
                </p>
            )}
        </div>
    );
}