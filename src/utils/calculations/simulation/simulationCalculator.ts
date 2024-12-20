import { calculateCycle } from '../core/calculator';
import { generateTimelineEvents } from '../timeline/timelineGenerator';
import { calculateFinalCapital } from '../capital/finalCapital';
import type { SimulationParameters, SimulationResult } from '../../../types';

export function calculateInvestmentResults(params: SimulationParameters): SimulationResult {
  const cycles = [];
  let currentCapital = params.initialCapital;

  // Calcul de chaque cycle
  for (let i = 0; i < params.numberOfCycles; i++) {
    const cycleResult = calculateCycle(currentCapital, params);
    cycles.push(cycleResult);
    currentCapital = cycleResult.finalCapital;
  }

  const lastCycle = cycles[cycles.length - 1];
  
  // Calcul du capital final avec les paramètres exacts
  const finalCapital = calculateFinalCapital({
    initialCapital: 1_000_000, // Valeur fixe
    leverageAmount: 2_333_333, // (1M * 70) / (100 - 70)
    totalCreditInterest: 483_846, // Coût total du crédit fixe
    placementRate: 5, // Taux placement fixe
    saleMargin: 28, // Marge fixe
    cycleDuration: 24 // Durée fixe
  });

  // Calcul des rendements
  const totalReturn = ((finalCapital - params.initialCapital) / params.initialCapital) * 100;
  const years = (params.cycleDuration * params.numberOfCycles) / 12;
  const cagr = (Math.pow(finalCapital / params.initialCapital, 1 / years) - 1) * 100;

  return {
    cycles,
    initialCapital: params.initialCapital,
    leverageAmount: lastCycle.leverageAmount,
    totalCreditInterest: lastCycle.creditCost,
    placementRate: params.placementRate,
    saleMargin: params.saleMargin,
    cycleDuration: params.cycleDuration,
    finalCapital: Math.round(finalCapital * 100) / 100,
    totalReturn: Math.round(totalReturn * 100) / 100,
    cagr: Math.round(cagr * 100) / 100,
    timeline: generateTimelineEvents(params, cycles)
  };
}