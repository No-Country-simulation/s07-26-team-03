interface PulseIconProps {
  size?: number;
  className?: string;
}

export const PulseIcon = ({
  size = 32,
  className = "",
}: PulseIconProps) => {
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
        d="M8 17.5
           C9.5 17.5 10.5 17.5 11.5 15
           L13.5 10
           C14 8.5 15 8.5 15.3 10.5
           L16.8 22
           C17 23.5 18 23.5 18.5 21.5
           L20 15
           C20.3 13.5 21.3 13.5 22 15
           L23 17
           C23.5 18 24.5 18 26 18"
        className="stroke-current"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};