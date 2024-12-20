import React, { useState } from 'react';
import { ArrowRight, TrendingUp, Calendar, PiggyBank, BarChart3 } from 'lucide-react';
import type { SimulationParameters, SimulationResult } from '../types';
import { calculateInvestmentResults } from '../utils/financialCalculations';
import { calculateMonthlyFlows } from '../utils/detailedFlowCalculations';
import { Timeline } from './Timeline';
import { FlowDetails } from './FlowDetails';
import { ResultsChart } from './ResultsChart';
import { useTranslation } from '../i18n';
import { formatCurrency, formatPercent } from '../utils/formatters';

interface ResultsSummaryProps {
  parameters: SimulationParameters;
  mode: 'simple' | 'expert';
  lang: 'fr' | 'en';
}

export function ResultsSummary({ parameters, mode, lang }: ResultsSummaryProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'timeline' | 'details'>('summary');
  const { t } = useTranslation(lang);
  
  const results = calculateInvestmentResults(parameters);
  const monthlyFlows = calculateMonthlyFlows(parameters);

  const tabs = [
    { id: 'summary', label: t('results.summary') },
    { id: 'timeline', label: t('results.timeline') },
    { id: 'details', label: t('results.details') }
  ] as const;

  return (
    <div className="space-y-6">
      {/* Results Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard
          icon={<PiggyBank className="w-5 h-5 text-blue-600" />}
          label={t('results.finalCapital')}
          value={formatCurrency(results.finalCapital, lang)}
        />
        <ResultCard
          icon={<TrendingUp className="w-5 h-5 text-green-600" />}
          label={t('results.totalReturn')}
          value={formatPercent(results.totalReturn, lang)}
        />
        <ResultCard
          icon={<BarChart3 className="w-5 h-5 text-purple-600" />}
          label={t('results.cagr')}
          value={formatPercent(results.cagr, lang)}
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-4 border-b border-gray-200">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`
              px-4 py-2 text-sm font-medium transition-colors relative
              ${activeTab === id ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}
            `}
          >
            {label}
            {activeTab === id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === 'summary' && (
          <ResultsChart results={results} lang={lang} />
        )}
        
        {activeTab === 'timeline' && (
          <Timeline 
            events={results.timeline} 
            cycleLength={parameters.cycleDuration}
            lang={lang}
          />
        )}
        
        {activeTab === 'details' && (
          <FlowDetails flows={monthlyFlows} lang={lang} />
        )}
      </div>
    </div>
  );
}

interface ResultCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function ResultCard({ icon, label, value }: ResultCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-sm font-medium text-gray-600">{label}</h3>
      </div>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}