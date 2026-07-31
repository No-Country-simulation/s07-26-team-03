import type { ProgressBarProps } from "../../types/Progressbar.types";

export default function ProgressBar({
    title = "Fine tune your capacity(MW)",
    startValue = 5,
    activeValue = 7.5,
    endValue = 10,
    unit = "MW",
    onChange,
}: ProgressBarProps) {
    const range = endValue - startValue;
    const activePercentage =
        range > 0
            ? Math.min(Math.max(((activeValue - startValue) / range) * 100, 0), 100)
            : 50;

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        if (onChange) onChange(val);
    };

    return (
        <div className="w-full">
            <p className="font-heading text-base font-semibold text-heading mb-4">
                {title}
            </p>

            <div className="relative w-full">
                <div className="relative h-2 w-full rounded-full bg-[#E5E7EB]">
                    <div
                        className="absolute left-0 top-0 h-full rounded-full bg-[#0E6A37] transition-all duration-150"
                        style={{ width: `${activePercentage}%` }}
                    />

                    <div
                        className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0E6A37] bg-[#0E6A37] shadow-[inset_0px_-1.17px_1.17px_rgba(14,106,55,0.25)] transition-all duration-150"
                        style={{ left: `${activePercentage}%` }}
                    />
                </div>

                <input
                    type="range"
                    min={startValue}
                    max={endValue}
                    step={(endValue - startValue) / 100}
                    value={activeValue}
                    onChange={handleSliderChange}
                    className="absolute top-0 left-0 z-20 h-2 w-full cursor-pointer opacity-0"
                />

                <div className="relative mt-3 flex w-full items-center justify-between text-xs font-medium text-[#9CA3AF]">
                    <span>
                        {startValue} {unit}
                    </span>

                    <span
                        className="absolute font-semibold text-[#0E6A37] transition-all duration-150"
                        style={{
                            left: `${activePercentage}%`,
                            transform: "translateX(-50%)",
                        }}
                    >
                        {activeValue} {unit}
                    </span>

                    <span>
                        {endValue} {unit}
                    </span>
                </div>
            </div>
        </div>
    );
}