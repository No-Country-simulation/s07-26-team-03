

import { TestimonialsCarousel } from "./components/TestimonialsCarousel";
import { TestimonialsContent } from "./components/TestimonialsContent";

import { testimonialsData } from "./testimonials.data";

import { useTestimonialsCarousel } from "./hooks/useTestimonialsCarousel";
import { Container } from "@/shared/components/ui/container/Container";

export function Testimonials() {
  const carousel =
    useTestimonialsCarousel();

  return (
    <section
      id="testimonials"
      className="py-16 md:py-20 lg:py-24 px-4 md:px-8 bg-brand-primary-100"
    >
      <Container>
        <div
          className="
            grid
            gap-16

            lg:grid-cols-[360px_1fr]

            lg:items-center
          "
        >
          <TestimonialsContent
            content={
              testimonialsData.content
            }
            onPrevious={
              carousel.previous
            }
            onNext={
              carousel.next
            }
          />

          <TestimonialsCarousel
            ref={carousel.containerRef}
            testimonials={
              testimonialsData.testimonials
            }
          />
        </div>
      </Container>
    </section>
  );
}