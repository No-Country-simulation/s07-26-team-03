import type { ProgressBarProps } from "@shared/types/Progressbar.types";

export default function ProgressBar({
    title = "Fine tune your capacity(MW)",
    startValue = 5,
    activeValue = 7.5,
    endValue = 10,
    dolarSign = false,
    unit = "MW",
    toggle = false,
    className = "",
    onChange,
}: ProgressBarProps) {
    const range = endValue - startValue;

    const activePercentage =
        range > 0
            ? Math.min(
                  Math.max(((activeValue - startValue) / range) * 100, 0),
                  100
              )
            : 50;

    const handleSliderChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const val = parseFloat(e.target.value);

        if (onChange) {
            onChange(val);
        }
    };

    return (
        <div className="w-full">
            <p className="mb-4 font-heading text-base font-semibold text-heading dark:text-[#f4faf6d1]">
                {title}
            </p>

            {/* Contenedor de la barra */}
            <div className="relative w-full pt-9">
                
                {/* Active value - POR ENCIMA de la barra */}
                {toggle && (
                    <div
                        className="absolute top-0 z-10 -translate-x-1/2"
                        style={{
                            left: `${activePercentage}%`,
                        }}
                    >
                        <div className="flex flex-col items-center">
                            
                            {/* Label */}
                            <div className="whitespace-nowrap rounded-[3px] bg-[#74A98D] dark:bg-[#0E6A37] px-2 py-1 text-[13px] font-semibold leading-none text-white">
                                {dolarSign && "$"}
                                {activeValue} {unit}
                            </div>

                            {/* Línea vertical */}
                            <div className="h-[8px] w-[1px] bg-[#197044]" />

                            {/* Punto */}
                            <div className="h-[12px] w-[12px] rounded-full bg-[#197044]" />

                            <span className="mt-[12px] whitespace-nowrap text-[10px] font-medium text-[#197044]">
                                Most likely
                            </span>
                        </div>
                    </div>
                )}

                {/* Barra */}
                <div className="relative h-2 w-full rounded-full bg-[#E5E7EB] dark:bg-[#252525]">
                    {/* Progreso */}
                    <div
                        className="absolute left-0 top-0 h-full rounded-full bg-[#0E6A37] transition-all duration-150"
                        style={{
                            width: `${activePercentage}%`,
                        }}
                    />

                    {/* Thumb */}
                    <div
                        className="absolute top-1 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0E6A37] bg-[#0E6A37] shadow-[inset_0px_-1.17px_1.17px_rgba(14,106,55,0.25)] transition-all duration-150"
                        style={{
                            left: `${activePercentage}%`,
                        }}
                    />
                </div>

                {/* Input invisible */}
                <input
                    type="range"
                    min={startValue}
                    max={endValue}
                    step={(endValue - startValue) / 100}
                    value={activeValue}
                    onChange={handleSliderChange}
                    className={`${className} absolute left-0 top-9 z-20 h-2 w-full opacity-0`}
                />

                {/* Valores mínimo y máximo */}
                <div className="relative mt-3 flex w-full items-center justify-between text-xs font-medium text-[#9CA3AF]">
                    <span>
                        {dolarSign && "$"} {startValue} {unit}
                    </span>

                    {!toggle && (
                        <span
                            className="absolute top-2 -translate-x-1/2 whitespace-nowrap font-semibold text-[#0E6A37] transition-all duration-150"
                            style={{
                                left: `${activePercentage}%`,
                            }}
                        >
                            {dolarSign && "$"} {activeValue} {unit}
                        </span>
                    )}

                    <span>
                        {dolarSign && "$"}
                        {endValue} {unit}
                    </span>
                </div>
            </div>
        </div>
    );
}