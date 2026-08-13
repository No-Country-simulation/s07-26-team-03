interface LockIconProps {
  size?: number;
  className?: string;
}

export const LockIcon = ({
  size = 24,
  className = "shrink-0",
}: LockIconProps) => {
  return (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <rect
            x="5"
            y="10"
            width="14"
            height="10"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.8"
        />
        <path
            d="M8 10V7.5C8 5.29 9.79 3.5 12 3.5C14.21 3.5 16 5.29 16 7.5V10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
        />
        <circle
            cx="12"
            cy="15"
            r="1"
            fill="currentColor"
        />
    </svg>
  );
};