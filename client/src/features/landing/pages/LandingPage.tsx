import { GradientSection } from "../components/gradient-section/GradientSection"
import { AdvancedAnalysis } from "../components/sections/advanced-analysis"
import { BenefitsSection } from "../components/sections/benefits/Benefits"
import { Hero } from "../components/sections/hero/Hero"
import { HowItWorks } from "../components/sections/how-it-works"

const LandingPage = () => {
  return (
    <>
      <GradientSection>
        <Hero />
      </GradientSection>
                
      <BenefitsSection  />
      <HowItWorks />
      <AdvancedAnalysis  />
    </>
  )
}

export default LandingPage