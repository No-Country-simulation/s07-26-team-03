

import { HeroActions } from "./HeroActions";
import { HeroFeatureList } from "./HeroFeatureList";

export function HeroContent() {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        text-center
        lg:items-start
        lg:text-left
      "
    >
      <h1
        className="
          font-extrabold
          leading-tight
          text-white
          text-4xl md:text-4.5xl
        "
      >
        Find your{" "}
        <span className="text-brand-accent">
         Stranded Capacity.
        </span>{" "}
        
      </h1>
      <h2
        className="
          font-extrabold
          leading-tight
          text-white
          text-3xl md:text-4xl
        "
      >
        Unlock your  {" "}
        <span className="text-brand-accent">
          potential.
        </span>{" "}
        
      </h2>

      <p  
        className="
          mt-6
          w-full
          text-surface
        "
      >
        CapacityIQ helps data center operator uncover hidden wastes, quantify financial impact, and find opportunities to optimize.
      </p>

      <div className="mt-10 w-full">
        <HeroFeatureList />
      </div>

      <div className="mt-10">
        <HeroActions />
      </div>
    </div>
  );
}