export const callToActionCardStyles = {
  container: [
    "rounded-3xl",
    "border",
    "border-border",
    "bg-success-bg/40",
    "p-6",
    "shadow-sm",
  ].join(" "),

  content: [
    "grid",
    "gap-8",
    "lg:grid-cols-[auto_1fr_auto]",
    "lg:items-center",
  ].join(" "),

  header: [
    "flex",
    "items-start",
    "gap-5",
  ].join(" "),

  iconWrapper: [
    "flex",
    "h-20",
    "w-20",
    "items-center",
    "justify-center",
    "rounded-full",
    "border",
    "border-dashed",
    "border-heading",
    "bg-surface",
    "shrink-0",
  ].join(" "),

  text: [
    "space-y-2",
  ].join(" "),

  title: [
    "text-heading",
    "font-heading",
    "text-4xl",
    "font-bold",
    "leading-tight",
  ].join(" "),

  description: [
    "text-text",
    "text-md",
    "leading-relaxed",
  ].join(" "),

  checklist: [
    "w-full",
  ].join(" "),

  actions: [
    "flex",
    "flex-col",
    "items-stretch",
    "gap-3",
    "lg:min-w-[280px]",
  ].join(" "),
};