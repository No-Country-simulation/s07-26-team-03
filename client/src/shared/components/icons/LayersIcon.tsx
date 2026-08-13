interface LayersIconProps {
  size?: number;
  className?: string;
}

export const LayersIcon = ({
  size = 16,
  className = "",
}: LayersIconProps) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-emerald-50 p-2 ${className}`}
      style={{ width: size * 1.8, height: size * 1.8 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    </div>
  );
};
