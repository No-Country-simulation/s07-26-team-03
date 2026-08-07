import { cn } from "@/shared/lib/cn";

interface GradientSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientSection({
  children,
  className,
}: GradientSectionProps) {
  return (
    <section
      className={cn(
        "bg-layout-gradient",
        className
      )}
    >
      {children}
    </section>
  );
}