

import { Button } from "@/shared/components/ui/button/Button";
import type { TestimonialsControlsProps } from "../testimonials.types";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

export function TestimonialsControls({
  onPrevious,
  onNext,
}: TestimonialsControlsProps) {
  return (
    <div className="flex gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrevious}
      >
        <IoArrowBack size={18} />
      </Button>

      <Button
        size="sm"
        onClick={onNext}
      >
        <IoArrowForward size={18} />
      </Button>
    </div>
  );
}