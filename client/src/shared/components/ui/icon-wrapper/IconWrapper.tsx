import clsx from "clsx";
import type { ReactNode } from "react";

interface IconWrapperProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'gray' | 'white';
}

export const IconWrapper = ({
  children,
  className,
  size = 'md',
  color = 'green'
}: IconWrapperProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-2xl',
    md: 'w-12 h-12 text-4xl',
    lg: 'w-16 h-16 text-6xl'
  };

  const colorClasses = {
    green: 'text-success',
    gray: 'text-gray-500',
    white: 'text-surface'
  };

  return (
    <div className={clsx(
      'flex items-center justify-center shrink-0 text-4',
      sizeClasses[size],
      colorClasses[color],
      className
    )}>
      {children}
    </div>
  );
};