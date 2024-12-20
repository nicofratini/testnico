
import type { Phase } from '../types';

export function calculatePhaseMetrics(phase: Phase, previousPhase?: Phase) {
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

  // Add phase-specific metrics
  const phaseMetrics = getPhaseSpecificMetrics(phase);
  metrics.push(...phaseMetrics);

  return metrics;
}

function getPhaseSpecificMetrics(phase: Phase) {
  const metrics = [];

  switch (phase.title) {
    case 'Leverage':
      metrics.push({
        label: 'LTV',
        value: 70,
        unit: '%' as const
      });
      break;
    case 'Sale':
      metrics.push({
        label: 'Margin',
        value: 28,
        unit: '%' as const
      });
      break;
    case 'Final':
      metrics.push({
        label: 'CAGR',
        value: phase.details.find(d => d.startsWith('CAGR'))?.match(/\d+\.?\d*/)?.[0] || 0,
        unit: '%' as const
      });
      break;
  }

  return metrics;
}
