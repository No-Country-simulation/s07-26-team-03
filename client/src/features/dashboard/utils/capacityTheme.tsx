export const getMetricCardTheme = (id: string) => {
  switch (id) {
    case "facility-capacity":
      return { bgClass: "bg-capacity-facility", hexColor: "#E7F0EB" };
    case "it-layer-capacity":
      return { bgClass: "bg-capacity-it", hexColor: "#E0F2FE" };
    case "workloads-layer-capacity":
      return { bgClass: "bg-capacity-workloads", hexColor: "#FEF3C7" };
    case "stranded-capacity":
      return { bgClass: "bg-capacity-stranded", hexColor: "#FEF2F2" };
    default:
      return { bgClass: "bg-capacity-facility", hexColor: "#E7F0EB" };
  }
};