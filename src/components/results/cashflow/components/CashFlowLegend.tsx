import React from 'react';
import { useTranslation } from '../../../../i18n';

interface CashFlowLegendProps {
  lang: 'fr' | 'en';
}

export function CashFlowLegend({ lang }: CashFlowLegendProps) {
  const { t } = useTranslation(lang);

  const legendItems = [
    { color: '#3B82F6', label: t('timeline.funding') },
    { color: '#10B981', label: t('timeline.sale') },
    { color: '#8B5CF6', label: t('flows.placementInterest') },
    { color: '#EF4444', label: t('flows.creditInterest') }
  ];

  return (
    <div className="flex flex-wrap gap-4 mt-4 justify-center">
      {legendItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: item.color }} 
          />
          <span className="text-sm text-gray-600">{item.label}</span>
        </div>
      ))}
    </div>
  );
}