

import heroDashboard from "@/assets/heroDashboard.webp";


import { HeroIllustration } from "./components/HeroIllustration";
import { Container } from "@/shared/components/ui/container/Container";
import { HeroContent } from "./components/hero-content/HeroContent";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-16 pt-12 pb-24 lg:pt-20"
    >
      <Container >
        <div
          className="
            grid
            items-center
            gap-20
            lg:grid-cols-2
          "
        >
          <HeroContent />

          <div className="relative flex justify-center lg:justify-end">
            <HeroIllustration
              image={heroDashboard}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}