import carteraIcon from "@/assets/icons/cartera.svg";
import type { ResultCardProps } from "../../types/ResultCard.types";

export default function ResultCard({
  data = {
    facilitySize: { value: "7.5Mv", label: "Large" },
    utilization: { value: "60%", label: "Healthy" },
    coolingType: { value: "AIR COOLING" },
  },
}: ResultCardProps) {
  return (
    <div className="w-full rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0px_0.5px_8px_rgba(25,33,61,0.06)]">

      <div className="flex items-center gap-4">
        <img
          src={carteraIcon}
          alt="Your Assessment"
          className="h-12 w-12 object-contain"
        />
        <div>
          <h2 className="font-heading text-xl font-bold text-[#170F49]">
            Your Assessment
          </h2>
          <p className="mt-1 font-body text-sm text-[#6F6C8F]">
            these inputs will help us calculate your stranded capacity and
            potential financial impact
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="flex flex-col justify-between gap-2 rounded-xl border border-[#E5E7EB] bg-[#FAFBFD] px-5 py-4">
          <span className="font-heading text-sm font-medium text-[#170F49]">
            Facility Size
          </span>
          <div className="flex items-center gap-2 font-body text-base">
            <span className="font-semibold text-[#0E6A37]">
              {data.facilitySize.value}
            </span>
            <span className="text-[#6F6C8F]">
              {data.facilitySize.label}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 rounded-xl border border-[#E5E7EB] bg-[#FAFBFD] px-5 py-4">
          <span className="font-heading text-sm font-medium text-[#170F49]">
            Utilization
          </span>
          <div className="flex items-center gap-2 font-body text-base">
            <span className="font-semibold text-[#0E6A37]">
              {data.utilization.value}
            </span>
            <span className="text-[#6F6C8F]">
              {data.utilization.label}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 rounded-xl border border-[#E5E7EB] bg-[#FAFBFD] px-5 py-4">
          <span className="font-heading text-sm font-medium text-[#170F49]">
            Cooling Type
          </span>
          <div className="flex items-center gap-2 font-body text-base">
            <span className="font-semibold text-[#0E6A37]">
              {data.coolingType.value}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}