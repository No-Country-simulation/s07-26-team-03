interface StatusBadgeProps {
  label?: string;
}

export const StatusBadge = ({ label = "High" }: StatusBadgeProps) => {
  return (
    <span className="inline-flex items-center rounded-md bg-[#FFF0F1] px-2 py-1 text-[10px] font-medium text-[#E5484D]">
      {label}
    </span>
  );
};