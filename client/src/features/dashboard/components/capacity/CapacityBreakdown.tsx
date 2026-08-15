import React from "react";
import { getMetricCardTheme } from "../../utils/capacityTheme";
import {
  BREAKDOWN_CARDS_DATA,
  BREAKDOWN_TABLE_DATA,
} from "@/shared/constants/capacityBreakdown.constants";
import { CapacityLegend } from "./CapacityLegend";

export const CapacityBreakdown: React.FC = () => {
  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12 items-start">
    
        <div className="flex flex-col items-center gap-1 lg:col-span-4">
          {BREAKDOWN_CARDS_DATA.map((card, index) => {
            const isLast = index === BREAKDOWN_CARDS_DATA.length - 1;
            const { bgClass } = getMetricCardTheme(card.id);
            const isItLayer = card.id === "it-layer-capacity";

            return (
              <React.Fragment key={card.id}>
                <div
                  className={`w-full p-3.5 flex flex-col justify-between ${bgClass} rounded-md`}
                >
                  <div className="flex items-center justify-between gap-2">
                  
                    <span
                      className={`font-heading uppercase tracking-wider mt-1 ${card.textColor} ${
                        isItLayer ? "text-[10px] sm:text-xs font-medium" : "text-xs font-medium"
                      }`}
                    >
                      {card.title}
                    </span>
                    <span
                      className={`font-body font-bold text-heading whitespace-nowrap ${
                        isItLayer ? "text-sm" : "text-base"
                      }`}
                    >
                      {card.value}
                    </span>
                  </div>
                  <div className="flex justify-end items-center mt-1">
                    <span
                      className={`font-heading uppercase tracking-wider ${card.textColor} ${
                        isItLayer ? "text-sm font-semibold" : "text-xs font-medium"
                      }`}
                    >
                      {card.subtitle}
                    </span>
                  </div>
                </div>

                {!isLast && (
                  <div className="flex justify-center items-center h-[40px] w-full">
                    <svg
                      width="12"
                      height="40"
                      viewBox="0 0 12 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 h-full"
                    >
                      <path
                        d="M6 0V38M6 38L1 33M6 38L11 33"
                        stroke="#E5E7EB"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        
        <div className="flex flex-col gap-6 lg:col-span-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full bg-white p-6 rounded-lg">
            <div className="flex items-center justify-center min-h-[140px] text-center text-sm font-medium text-text-muted md:col-span-5">
              cargando grafico circular...
            </div>
            <div className="flex items-center md:col-span-7">
              <CapacityLegend />
            </div>
          </div>

          <div className="w-full overflow-x-auto rounded-lg border border-[#E6E6E6] bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E6E6E6] bg-[#F8F9FA] font-heading text-xs font-bold text-heading">
                  <th className="px-2 py-2.5 whitespace-nowrap w-1">Layer</th>
                  <th className="px-2 py-2.5 whitespace-nowrap text-right">Input(MV)</th>
                  <th className="px-2 py-2.5 whitespace-nowrap text-right">Output(MV)</th>
                  <th className="px-2 py-2.5 whitespace-nowrap text-right">Loss(MV)</th>
                  <th className="px-2 py-2.5 whitespace-nowrap text-right">Loss(%)</th>
                  <th className="px-2 py-2.5 whitespace-nowrap text-center">Efficiency</th>
                  <th className="px-2 py-2.5 whitespace-nowrap">Key Factors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E6E6] font-body text-xs">
                {BREAKDOWN_TABLE_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-2 py-2.5 font-normal text-text-muted whitespace-nowrap w-1">
                      {row.layer}
                    </td>
                    <td className="px-2 py-2.5 text-right font-normal text-text-muted">
                      {row.input}
                    </td>
                    <td className="px-2 py-2.5 text-right font-normal text-text-muted">
                      {row.output}
                    </td>
                    <td className="px-2 py-2.5 text-right font-normal text-text-muted">
                      {row.loss}
                    </td>
                    <td className="px-2 py-2.5 text-right font-normal text-text-muted">
                      {row.lossPct}
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      <span className="inline-block rounded-md bg-[#FEF2F2] px-2 py-0.5 text-xs font-normal text-red-600">
                        {row.efficiency}
                      </span>
                    </td>
                    <td className="px-2 py-2.5">
                      <ul className="list-disc list-inside space-y-0.5 text-text-muted whitespace-nowrap">
                        {row.factors.map((factor, fIdx) => (
                          <li key={fIdx} className="font-normal text-text-muted">
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};