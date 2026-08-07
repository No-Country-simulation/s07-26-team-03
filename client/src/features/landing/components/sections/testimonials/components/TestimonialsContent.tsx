import { TestimonialsControls } from "./TestimonialsControls";

import type { TestimonialsContentProps } from "../testimonials.types";
import { SectionHeader } from "@/shared/components/headers/section-header";

export function TestimonialsContent({
  content,
  onPrevious,
  onNext,
}: TestimonialsContentProps) {
  return (
    <div
      className="
        flex
        flex-col
        justify-center
        gap-10
        lg:max-w-sm
      "
    >
      <SectionHeader
        badge={content.badge}
        title={content.title}
        description={content.description}
        align="left"
      />

      <TestimonialsControls
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </div>
  );
}