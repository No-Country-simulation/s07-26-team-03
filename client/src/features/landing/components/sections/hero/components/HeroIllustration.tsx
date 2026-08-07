import { cn } from "@/shared/lib/cn";

interface HeroIllustrationProps {
  image: string;

  className?: string;
}

export function HeroIllustration({
  image,
  className,
}: HeroIllustrationProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-160",
        className
      )}
    >
      {/* Glow */}

      <div
        className="
          absolute
          inset-0
          -z-10
          rounded-full
          bg-brand-primary/30
          blur-[120px]
        "
      />

      {/* Dashboard */}

      <img
        src={image}
        alt="CapacityIQ Dashboard"
        className="
          relative
          z-10
          w-full
          rounded-2xl
          object-contain
          drop-shadow-2xl
        "
      />
    </div>
  );
}