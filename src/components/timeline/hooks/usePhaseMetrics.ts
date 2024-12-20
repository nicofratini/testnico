import { useMemo } from 'react';
import type { Phase } from '../types';

export function usePhaseMetrics(phase: Phase, previousPhase?: Phase) {
  return useMemo(() => {
    const metrics = [];

    // Calculate ROI if there's a previous phase
    if (previousPhase) {
      const roi = ((phase.amount - previousPhase.amount) / previousPhase.amount) * 100;
      metrics.push({
        label: 'ROI',
        value: roi,
        unit: '%' as const
      });
    }

    // Add other relevant metrics based on phase type
    switch (phase.title) {
      case 'Leverage':
        metrics.push({
          label: 'LTV',
          value: 70, // Example fixed value
          unit: '%' as const
        });
        break;
      case 'Sale':
        metrics.push({
          label: 'Margin',
          value: 28, // Example fixed value
          unit: '%' as const
        });
        break;
    }

    return metrics;
  }, [phase, previousPhase]);
}