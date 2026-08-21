import { StatusBadge } from "../badges/Badges";
import { PulseIcon } from "../icons/PulseIcon";
import { MoneyIcon } from "../icons/MoneyIcon";
import { StarIcon } from "../icons/StarIcon";
import type { IAssessmentResponse } from "@/shared/api/types/response.interface";

interface ResultCardProps {
  data?: IAssessmentResponse;
}

export default function ResultCard({ data }: ResultCardProps) {
  if (!data) return null;

  const formatMillions = (value: number) => {
    return `${(value / 1_000_000).toFixed(2)}M`;
  };

  return (
    <div className="w-full rounded-[24px] border border-[#E5E7EB] dark:border-[#252525] bg-white dark:bg-black dark:text-white p-6 shadow-[0px_0.5px_8px_rgba(25,33,61,0.06)]">
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col justify-between gap-2 rounded-xl bg-[#E5E7EB] dark:bg-[#141414] text-[#4B5563] dark:text-[#E5E7EB] px-5 py-4">
          <PulseIcon size={36} className="text-[#0E6A37]" />
          <span className="font-heading text-base font-bold text-gray-800 dark:text-gray-300">
            Estimated Stranded Capacity
          </span>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="text-[#0E6A37] font-bold text-[20px]">
              {data.strandedPercent}%
            </span>
          </div>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="font-bold text-[16px] text-black dark:text-gray-200">
              {data.facilityMw}MV
            </span>
            <StatusBadge />
          </div>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="font-bold text-[12px] text-gray-400">
              of your installed capacity is currently underutilized
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 rounded-xl bg-[#E5E7EB] dark:bg-[#141414] text-[#4B5563] dark:text-[#E5E7EB] px-5 py-4">
          <MoneyIcon size={36} className="text-[#ea8800]"/>
          <span className="font-heading text-base font-bold text-gray-800 dark:text-gray-300">
            Estimated Annual Cost
          </span>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="text-[#ea8800] font-bold text-[20px]">
              {formatMillions(data.annualCostMin)} - {formatMillions(data.annualCostMax)}
            </span>
          </div>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="text-[16px] font-semibold text-black dark:text-gray-200">
              USD per year
            </span>
          </div>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="font-bold text-[12px] text-gray-400">
              of your installed capacity is currently underutilized
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 rounded-xl bg-[#E5E7EB] dark:bg-[#141414] text-[#4B5563] dark:text-[#E5E7EB] px-5 py-4">
          <StarIcon size={36} className="text-[#ea0000]"/>
          <span className="font-heading text-base font-bold text-gray-800 dark:text-gray-300">
            Capacity Score
          </span>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="text-black dark:text-gray-200 font-bold text-[20px]">
              {data.capacityScore}
            </span>
          </div>
          <div className="flex w-full items-center justify-between font-body text-base">
            <StatusBadge label={"Moderate"} />
          </div>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="font-bold text-[12px] text-gray-400">
              Room for significant improvement
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}