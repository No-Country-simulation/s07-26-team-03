import type { InfoCardProps } from "@/shared/types/InfoCard.types";

export default function InfoCard({
  data = {
    strandedCapacity: { result: "6.2MV", percentage: "50%", label: "High" },
    annualCost: { result: "$1.24 - 1.68M" },
    capacityScore: { result: "-B", label: "Moderate" }
  },
}: InfoCardProps) {
  return (
    <div className="w-full rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0px_0.5px_8px_rgba(25,33,61,0.06)]">
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col justify-between gap-2 rounded-xl bg-[#FAFBFD] px-5 py-4">
          <span className="font-heading text-base font-bold text-[#170F49]">
            Estimated Stranded Capacity
          </span>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="font-semibold text-[#0E6A37]">
              {data.strandedCapacity.result}
            </span>
            <span className="text-[#6F6C8F]">
              {data.strandedCapacity.percentage}
            </span>
            <span className="text-[#6F6C8F]">
              {data.strandedCapacity.label}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 rounded-xl bg-[#FAFBFD] px-5 py-4">
          <span className="font-heading text-base font-bold text-[#170F49]">
            Estimated Annual Cost
          </span>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="font-semibold text-[#0E6A37]">
              {data.annualCost.result}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 rounded-xl bg-[#FAFBFD] px-5 py-4">
          <span className="font-heading text-base font-bold text-[#170F49]">
            Capacity Score
          </span>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="font-semibold text-[#0E6A37]">
              {data.capacityScore.result}
            </span>
            <span className="font-semibold text-[#0E6A37]">
              {data.capacityScore.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}