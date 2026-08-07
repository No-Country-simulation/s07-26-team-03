import type { Testimonial } from "@/shared/components/testimonial-card";


export interface TestimonialsContentData {
  badge: string;

  title: string;

  description: string;
}

export interface TestimonialsSectionData {
  content: TestimonialsContentData;

  testimonials: Testimonial[];
}

export interface TestimonialsContentProps {
  content: TestimonialsContentData;

  onPrevious: () => void;

  onNext: () => void;
}

export interface TestimonialsControlsProps {
  onPrevious: () => void;

  onNext: () => void;
}