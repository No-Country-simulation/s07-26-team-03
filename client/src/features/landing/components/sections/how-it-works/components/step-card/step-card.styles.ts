export const stepCardStyles = {
  container: [
    "relative",
    "flex",
    "flex-col",
    "gap-5",
    "w-full",
  ].join(" "),

  timeline: [
    "relative",
    "flex",
    "items-center",
    "mb-2",
  ].join(" "),

  badge: [
    "flex",
    "h-10",
    "w-10",
    "items-center",
    "justify-center",
    "rounded-full",
    "bg-brand-primary",
    "text-white",
    "text-base",
    "font-bold",
    "shrink-0",
    "z-10",
  ].join(" "),

  line: [
    "ml-3",
    "h-[3px]",
    "flex-1",
    "rounded-full",
    "bg-brand-primary",
    "hidden",
    "lg:block",
  ].join(" "),

  header: [
    "flex",
    "items-start",
    "justify-between",
    "gap-4",
  ].join(" "),

  title: [
    "font-heading",
    "text-2xl",
    "font-bold",
    "leading-tight",
    "text-heading",
  ].join(" "),

  icon: [
    "text-heading",
    "shrink-0",
  ].join(" "),

  description: [
    "text-base",
    "leading-7",
    "text-text",
  ].join(" "),
};