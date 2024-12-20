import React from 'react';
import { Timeline } from './timeline/Timeline';
import { Euro, Building, PiggyBank, BarChart3 } from 'lucide-react';
import { useTranslation } from '../i18n';
import type { SimulationResult } from '../types';

interface InvestmentTimelineProps {
  results: SimulationResult;
  lang: 'fr' | 'en';
}

export function InvestmentTimeline({ results, lang }: InvestmentTimelineProps) {
  const { t } = useTranslation(lang);

  const phases = [
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
        `${t('investment.details.margin')}: ${(results.saleMargin).toFixed(1)}%`,
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
        `ROI: ${results.totalReturn.toFixed(1)}%`,
        `CAGR: ${results.cagr.toFixed(1)}%`
      ]
    }
  ];

  return (
    <div className="mt-8">
      <Timeline phases={phases} lang={lang} />
    </div>
  );
}