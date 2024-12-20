import React from 'react';
import { PiggyBank, TrendingUp, BarChart3, Calculator } from 'lucide-react';
import { useTranslation } from '../../i18n';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { calculateSummaryMetrics } from '../../utils/calculations/investmentMetrics';
import { calculateNewFinalCapital } from '../../utils/calculations/capital/finalCapital';

interface SummaryCardsProps {
  initialCapital: number;
  cycleDuration: number;
  lang: 'fr' | 'en';
}

export function SummaryCards({ initialCapital, cycleDuration, lang }: SummaryCardsProps) {
  const { t } = useTranslation(lang);
  
  // Calcul du nouveau capital final
  const finalCapital = calculateNewFinalCapital();
  
  // Calcul des métriques
  const metrics = calculateSummaryMetrics({
    initialCapital,
    finalCapital,
    cycleDuration,
  });

  const cards = [
    {
      icon: <PiggyBank className="w-6 h-6" />,
      title: t('results.newFinalCapital'),
      value: formatCurrency(metrics.newFinalCapital, lang),
      description: t('results.descriptions.finalCapital'),
      color: 'text-blue-600',
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: t('results.totalGain'),
      value: formatCurrency(metrics.totalGain, lang),
      description: t('results.descriptions.totalGain'),
      color: 'text-green-600',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: t('results.totalReturn'),
      value: formatPercent(metrics.totalReturn, lang),
      description: t('results.descriptions.totalReturn'),
      color: 'text-purple-600',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: t('results.cagr'),
      value: formatPercent(metrics.annualizedReturn, lang),
      description: t('results.descriptions.cagr'),
      color: 'text-indigo-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div 
          key={index}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className={`flex items-center gap-3 mb-4 ${card.color}`}>
            {card.icon}
            <h3 className="text-lg font-medium text-gray-900">
              {card.title}
            </h3>
          </div>
          <p className="text-2xl font-semibold text-gray-900 mb-2">
            {card.value}
          </p>
          <p className="text-sm text-gray-600">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
}