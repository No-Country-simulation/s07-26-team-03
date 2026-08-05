import { GradientSection } from "../components/gradient-section/GradientSection"
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
    </>
  )
}

export default LandingPage