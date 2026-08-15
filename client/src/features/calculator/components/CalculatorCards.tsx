import React from 'react';
import { CARDS_DATA } from '../../../shared/constants/calculatorCards';

export const CalculatorCards: React.FC = () => {
  return (
  
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_auto_auto_1fr] gap-4 w-full items-stretch">
      {CARDS_DATA.map((card) => (
        <div
          key={card.id}
          className="p-5 bg-white rounded-[6px] shadow-[4px_4px_4px_rgba(177,177,177,0.15)] flex items-start gap-3 transition-all duration-200 h-full min-w-0"
        >
          <div className="flex-shrink-0 flex items-center justify-center">
            <img 
              src={card.icon} 
              alt={card.title} 
              className="w-12 h-12 object-contain filter drop-shadow-[0_1.17px_1.17px_rgba(14,106,55,0.25)]"
            />
          </div>

          <div className="flex flex-col flex-grow min-w-0 justify-between gap-2 h-full">
          
            <span className="text-base font-normal text-heading leading-snug whitespace-nowrap">
              {card.title}
            </span>

            <div className="flex items-baseline gap-2 mt-1">
              <span className={`text-2xl font-bold whitespace-nowrap leading-none ${card.valueColorClass}`}>
                {card.value}
              </span>
            </div>

            <div className="flex items-center justify-between mt-1 w-full gap-2 min-w-0">
              {card.subtitle && (
                <span className="text-base font-normal text-text-muted whitespace-nowrap leading-tight">
                  {card.subtitle}
                </span>
              )}

              {card.tag && card.id === 1 && (
                <span className={`${card.tag.className} inline-block px-2.5 py-0.5 text-xs whitespace-nowrap`}>
                  {card.tag.text}
                </span>
              )}
            </div>

            {card.tag && card.id === 3 && (
              <span className={`${card.tag.className} inline-block self-start px-2.5 py-0.5 text-xs whitespace-nowrap`}>
                {card.tag.text}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalculatorCards;