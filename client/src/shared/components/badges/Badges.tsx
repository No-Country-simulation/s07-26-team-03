interface StatusBadgeProps {
  label?: string;
}

export const StatusBadge = ({ label = "High" }: StatusBadgeProps) => {
  return (
    <span className="inline-flex items-center rounded-md bg-[#E5E7EB] dark:bg-[#141414] px-2 py-1 text-[10px] font-medium text-[#E5484D] border dark:border-[#E5484D]">
      {label}
    </span>
  );
};