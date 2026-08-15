export const BREAKDOWN_CARDS_DATA = [
  {
    id: "facility-capacity",
    title: "Facility",
    value: "10.0 MV",
    subtitle: "100%",
    textColor: "text-emerald-600",
  },
  {
    id: "it-layer-capacity",
    title: "IT Infrastructure",
    value: "6.8 MV",
    subtitle: "68%",
    textColor: "text-sky-600",
  },
  {
    id: "workloads-layer-capacity",
    title: "Workloads",
    value: "3.8 MV",
    subtitle: "38%",
    textColor: "text-amber-700",
  },
  {
    id: "stranded-capacity",
    title: "Stranded Capacity",
    value: "6.2 MV",
    subtitle: "62%",
    textColor: "text-red-600",
  },
];

export const BREAKDOWN_LEGEND_DATA = [
  {
    label: "Over-provisioned",
    value: "2.5MV",
    percentage: "40%",
    dotColor: "bg-emerald-500",
  },
  {
    label: "Inefficient Utilization",
    value: "1.6MV",
    percentage: "25%",
    dotColor: "bg-sky-400",
  },
  {
    label: "Other Losses",
    value: "1.2MV",
    percentage: "20%",
    dotColor: "bg-purple-500",
  },
  {
    label: "Effectively Used",
    value: "0.9MV",
    percentage: "15%",
    dotColor: "bg-pink-400",
  },
];

export const BREAKDOWN_TABLE_DATA = [
  {
    layer: "Facility Layer",
    input: "10.0",
    output: "8.4",
    loss: "1.6",
    lossPct: "16%",
    efficiency: "84%",
    factors: ["Cooling inneficiency", "Power Distribution", "Space Unused"],
  },
  {
    layer: "IT Layer",
    input: "10.0",
    output: "8.4",
    loss: "1.6",
    lossPct: "16%",
    efficiency: "84%",
    factors: ["Cooling inneficiency", "Power Distribution", "Space Unused"],
  },
  {
    layer: "Workload Layer",
    input: "10.0",
    output: "8.4",
    loss: "1.6",
    lossPct: "16%",
    efficiency: "84%",
    factors: ["Cooling inneficiency", "Power Distribution", "Space Unused"],
  },
];