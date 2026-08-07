import { SectionHeader } from "@/shared/components/headers/section-header";
import { Container } from "@/shared/components/ui/container/Container";
import { howItWorksContent } from "./how-it-works.data";
import { HowItWorksSteps } from "./components/HowItWorksSteps";

export function HowItWorks() {
  return (
  <section id="how-it-works" className="py-16 md:py-20 lg:py-24 px-4 md:px-8 bg-brand-primary-100">
      <Container>
        <div
          className="
            grid
            gap-20
            xl:grid-cols-[450px_1fr]
            xl:items-start
          "
        >
          <SectionHeader
            align="left"
            badge={howItWorksContent.badge}
            title={howItWorksContent.title}
            description={howItWorksContent.description}
          />

          <HowItWorksSteps />
        </div>
      </Container>
    </section>
  );
}