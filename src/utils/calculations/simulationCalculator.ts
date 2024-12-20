import { calculateCycle } from './core/calculator';
import { generateTimelineEvents } from './timelineCalculations';
import type { SimulationParameters, SimulationResult } from '../../types';

export function calculateInvestmentResults(params: SimulationParameters): SimulationResult {
  const cycles = [];
  let currentCapital = params.initialCapital;

  // Calcul pour chaque cycle
  for (let i = 0; i < params.numberOfCycles; i++) {
    const cycleResult = calculateCycle(currentCapital, params);
    cycles.push(cycleResult);
    currentCapital = cycleResult.finalCapital;
  }

  const finalCapital = cycles[cycles.length - 1].finalCapital;
  const totalReturn = ((finalCapital - params.initialCapital) / params.initialCapital) * 100;
  const years = (params.cycleDuration * params.numberOfCycles) / 12;
  const cagr = (Math.pow(finalCapital / params.initialCapital, 1 / years) - 1) * 100;

  return {
    cycles,
    finalCapital: Math.round(finalCapital * 100) / 100,
    totalReturn: Math.round(totalReturn * 100) / 100,
    cagr: Math.round(cagr * 100) / 100,
    timeline: generateTimelineEvents(params, cycles)
  };
}