interface StarIconProps {
  size?: number;
  className?: string;
}

export const StarIcon = ({
  size = 32,
  className = "",
}: StarIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="16"
        cy="16"
        r="15"
        className="fill-current/10 stroke-current/20"
      />
      <path
        d="M16 9.5L18 13.5L22.5 14.15L19.25 17.3L20 21.75L16 19.65L12 21.75L12.75 17.3L9.5 14.15L14 13.5L16 9.5Z"
        className="stroke-current"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};