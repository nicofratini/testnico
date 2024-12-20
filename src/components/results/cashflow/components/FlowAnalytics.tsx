import React from 'react';
import { TrendingUp, TrendingDown, Activity, Calculator } from 'lucide-react';
import { useTranslation } from '../../../../i18n';
import { formatCurrency } from '../../../../utils/formatters';
import { useFlowAnalytics } from '../hooks/useFlowAnalytics';
import type { CashFlowData } from '../types';

interface FlowAnalyticsProps {
  data: CashFlowData[];
  lang: 'fr' | 'en';
}

export function FlowAnalytics({ data, lang }: FlowAnalyticsProps) {
  const { t } = useTranslation(lang);
  const analytics = useFlowAnalytics(data);

  const metrics = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: t('flows.maxFlow'),
      value: formatCurrency(analytics.maxAmount, lang),
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: <TrendingDown className="w-5 h-5" />,
      label: t('flows.minFlow'),
      value: formatCurrency(analytics.minAmount, lang),
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: <Calculator className="w-5 h-5" />,
      label: t('flows.averageFlow'),
      value: formatCurrency(analytics.averageAmount, lang),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: <Activity className="w-5 h-5" />,
      label: t('flows.volatility'),
      value: formatCurrency(analytics.volatility, lang),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <div 
          key={index}
          className={`${metric.bgColor} rounded-lg p-4 transition-all duration-300 hover:shadow-md`}
        >
          <div className={`flex items-center gap-2 mb-2 ${metric.color}`}>
            {metric.icon}
            <span className="text-sm font-medium text-gray-600">
              {metric.label}
            </span>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            {metric.value}
          </span>
        </div>
      ))}
    </div>
  );
}