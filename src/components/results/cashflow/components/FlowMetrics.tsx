import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useTranslation } from '../../../../i18n';
import { formatCurrency, formatPercent } from '../../../../utils/formatters';
import type { CashFlowData } from '../types';

interface FlowMetricsProps {
  data: CashFlowData[];
  lang: 'fr' | 'en';
}

export function FlowMetrics({ data, lang }: FlowMetricsProps) {
  const { t } = useTranslation(lang);

  const metrics = React.useMemo(() => {
    const amounts = data.map(flow => flow.amount);
    const totalFlow = amounts.reduce((sum, amount) => sum + amount, 0);
    const averageFlow = totalFlow / amounts.length;
    const variance = amounts.reduce((sum, amount) => 
      sum + Math.pow(amount - averageFlow, 2), 0
    ) / amounts.length;
    
    return {
      totalFlow,
      averageFlow,
      volatility: Math.sqrt(variance),
      maxFlow: Math.max(...amounts),
      minFlow: Math.min(...amounts)
    };
  }, [data]);

  const cards = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: t('flows.totalFlow'),
      value: formatCurrency(metrics.totalFlow, lang),
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: <Activity className="w-5 h-5" />,
      label: t('flows.averageFlow'),
      value: formatCurrency(metrics.averageFlow, lang),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: <TrendingDown className="w-5 h-5" />,
      label: t('flows.volatility'),
      value: formatPercent(metrics.volatility / Math.abs(metrics.averageFlow), lang),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards.map((card, index) => (
        <div 
          key={index}
          className={`${card.bgColor} rounded-lg p-4 transition-all duration-300 hover:shadow-md`}
        >
          <div className={`flex items-center gap-2 mb-2 ${card.color}`}>
            {card.icon}
            <span className="text-sm font-medium text-gray-600">
              {card.label}
            </span>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            {card.value}
          </span>
        </div>
      ))}
    </div>
  );
}