import type { AlignmentVariant } from "@/shared/types/common.types";


export const containerStyles: Record<AlignmentVariant, string> = {
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

export const sectionHeaderStyles = {

    container: [
        "flex",
        "flex-col",
        "gap-3",
        "w-full max-w-none xl:max-w-7xl mx-auto",
    ].join(" "),

    badge: [
        "text-sm",
        "font-semibold",
        "uppercase",
        "tracking-[0.18em]",
        "text-brand-primary",
    ].join(" "),

    title: [
        "font-heading",
        "text-4xl",
        "font-extrabold",
        "leading-tight",
        "text-heading",
        "md:text-5xl",
    ].join(" "),

    description: [
        "max-w-5xl",
        "text-lg",
        "leading-8",
        "text-text",
    ].join(" "),
};