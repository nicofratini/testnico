import { calculateLeverageAmount } from './leverageCalculator';
import { calculateCreditCost } from './creditCalculator';
import type { SimulationParameters, CycleResult } from '../../types';

export function calculateCycle(currentCapital: number, params: SimulationParameters): CycleResult {
  // 1. Calcul du montant du crédit (effet de levier)
  const leverageAmount = params.leverageEnabled
    ? calculateLeverageAmount(currentCapital, params.leverageRatio)
    : 0;

  // 2. Intérêts sur le capital placé (taux simple)
  const placementInterest = currentCapital * (params.placementRate / 100) * 
    (params.cycleDuration / 12);

  // 3. Plus-value sur le montant du crédit uniquement
  const saleProfit = leverageAmount * (params.saleMargin / 100);

  // 4. Coût total du crédit
  const creditCost = params.leverageEnabled
    ? calculateCreditCost(leverageAmount, params.creditRate, params.cycleDuration, params.fundingPhases)
    : 0;

  // 5. Capital final = capital initial + intérêts placement + (plus-value - coût crédit)
  const finalCapital = Math.round(
    (currentCapital + placementInterest + (saleProfit - creditCost)) * 100
  ) / 100;

  return {
    investedCapital: currentCapital,
    leverageAmount,
    totalInvestment: currentCapital + leverageAmount,
    placementInterest,
    creditCost,
    saleProfit,
    finalCapital,
    cycleDuration: params.cycleDuration
  };
}