import React from 'react';
import { TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { useTranslation } from '../../../../i18n';
import { formatCurrency } from '../../../../utils/formatters';
import type { CashFlowData } from '../types';

interface CashFlowSummaryProps {
  data: CashFlowData[];
  lang: 'fr' | 'en';
}

export function CashFlowSummary({ data, lang }: CashFlowSummaryProps) {
  const { t } = useTranslation(lang);

  const totalInflow = data.reduce((sum, item) => 
    item.amount > 0 ? sum + item.amount : sum, 0
  );
  
  const totalOutflow = data.reduce((sum, item) => 
    item.amount < 0 ? sum + Math.abs(item.amount) : sum, 0
  );

  const netFlow = totalInflow - totalOutflow;

  const summaryItems = [
    {
      icon: <TrendingUp className="w-5 h-5 text-green-600" />,
      label: t('flows.totalInflow'),
      value: formatCurrency(totalInflow, lang),
      bgColor: 'bg-green-50'
    },
    {
      icon: <TrendingDown className="w-5 h-5 text-red-600" />,
      label: t('flows.totalOutflow'),
      value: formatCurrency(totalOutflow, lang),
      bgColor: 'bg-red-50'
    },
    {
      icon: <PiggyBank className="w-5 h-5 text-blue-600" />,
      label: t('flows.netFlow'),
      value: formatCurrency(netFlow, lang),
      bgColor: 'bg-blue-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {summaryItems.map((item, index) => (
        <div 
          key={index} 
          className={`${item.bgColor} rounded-lg p-4 transition-all duration-300 hover:shadow-md`}
        >
          <div className="flex items-center gap-2 mb-2">
            {item.icon}
            <span className="text-sm font-medium text-gray-600">
              {item.label}
            </span>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}