import healthIcon from '../../assets/icons/healt.svg';
import dinnerIcon from '../../assets/icons/dinner.svg';
import startIcon from '../../assets/icons/start.svg';
import type { CardData } from '../types/calculator';

export const CARDS_DATA: CardData[] = [
  {
    id: 1,
    icon: healthIcon,
    title: 'Stranded Capacity',
    value: '62%',
    valueColorClass: 'text-success font-bold',
    subtitle: '6.2MV',
    tag: {
      text: 'High',
      className: 'px-2 py-0.5 text-xs font-semibold text-error bg-error-bg rounded-[6px] ml-auto',
    },
  },
  {
    id: 2,
    icon: dinnerIcon,
    title: 'Annual Financial Loss',
    value: '$1.24 - 1.68M',
    valueColorClass: 'text-warning font-bold',
    subtitle: 'USD per year',
  },
  {
    id: 3,
    icon: startIcon,
    title: 'Capacity Score',
    value: 'B-',
    valueColorClass: 'text-error font-bold',
    subtitle: '',
    tag: {
      text: 'Moderate',
      className: 'px-2 py-0.5 text-xs font-semibold text-error bg-error-bg rounded-[6px] w-max mt-0.5',
    },
  },
  {
    id: 4,
    icon: dinnerIcon,
    title: 'Total Capacity',
    value: '10.0 MV',
    valueColorClass: 'text-warning font-bold',
    subtitle: 'Installed capacity',
  },
];