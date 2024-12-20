import { Euro, TrendingUp, Building, PiggyBank, BarChart3 } from 'lucide-react';
import type { SimulationResult } from '../../types';

export function getPhaseConfig(results: SimulationResult, t: (key: string) => string, formatPercent: (value: number, lang: string) => string, lang: 'fr' | 'en') {
  return [
    {
      icon: Euro,
      title: t('investment.phases.initial'),
      amount: results.initialCapital,
      description: t('investment.phases.initialDesc'),
      color: 'bg-blue-500',
      details: [
        t('investment.details.initialCapital'),
        t('investment.details.startDate')
      ]
    },
    {
      icon: TrendingUp,
      title: t('investment.phases.leverage'),
      amount: results.leverageAmount,
      description: t('investment.phases.leverageDesc'),
      color: 'bg-purple-500',
      details: [
        `LTV: ${formatPercent(70, lang)}`,
        t('investment.details.creditAmount')
      ]
    },
    {
      icon: Building,
      title: t('investment.phases.realEstate'),
      amount: results.initialCapital + results.leverageAmount,
      description: t('investment.phases.realEstateDesc'),
      color: 'bg-indigo-500',
      details: [
        t('investment.details.totalInvestment'),
        t('investment.details.properties')
      ]
    },
    {
      icon: PiggyBank,
      title: t('investment.phases.sale'),
      amount: results.finalCapital,
      description: t('investment.phases.saleDesc'),
      color: 'bg-green-500',
      details: [
        `${t('investment.details.margin')}: ${formatPercent(28, lang)}`,
        t('investment.details.saleDate')
      ]
    },
    {
      icon: BarChart3,
      title: t('investment.phases.final'),
      amount: results.finalCapital - results.initialCapital,
      description: t('investment.phases.finalDesc'),
      color: 'bg-emerald-500',
      details: [
        `ROI: ${formatPercent(results.totalReturn, lang)}`,
        `CAGR: ${formatPercent(results.cagr, lang)}`
      ]
    }
  ];
}