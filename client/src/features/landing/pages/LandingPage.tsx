import { GradientSection } from "../components/gradient-section/GradientSection"
import { AdvancedAnalysis } from "../components/sections/advanced-analysis"
import { BenefitsSection } from "../components/sections/benefits/Benefits"
import { Hero } from "../components/sections/hero/Hero"
import { HowItWorks } from "../components/sections/how-it-works"
import { TrustedCompanies } from "../components/sections/trusted-companies"
import { Testimonials } from "../components/sections/testimonials/Testimonials"

const LandingPage = () => {
  return (
    <>
      <GradientSection>
        <Hero />
      </GradientSection>
                
      <BenefitsSection  />
      <HowItWorks />
      <AdvancedAnalysis  />
      <Testimonials />
      <TrustedCompanies />

    </>
  )
}

export default LandingPage