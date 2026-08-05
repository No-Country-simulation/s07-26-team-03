import { Container } from "@/shared/components/ui/container/Container";
import { CompanyLogos } from "./components/CompanyLogos";
import { trustedCompanies } from "./trusted-companies.data";

export function TrustedCompanies() {
  return (
    <section
      id="trusted-companies"
      className="
        bg-background
        py-16
      "
    >
      <Container>
        <CompanyLogos
          companies={trustedCompanies}
        />
      </Container>
    </section>
  );
}