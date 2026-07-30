import icon from "@/assets/icons/icon.svg";
import reloj from "@/assets/icons/reloj.svg";
import candado from "@/assets/icons/candado.svg";
import grafico from "@/assets/icons/grafico.svg";
import auriculares from "@/assets/icons/auriculares.svg";

export default function Sidebar() {
    const handleHelp = () => {
        alert("Sección en proceso...");
    };

    return (
        <aside className="flex w-[380px] flex-col bg-surface px-10 py-10">
            <div className="flex items-center gap-3">
                <img
                    src={icon}
                    alt="Capacity IQ"
                    className="h-12 w-12 object-contain"
                />

                <div className="flex items-end">
                    <span className="font-logo text-2xl font-bold text-brand-primary">
                        Capacity
                    </span>

                    <span className="ml-1 font-logo text-2xl font-bold text-[#C5922C]">
                        IQ
                    </span>

                    <span className="mb-1 ml-2 font-body text-sm text-text">
                        by Datacenter
                    </span>
                </div>

            </div>

            <div className="mt-16">
                <h2 className="font-heading text-[32px] leading-[110%] font-semibold text-heading">
                    Let&apos;s assess your data center
                </h2>

                <p className="mt-5 font-body text-base leading-[140%] text-text">
                    Commodo in viverra nunc, ullamcorper ut. Non, amet, aliquet
                    scelerisque nullam sagittis, pulvinar.
                </p>
            </div>

            <div className="mt-12 flex flex-col gap-8">
                <div className="flex items-start gap-4">
                    <img
                        src={reloj}
                        alt=""
                        className="mt-1 h-10 w-10 object-contain"
                    />

                    <div>
                        <h3 className="font-heading text-base font-medium leading-[110%] text-text">
                            Takes less than 3 minutes
                        </h3>

                        <p className="mt-2 font-body text-base leading-[140%] text-placeholder">
                            Quick and easy assessment
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <img
                        src={candado}
                        alt=""
                        className="mt-1 h-10 w-10 object-contain"
                    />

                    <div>
                        <h3 className="font-heading text-base font-medium leading-[110%] text-text">
                            No sign-up required
                        </h3>

                        <p className="mt-2 font-body text-base leading-[140%] text-placeholder">
                            Get instant basic results
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <img
                        src={grafico}
                        alt=""
                        className="mt-1 h-10 w-10 object-contain"
                    />

                    <div>
                        <h3 className="font-heading text-base font-medium leading-[110%] text-text">
                            Actionable Insights
                        </h3>

                        <p className="mt-2 font-body text-base leading-[140%] text-placeholder">
                            Understand your efficiency potential
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-auto">
                <button
                    type="button"
                    onClick={handleHelp}
                    className="flex w-full items-center justify-between p-0 text-left transition-opacity hover:opacity-80"
                >
                    <div className="text-left">
                        <h4 className="font-heading text-base font-bold leading-[115%] text-[#170F49]">
                            Need a help?
                        </h4>

                        <p className="mt-2 font-body text-sm text-[#6F6C8F]">
                            Chat with live support
                        </p>
                    </div>

                    <img
                        src={auriculares}
                        alt=""
                        className="h-12 w-12 object-contain"
                    />
                </button>
            </div>
        </aside>
    );
}
