import React from 'react';
import { MetricCard } from './MetricCard';
import { useMetrics } from '../../hooks/useMetrics';
import type { SimulationResult } from '../../../../types';

interface MetricsSummaryProps {
  results: SimulationResult;
  lang: 'fr' | 'en';
}

export function MetricsSummary({ results, lang }: MetricsSummaryProps) {
  const metrics = useMetrics(results, lang);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          label={metric.label}
          value={metric.value}
          index={index}
        />
      ))}
    </div>
  );
}