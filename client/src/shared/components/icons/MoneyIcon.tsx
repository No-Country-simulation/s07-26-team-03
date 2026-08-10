interface MoneyIconProps {
  size?: number;
  className?: string;
}

export const MoneyIcon = ({
  size = 32,
  className = "",
}: MoneyIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Fondo circular */}
      <circle
        cx="16"
        cy="16"
        r="15"
        className="fill-current/10 stroke-current/20"
      />

      {/* Billete */}
      <rect
        x="9"
        y="11.5"
        width="14"
        height="9"
        rx="1.5"
        className="stroke-current"
        strokeWidth="1.5"
      />

      {/* Círculo central */}
      <circle
        cx="16"
        cy="16"
        r="2.5"
        className="stroke-current"
        strokeWidth="1.3"
      />

      {/* Detalles del billete */}
      <path
        d="M11.5 14C12.3 14 13 13.3 13 12.5"
        className="stroke-current"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      <path
        d="M20.5 18C19.7 18 19 18.7 19 19.5"
        className="stroke-current"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};