type ToggleProps = {
    onClick: () => void;
    isActive: boolean;
    className?: string;
}

const Toggle = ({ onClick, isActive, className }: ToggleProps) => {

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isActive}
      onClick={onClick}
      className={`
        relative
        flex
        h-[30px]
        w-[52px]
        items-center
        rounded-full
        bg-gray-300
        dark:bg-gray-900
        p-[3px]
        transition-colors
        duration-200
        ${className}
      `}

    >
      <span
        className={`
          block
          h-[24px]
          w-[24px]
          shrink-0
          rounded-full
          bg-white
          shadow-md
          transition-transform
          duration-200
          ${isActive ? "translate-x-[22px]" : "translate-x-0"}
        `}
      />
    </button>
  );
};

export default Toggle;