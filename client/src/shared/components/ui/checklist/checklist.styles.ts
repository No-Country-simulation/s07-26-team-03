import type { ChecklistOrientation } from "./checklist.types";

export const checklistStyles = {
  container: {
    vertical: [
      "flex",
      "flex-col",
      "gap-4",
    ].join(" "),

    horizontal: [
      "flex",
      "flex-wrap",
      "gap-x-8",
      "gap-y-4",
    ].join(" "),
  } satisfies Record<ChecklistOrientation, string>,

  item: [
    "flex",
    "items-center",
    "gap-3",
  ].join(" "),

  iconWrapper: [
    "flex",
    "h-6",
    "w-6",
    "shrink-0",
    "items-center",
    "justify-center",
    "rounded-full",
    "bg-success",
    "text-white",
  ].join(" "),

  label: [
    "font-body",
    "text-md",
    "leading-relaxed",
    "text-text",
  ].join(" "),
};