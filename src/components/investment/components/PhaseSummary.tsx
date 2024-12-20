import React from 'react';
import { ArrowRight } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../../utils/formatters';
import type { SimulationResult } from '../../../types';
import { useTranslation } from '../../../i18n';

interface PhaseSummaryProps {
  results: SimulationResult;
  lang: 'fr' | 'en';
}

export function PhaseSummary({ results, lang }: PhaseSummaryProps) {
  const { t } = useTranslation(lang);

  const metrics = [
    {
      label: t('investment.metrics.ltv'),
      value: formatPercent(70, lang)
    },
    {
      label: t('investment.metrics.margin'),
      value: formatPercent(28, lang)
    },
    {
      label: t('investment.metrics.roi'),
      value: formatPercent(results.totalReturn, lang)
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-gray-50 rounded-xl p-4">
          <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
          <div className="text-xl font-semibold text-gray-900">{metric.value}</div>
        </div>
      ))}
    </div>
  );
}