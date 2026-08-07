import { cn } from "@/shared/lib/cn";
import { IoMdQuote } from "react-icons/io";

import {
  cardStyles,
  companyStyles,
  footerStyles,
  headerStyles,
  quoteIconStyles,
  quoteStyles,
} from "./testimonial-card.styles";

import type { TestimonialCardProps } from "./testimonial-card.types";
import { Avatar } from "../ui/avatar";

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        cardStyles,
        className
      )}
    >
      <div>
        <header className={headerStyles}>
          <Avatar
            size="md"
            src={testimonial.avatar.src}
            alt={testimonial.avatar.alt}
            fallback={testimonial.avatar.fallback}
          />

          <div>
            <h4 
                className="text-md font-semibold text-heading"
            >
              {testimonial.name}
            </h4>

            <p
             className="text-sm text-placeholder"
            >
              {testimonial.role}
            </p>
          </div>
        </header>

        <blockquote
          className={quoteStyles}
        >
          "{testimonial.quote}"
        </blockquote>
      </div>

      <footer className={footerStyles}>
        <div className={companyStyles}>
           <img
            src= {testimonial.company?.logo}
            alt= {testimonial.company?.logo}
            className="
              w-auto
              object-contain
            "
          />

        </div>

        <IoMdQuote
          size={28}
          className={quoteIconStyles}
        />
      </footer>
    </article>
  );
}