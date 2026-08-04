import type { AlignmentVariant } from "@/shared/types/common.types";
import type { HTMLAttributes } from "react";


export interface SectionHeaderProps
    extends HTMLAttributes<HTMLDivElement> {

    badge?: string;

    title: string;

    description?: string;

    align?: AlignmentVariant;
}