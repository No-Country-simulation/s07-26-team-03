import React from "react";

export const SquareWithCircleIcon: React.FC<{ className?: string }> = ({
  className = "h-5 w-5",
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="12" cy="12" r="5" />
  </svg>
);