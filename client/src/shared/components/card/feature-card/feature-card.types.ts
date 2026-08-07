import type { AlignmentVariant } from "@/shared/types/common.types";
import type { HTMLAttributes, ReactNode } from "react";


export interface FeatureCardProps
    extends HTMLAttributes<HTMLDivElement> {

    icon: ReactNode;

    title: string;

    description: string;

    align?: AlignmentVariant;

    hover?: boolean;
}