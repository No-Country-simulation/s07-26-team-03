import React from "react";
import candadoIcon from "@/assets/icons/padlock.png";
import { LuArrowDown, LuArrowUp } from "react-icons/lu";

export const ScenarioComparisonCard: React.FC = () => {
  return (
    <div className="flex w-full min-w-0 min-h-[580px] flex-col justify-between gap-5 rounded-lg bg-surface py-6 px-0 shadow-[4px_4px_4px_rgba(177,177,177,0.15)] font-body">
      <div className="flex w-full flex-col justify-between gap-3 sm:flex-row sm:items-center px-4">
        <div className="flex flex-col gap-0.5 min-w-0">
          <h2 className="font-heading text-[17px] font-bold text-heading leading-tight md:text-[18px]">
            Scenario Comparison
          </h2>
          <p className="font-body text-sm text-text-muted font-normal md:text-base">
            Side by side comparison With Current State
          </p>
        </div>
      </div>

      <div className="px-4 w-full flex-1 overflow-x-auto">
        <table className="w-full border-collapse font-body text-sm font-normal">
          <thead>
            <tr>
              <th className="bg-surface p-3 text-left border-none"></th>
              <th className="bg-brand-primary-200 p-3 text-center rounded-t-[12px] font-normal">
                <div className="font-medium text-brand-primary-500">Current State</div>
                <div className="text-xs font-normal text-placeholder">(Baseline)</div>
              </th>
              <th className="bg-brand-primary-200 p-3 text-center rounded-t-[12px] font-normal">
                <div className="font-medium text-info">Selected Scenario 1</div>
                <div className="text-xs font-normal text-placeholder">(Optimize Cooling)</div>
              </th>
              <th className="bg-brand-primary-200 p-3 text-center rounded-t-[12px] font-medium text-heading">
                Improvement
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-surface">
              <td className="p-3 font-medium text-text">Facility</td>
              <td className="p-3 text-center font-normal text-text">7.5 MV</td>
              <td className="p-3 text-center font-normal text-text">7.5 MV</td>
              <td className="p-3 text-center font-normal text-text">-</td>
            </tr>

            <tr className="bg-brand-primary-200">
              <td className="p-3 font-medium text-text">% Utilization</td>
              <td className="p-3 text-center font-normal text-text">60%</td>
              <td className="p-3 text-center font-normal text-text">60%</td>
              <td className="p-3 text-center font-normal text-text">-</td>
            </tr>

            <tr className="bg-surface">
              <td className="p-3 font-medium text-text">Cooling Type</td>
              <td className="p-3 text-center font-normal text-text">AIR COOLING</td>
              <td className="p-3 text-center font-normal text-text">LIQUID COOLING</td>
              <td className="p-3 text-center font-normal text-text">-</td>
            </tr>

            <tr className="bg-brand-primary-200">
              <td className="p-3 font-medium text-text">Stranded Capacity</td>
              <td className="p-3 text-center">
                <div className="font-normal text-text">62%</div>
                <div className="text-xs font-normal text-placeholder">6.2 MV</div>
              </td>
              <td className="p-3 text-center">
                <div className="font-normal text-text">38%</div>
                <div className="text-xs font-normal text-placeholder">3.8 MV</div>
              </td>
              <td className="p-3 text-center">
                <div className="flex items-center justify-center gap-1 font-normal text-brand-primary-500">
                  <LuArrowDown className="h-4 w-4 shrink-0 stroke-[2.5]" />
                  <span>24 pp</span>
                </div>
                <div className="text-xs font-normal text-placeholder">2.4 MV losses</div>
              </td>
            </tr>

            <tr className="bg-surface">
              <td className="p-3 font-medium text-text">Annual Financial Loss</td>
              <td className="p-3 text-center">
                <div className="font-normal text-text">$ 1.24M - $1.66M</div>
                <div className="text-xs font-normal text-placeholder">USD per year</div>
              </td>
              <td className="p-3 text-center">
                <div className="font-normal text-text">$ 0.76M - $1.04M</div>
                <div className="text-xs font-normal text-placeholder">USD per year</div>
              </td>
              <td className="p-3 text-center">
                <div className="flex items-center justify-center gap-1 font-normal text-brand-primary-500">
                  <LuArrowDown className="h-4 w-4 shrink-0 stroke-[2.5]" />
                  <span>$0.48M -$0.64M</span>
                </div>
                <div className="text-xs font-normal text-placeholder">Annual saving</div>
              </td>
            </tr>

            <tr className="bg-brand-primary-200">
              <td className="p-3 font-medium text-text">Capacity Score</td>
              <td className="p-3 text-center">
                <div className="font-normal text-text">B-</div>
                <div className="text-xs font-normal text-placeholder">Moderate</div>
              </td>
              <td className="p-3 text-center">
                <div className="font-normal text-text">B+</div>
                <div className="text-xs font-normal text-placeholder">Good</div>
              </td>
              <td className="p-3 text-center">
                <div className="flex items-center justify-center gap-1 font-normal text-brand-primary-500">
                  <LuArrowUp className="h-4 w-4 shrink-0 stroke-[2.5]" />
                  <span>1 grade</span>
                </div>
                <div className="text-xs font-normal text-placeholder">Score improvement</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mx-4 flex items-center gap-3 rounded-[10px] bg-brand-primary-100 p-4 text-heading font-body">
        <img
          src={candadoIcon}
          alt="Candado Insight"
          className="h-9 w-9 shrink-0 object-contain"
        />

        <p className="text-xs leading-snug md:text-sm font-normal">
          <span className="font-medium">Key Insight:</span> Your biggest opportunity lies in IT inneficiencies. Right-sizing your infraestruture and optimizing server utilization could recover up to 3.0 MV capacity.
        </p>
      </div>
    </div>
  );
};