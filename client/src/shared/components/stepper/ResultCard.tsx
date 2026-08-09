import type { ResultCardProps } from "@/shared/types/ResultCard.types";
import { StatusBadge } from "../badges/Badges";
import { PulseIcon } from "../icons/PulseIcon";
import { MoneyIcon } from "../icons/MoneyIcon";
import { StarIcon } from "../icons/StarIcon";

export default function ResultCard({
  data = {
    strandedCapacity: { result: "6.2MV", percentage: "50%", label: "High" },
    annualCost: { result: "$1.24 - 1.68M" },
    capacityScore: { result: "-B", label: "Moderate" }
  },
}: ResultCardProps) {
  return (
    <div className="w-full rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0px_0.5px_8px_rgba(25,33,61,0.06)]">
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col justify-between gap-2 rounded-xl bg-[#FAFBFD] px-5 py-4">
          <PulseIcon size={36} className="text-[#0E6A37]" />
          <span className="font-heading text-base font-bold text-[#170F49]">
            Estimated Stranded Capacity
          </span>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="text-[#0E6A37] font-bold text-[20px]">
              {data.strandedCapacity.percentage}
            </span>
          </div>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="font-bold text-[16px] text-black ">
              {data.strandedCapacity.result}
            </span>
            <StatusBadge />
          </div>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="font-bold text-[12px] text-gray-400">
              of your installed capacity is currently underutilized
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 rounded-xl bg-[#FAFBFD] px-5 py-4">
          <MoneyIcon size={36} className="text-[#ea8800]"/>
          <span className="font-heading text-base font-bold text-[#170F49]">
            Estimated Annual Cost
          </span>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="text-[#ea8800] font-bold text-[20px]">
              {data.annualCost.result}
            </span>
          </div>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="text-[16px] font-semibold text-black ">
              USD per year
            </span>
          </div>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="font-bold text-[12px] text-gray-400">
              of your installed capacity is currently underutilized
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 rounded-xl bg-[#FAFBFD] px-5 py-4">
          <StarIcon size={36} className="text-[#ea0000]"/>
          <span className="font-heading text-base font-bold text-[#170F49]">
            Capacity Score
          </span>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="text-black font-bold text-[20px]">
              {data.capacityScore.result}
            </span>
          </div>
          <div className="flex w-full items-center justify-between font-body text-base">
            <StatusBadge label={data.capacityScore.label} />
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