import type { AlignmentVariant } from "@/shared/types/common.types";


export const alignmentStyles: Record<
    AlignmentVariant,
    string
> = {

    left: [
        "items-start",
        "text-left",
    ].join(" "),

    right: [
        "items-end",
        "text-right",
    ].join(" "),

    center: [
        "items-center",
        "text-center",
    ].join(" "),
};

export const benefitCardStyles = {

    container: [
        "flex",
        "flex-col",
        "gap-5",
        "rounded-2xl",
        "transition-all",
        "duration-300",
    ].join(" "),

    hover: [
        "hover:-translate-y-1",
        "hover:shadow-xl",
    ].join(" "),

    icon: [
        "flex",
        "h-16",
        "w-16",
        "items-center",
        "justify-center",
        "text-brand-primary",
        "shrink-0",
    ].join(" "),

    title: [
        "font-heading",
        "text-2xl",
        "font-bold",
        "leading-tight",
        "text-heading",
    ].join(" "),

    description: [
        "text-base",
        "leading-7",
        "text-text",
    ].join(" "),
};