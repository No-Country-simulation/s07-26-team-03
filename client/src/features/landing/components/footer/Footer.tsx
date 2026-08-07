

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
        pt-20
        pb-10
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
              gap-10
              lg:flex-row
              lg:items-start
              lg:justify-between
            "
          >
            <div className="space-y-8">
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