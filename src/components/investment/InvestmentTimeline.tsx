import React, { useState } from 'react';
import { useTranslation } from '../../i18n';
import { TimelineContainer } from './components/timeline/TimelineContainer';
import { PhaseDetails } from './components/details/PhaseDetails';
import { MetricsSummary } from './components/metrics/MetricsSummary';
import { usePhases } from './hooks/usePhases';
import type { SimulationResult } from '../../types';

interface InvestmentTimelineProps {
  results: SimulationResult;
  lang: 'fr' | 'en';
}

export function InvestmentTimeline({ results, lang }: InvestmentTimelineProps) {
  const { t } = useTranslation(lang);
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const phases = usePhases(results, lang);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {t('investment.title')}
        </h2>

        <MetricsSummary results={results} lang={lang} />

        <TimelineContainer 
          phases={phases}
          lang={lang}
          onPhaseSelect={setActivePhase}
        />

        {activePhase !== null && (
          <PhaseDetails 
            phase={phases[activePhase]}
            onClose={() => setActivePhase(null)}
          />
        )}
      </div>
    </div>
  );
}