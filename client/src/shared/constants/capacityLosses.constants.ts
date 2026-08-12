import type {
  CapacityMetricCardData,
  LossCardData,
} from "../interfaces/capacityLosses.interface";

export const CAPACITY_METRICS_DATA: CapacityMetricCardData[] = [
  {
    id: "facility-capacity",
    title: "FACILITY",
    value: "10.0 MV",
    subtitle: "Total installed Capacity",
    bgColor: "bg-brand-primary-100",
    textColor: "text-emerald-600",
    cardClasses: "w-full min-h-[120px]",
  },
  {
    id: "it-layer-capacity",
    title: "IT LAYER",
    value: "6.8 MV",
    subtitle: "After Infrastructure losses",
    bgColor: "bg-info-bg",
    textColor: "text-sky-600",
    cardClasses: "w-full min-h-[110px]",
  },
  {
    id: "workloads-layer-capacity",
    title: "WORKLOADS LAYER",
    value: "3.8 MV",
    subtitle: "Effective Workload Capacity",
    bgColor: "bg-warning-bg",
    textColor: "text-amber-700",
    cardClasses: "w-full min-h-[100px]",
  },
  {
    id: "stranded-capacity",
    title: "STRANDED CAPACITY",
    value: "6.2 MV",
    subtitle: "62% of installed Capacity is Wasted",
    bgColor: "bg-[#FEF2F2]",
    textColor: "text-red-600",
    cardClasses: "w-full min-h-[90px]",
  },
];

export const CAPACITY_LOSSES_DATA: LossCardData[] = [
  {
    id: "facility-losses",
    title: "Facility Losses",
    value: "1.6 MV(16%)",
    bgColor: "bg-brand-primary-100",
    cardClasses: "w-full min-h-[130px]",
    items: [
      { label: "Cooling inneficiency", value: "0.7MV(7%)" },
      { label: "Power Distribution", value: "0.5MV(5%)" },
      { label: "Space Unused", value: "0.4MV(4%)" },
    ],
  },
  {
    id: "it-losses",
    title: "IT Losses",
    value: "3.0 MV(30%)",
    bgColor: "bg-info-bg",
    cardClasses: "w-full min-h-[115px]",
    items: [
      { label: "Over-provisioning", value: "1.2MV(12%)" },
      { label: "Underutilized Servers", value: "1.0MV(1%)" },
      { label: "Network inefficiency", value: "0.8MV(8%)" },
    ],
  },
  {
    id: "workload-losses",
    title: "Workload Losses",
    value: "10 MV(1.0%)",
    bgColor: "bg-warning-bg",
    cardClasses: "w-full min-h-[100px]",
    items: [
      { label: "Data inefficiency", value: "0.7MV(7%)" },
      { label: "Processing Overhead", value: "0.5MV(5%)" },
    ],
  },
];