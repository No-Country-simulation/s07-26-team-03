import type { AssessmentCardProps } from "../../types/AssessmentCard.types";

export default function AssessmentCard({
  data = {
    facilitySize: { value: 7.5, label: "Large" },
    utilization: { value: 60, label: "Healthy" },
    coolingType: { value: "AIR COOLING" },
  },
}: AssessmentCardProps) {
  return (
    <div className="w-full rounded-[24px] border border-[#E5E7EB] dark:border-[#252525] bg-white dark:bg-black dark:text-white p-6 shadow-[0px_0.5px_8px_rgba(25,33,61,0.06)]">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E5E7EB] dark:bg-[#252525] dark:text-white shadow-sm transition-transform hover:scale-105">
          <svg
            className="h-6 w-6 text-[#4B5563] dark:bg-[#252525] dark:text-white"
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
          <h2 className="font-heading text-xl font-bold text-black dark:text-gray-100">
            Your Assessment
          </h2>
          <p className="mt-1 font-body text-sm text-gray-700 dark:text-gray-400">
            These inputs will help us calculate your stranded capacity and
            potential financial impact
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col justify-between gap-2 rounded-xl px-5 py-4 bg-[#E5E7EB] dark:bg-[#141414] text-[#4B5563] dark:text-[#E5E7EB]">
          <span className="font-heading text-base font-bold text-gray-800 dark:text-gray-300">
            Facility Size
          </span>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="font-semibold text-[#0E6A37]">
              {data.facilitySize.value}MV
            </span>
            <span className="text-gray-700 dark:text-gray-400">
              {data.facilitySize.label}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 rounded-xl bg-[#E5E7EB] dark:bg-[#141414] text-[#4B5563] dark:text-[#E5E7EB] px-5 py-4">
          <span className="font-heading text-base font-bold text-gray-800 dark:text-gray-300">
            Utilization
          </span>
          <div className="flex w-full items-center justify-between font-body text-base">
            <span className="font-semibold text-[#0E6A37]">
              {data.utilization.value}%
            </span>
            <span className="text-gray-700 dark:text-gray-400">
              {data.utilization.label}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 rounded-xl bg-[#E5E7EB] dark:bg-[#141414] text-[#4B5563] dark:text-[#E5E7EB] px-5 py-4">
          <span className="font-heading text-base font-bold text-gray-800 dark:text-gray-300">
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