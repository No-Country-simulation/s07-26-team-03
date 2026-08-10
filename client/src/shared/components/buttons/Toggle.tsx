type ToggleProps = {
    onClick: () => void;
    isActive: boolean;
    className?: string;
}

const Toggle = ({ onClick, isActive, className }: ToggleProps) => {

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} rounded-lg bg-gray-100 px-4 py-2 text-gray-900 dark:bg-gray-800 dark:text-white`}
    >
    </button>
  );
};

export default Toggle;