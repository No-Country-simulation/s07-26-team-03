

import { Container } from "@/shared/components/ui/container/Container";
import { FooterBottom } from "./components/FooterBottom";
import { FooterBrand } from "./components/FooterBrand";
import { FooterNavigation } from "./components/FooterNavigation";
import { FooterSocial } from "./components/FooterSocial";

export function Footer() {
  return (
    <footer
      className="
        bg-layout-gradient
        pt-6
        pb-6
        lg:pt-20
        lg:pb-10
        text-surface
      "
    >
      <Container>
        <div
          className="
            flex
            flex-col
            gap-12
          "
        >
          {/* Top */}

          <div
            className="
              flex
              flex-col
              lg:gap-10
              lg:flex-row
              lg:items-start
              lg:justify-between
            "
          >
            <div className="space-y-4 lg:space-y-8">
              <FooterBrand />

              <FooterNavigation />
            </div>

            <FooterSocial />
          </div>

          <FooterBottom />
        </div>
      </Container>
    </footer>
  );
}