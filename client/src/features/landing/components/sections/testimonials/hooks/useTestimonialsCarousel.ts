import { useCallback, useRef } from "react";

export function useTestimonialsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "next" | "previous") => {
    const container = containerRef.current;

    if (!container) return;

    const card = container.firstElementChild as HTMLElement | null;

    if (!card) return;

    const gap = 24; // gap-6 = 24px

    const amount = card.offsetWidth + gap;

    container.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  }, []);

  return {
    containerRef,

    next: () => scroll("next"),

    previous: () => scroll("previous"),
  };
}