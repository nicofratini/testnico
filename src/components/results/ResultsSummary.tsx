import React from 'react';
import { TrendingUp, Calculator, BarChart3, DollarSign } from 'lucide-react';
import { useTranslation } from '../../i18n';
import type { SimulationResult } from '../../types';
import { ResultCard } from './ResultCard';
import { CashFlowTimeline } from './cashflow/CashFlowTimeline';
import { generateCashFlowData } from './cashflow/utils/generateCashFlowData';
import { formatCurrency, formatPercent } from '../../utils/formatters';

interface ResultsSummaryProps {
  results: SimulationResult;
  lang: 'fr' | 'en';
}

export function ResultsSummary({ results, lang }: ResultsSummaryProps) {
  const { t } = useTranslation(lang);
  const gain = results.finalCapital - results.initialCapital;
  const cashFlowData = generateCashFlowData(results);

  const cards = [
    {
      icon: <Calculator className="w-5 h-5" />,
      label: t('results.newFinalCapital'),
      value: formatCurrency(results.finalCapital, lang),
      description: t('results.newFinalCapitalDesc'),
      color: '#10B981'
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      label: t('results.gain'),
      value: formatCurrency(gain, lang),
      description: t('results.gainDesc'),
      color: '#F59E0B'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: t('results.totalReturn'),
      value: formatPercent(results.totalReturn, lang),
      description: t('results.totalReturnDesc'),
      color: '#28A745'
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: t('results.cagr'),
      value: formatPercent(results.cagr, lang),
      description: t('results.cagrDesc'),
      color: '#6F42C1'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <ResultCard key={index} {...card} />
        ))}
      </div>
      <CashFlowTimeline data={cashFlowData} lang={lang} />
    </div>
  );
}