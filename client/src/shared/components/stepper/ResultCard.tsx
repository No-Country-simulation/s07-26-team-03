import type { ResultCardProps } from "../../types/ResultCard.types";

export default function ResultCard({
  data = {
    facilitySize: { value: "7.5MW", label: "Large" },
    utilization: { value: "60%", label: "Healthy" },
    coolingType: { value: "AIR COOLING" },
  },
}: ResultCardProps) {
  return (
    <div className="w-full rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0px_0.5px_8px_rgba(25,33,61,0.06)]">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E5E7EB] shadow-sm transition-transform hover:scale-105">
          <svg
            className="h-6 w-6 text-[#4B5563]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2z" />
            <path d="M9 9V6a3 3 0 016 0v3" />
            <path d="M12 13v2" />
          </svg>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold text-[#170F49]">
            Your Assessment
          </h2>
          <p className="mt-1 font-body text-sm text-[#6F6C8F]">
            These inputs will help us calculate your stranded capacity and
            potential financial impact
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col justify-between gap-2 rounded-xl bg-[#FAFBFD] px-5 py-4">
          <span className="font-heading text-base font-bold text-[#170F49]">
            Facility Size
          </span>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="font-semibold text-[#0E6A37]">
              {data.facilitySize.value}
            </span>
            <span className="text-[#6F6C8F]">
              {data.facilitySize.label}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 rounded-xl bg-[#FAFBFD] px-5 py-4">
          <span className="font-heading text-base font-bold text-[#170F49]">
            Utilization
          </span>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="font-semibold text-[#0E6A37]">
              {data.utilization.value}
            </span>
            <span className="text-[#6F6C8F]">
              {data.utilization.label}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 rounded-xl bg-[#FAFBFD] px-5 py-4">
          <span className="font-heading text-base font-bold text-[#170F49]">
            Cooling Type
          </span>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="font-semibold text-[#0E6A37]">
              {data.coolingType.value}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}