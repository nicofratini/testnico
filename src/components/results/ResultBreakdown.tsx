import React from 'react';
import { useTranslation } from '../../i18n';
import { formatCurrency } from '../../utils/formatters';
import { getInitialCapital } from '../../utils/calculations/capital/initialCapital';
import { calculatePlacementInterest } from '../../utils/calculations/capital/placementInterest';
import { calculateLeverageAmount } from '../../utils/calculations/leverage/leverageAmount';
import { calculateRealEstateProfit } from '../../utils/calculations/leverage/profitCalculator';

interface ResultBreakdownProps {
  lang: 'fr' | 'en';
}

export function ResultBreakdown({ lang }: ResultBreakdownProps) {
  const { t } = useTranslation(lang);
  
  const initialCapital = getInitialCapital();
  const placementInterest = calculatePlacementInterest(initialCapital);
  const leverageAmount = calculateLeverageAmount(initialCapital);
  const { grossProfit, creditCost, netProfit } = calculateRealEstateProfit(leverageAmount);
  const finalCapital = initialCapital + placementInterest + netProfit;

  const breakdownItems = [
    { label: t('results.breakdown.initialCapital'), value: initialCapital },
    { label: t('results.breakdown.placementInterest'), value: placementInterest },
    { label: t('results.breakdown.grossProfit'), value: grossProfit },
    { label: t('results.breakdown.creditCost'), value: -creditCost },
    { label: t('results.breakdown.netProfit'), value: netProfit },
    { label: t('results.breakdown.finalCapital'), value: finalCapital }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {t('results.breakdown.title')}
      </h3>
      <div className="space-y-3">
        {breakdownItems.map((item, index) => (
          <div 
            key={index}
            className="flex justify-between items-center py-2 border-b last:border-0"
          >
            <span className="text-gray-600">{item.label}</span>
            <span className={`font-medium ${
              item.value < 0 ? 'text-red-600' : 'text-gray-900'
            }`}>
              {formatCurrency(item.value, lang)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}