import React from 'react';
import { TrendingUp, PiggyBank, CreditCard } from 'lucide-react';
import { useTranslation } from '../../i18n';
import { formatCurrency } from '../../utils/formatters';
import type { MonthlyFlow } from '../../types';

interface FlowSummaryProps {
  flows: MonthlyFlow[];
  lang: 'fr' | 'en';
}

export function FlowSummary({ flows, lang }: FlowSummaryProps) {
  const { t } = useTranslation(lang);
  
  const lastFlow = flows[flows.length - 1];
  const totalPlacementInterest = flows.reduce((sum, flow) => sum + flow.placementInterest, 0);
  const totalCreditInterest = flows.reduce((sum, flow) => sum + flow.creditInterest, 0);
  
  const summaryCards = [
    {
      icon: <PiggyBank className="w-5 h-5 text-blue-600" />,
      label: t('flows.totalPlacementInterest'),
      value: formatCurrency(totalPlacementInterest, lang)
    },
    {
      icon: <CreditCard className="w-5 h-5 text-red-600" />,
      label: t('flows.totalCreditInterest'),
      value: formatCurrency(totalCreditInterest, lang)
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-green-600" />,
      label: t('flows.finalPosition'),
      value: formatCurrency(lastFlow.netPosition, lang)
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {summaryCards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            {card.icon}
            <h4 className="text-sm font-medium text-gray-600">{card.label}</h4>
          </div>
          <p className="text-lg font-semibold text-gray-900">{card.value}</p>
        </div>
      ))}
    </div>
  );
}