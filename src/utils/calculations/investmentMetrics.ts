import type { SimulationParameters } from '../../types';

export interface SummaryMetrics {
  newFinalCapital: number;
  totalGain: number;
  totalReturn: number;
  annualizedReturn: number;
}

export function calculateSummaryMetrics({
  initialCapital,
  finalCapital,
  cycleDuration,
}: {
  initialCapital: number;
  finalCapital: number;
  cycleDuration: number;
}): SummaryMetrics {
  // Montant total gagné
  const totalGain = finalCapital - initialCapital;
  
  // Rendement total en pourcentage
  const totalReturn = (totalGain / initialCapital) * 100;
  
  // Rendement annuel composé (CAGR)
  const years = cycleDuration / 12;
  const annualizedReturn = (Math.pow(finalCapital / initialCapital, 1 / years) - 1) * 100;

  return {
    newFinalCapital: finalCapital,
    totalGain,
    totalReturn,
    annualizedReturn,
  };
}