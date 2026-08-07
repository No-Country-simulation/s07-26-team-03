import { TestimonialCard, type Testimonial } from "@/shared/components/testimonial-card";
import { forwardRef } from "react";



interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export const TestimonialsCarousel =
  forwardRef<HTMLDivElement, TestimonialsCarouselProps>(
    ({ testimonials }, ref) => {
      return (
        <div
          ref={ref}
          className="
            flex
            gap-6
            overflow-x-auto
            scroll-smooth
            snap-x
            snap-mandatory

            scrollbar-none
          "
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="
                w-full
                shrink-0
                snap-start

                md:w-[calc(50%-12px)]

                lg:w-[calc(33.333%-16px)]
              "
            >
              <TestimonialCard
                testimonial={testimonial}
              />
            </div>
          ))}
        </div>
      );
    }
  );

TestimonialsCarousel.displayName =
  "TestimonialsCarousel";