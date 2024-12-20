import { calculateSimpleInterest } from './interest';
import { calculateLeverageAmount } from './leverage';
import { calculateProfitBreakdown } from '../profit/profitCalculator';
import type { SimulationParameters, CycleResult } from '../../../types';

export function calculateCycle(currentCapital: number, params: SimulationParameters): CycleResult {
  // 1. Calculate leverage amount (based on LTV)
  const leverageAmount = params.leverageEnabled
    ? calculateLeverageAmount(currentCapital, params.leverageRatio)
    : 0;

  // 2. Calculate placement interest (5% per year for 2 years)
  const placementInterest = calculateSimpleInterest(
    currentCapital,
    params.placementRate,
    params.cycleDuration
  );

  // 3. Calculate credit cost based on funding phases
  const creditCost = params.leverageEnabled
    ? params.fundingPhases.reduce((total, phase) => {
        const phaseAmount = leverageAmount * (phase.percentage / 100);
        const remainingMonths = params.cycleDuration - phase.month;
        return total + calculateSimpleInterest(phaseAmount, params.creditRate, remainingMonths);
      }, 0)
    : 0;

  // 4. Calculate sale profit (28% on leverage amount)
  const { grossProfit, netProfit } = calculateProfitBreakdown(
    leverageAmount,
    params.saleMargin,
    creditCost
  );

  // 5. Final capital = initial + placement interest + net profit
  const finalCapital = currentCapital + placementInterest + netProfit;

  return {
    investedCapital: currentCapital,
    leverageAmount,
    totalInvestment: currentCapital + leverageAmount,
    placementInterest: Math.round(placementInterest * 100) / 100,
    creditCost: Math.round(creditCost * 100) / 100,
    saleProfit: Math.round(grossProfit * 100) / 100,
    finalCapital: Math.round(finalCapital * 100) / 100,
    cycleDuration: params.cycleDuration
  };
}