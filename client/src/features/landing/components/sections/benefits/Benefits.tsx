import { Container } from '@/shared/components/ui/container/Container'
import { BenefitsGrid } from './components/BenefitsGrid'
import { benefitsContent } from './benefits.data'
import { SectionHeader } from '@/shared/components/headers/section-header'
import clsx from 'clsx'

export interface BenefitsSectionProps {
  className?: string;
}

export const BenefitsSection = ({ className }: BenefitsSectionProps) => {
  return (
    <section className={clsx(
      'py-16 md:py-20 lg:py-24 px-4 md:px-8 bg-white',
      className
    )}>
        <Container className='mx-auto'>
            <div className="flex flex-col items-center space-y-12 md:space-y-16">
                    <SectionHeader
                    badge={benefitsContent.badge}
                    title={benefitsContent.title}
                    description={benefitsContent.description}
                />
                <BenefitsGrid/>
            </div>

        </Container>

</section>
  )
}
