import type { AvatarProps } from "../ui/avatar";

export interface Company {
  name: string;
  logo?: string;
}

export interface Testimonial {
  id: string;

  name: string;

  role: string;

  quote: string;

  company?: Company;

  avatar: Pick<
    AvatarProps,
    "src" | "fallback" | "alt"
  >;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;

  className?: string;
}